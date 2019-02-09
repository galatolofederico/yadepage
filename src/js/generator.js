let sha256 = require('js-sha256');

function generator(masterPassword, login, config = {}){
    return new Promise(async (res, rej) => {
        let h1 = sha256.hmac.update(masterPassword, login).array()
        let h2 = sha256.hmac.update(h1, login).array()
        
        let input = h2
        let salt = sha256.update(login).array()
        for(let i = 0;i < (config.concatenations || document.defaultConfig.generation.concatenations);i++){
            input = await getGenHash(input, salt, config)
            salt = sha256.update(salt).array()
        }
        res(getPassword(input, config.useSymbols))
    })
}


function getPassword(hash, useSymbols){
    let letters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let symbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
    let characters = letters + (useSymbols ? symbols : "")
    let str = ""
    for(let elem of hash) str += characters[elem % characters.length]
    return str
}


function getGenHash(input, salt, config){
    return new Promise((res, rej) => {
        argon2.hash({
            pass: input,
            salt: salt,
            time:  config.iterations || document.defaultConfig.generation.iterations,
            mem:  config.memorySize || document.defaultConfig.generation.memorySize, 
            hashLen: config.hashLengh || document.defaultConfig.generation.hashLengh,
            parallelism: 1,
            type: config.argonType || document.defaultConfig.generation.argonType,
            distPath: 'libs/argon2-browser/dist'
        }).then(hash => {
            res(hash.hash)
        }).catch(e => {
            rej(e)
        })
    }) 
}

generator("MasterPassword", "federico@google.com").then(console.log)
