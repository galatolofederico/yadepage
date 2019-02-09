function generator(masterPassword, login, config = {}){
    return new Promise(async (res, rej) => {
        let masterHash = await getGenHash(masterPassword, document.defaultConfig.generation.salt, config)
        let salts = await getSalts(login, config)
        let h1 = await getGenHash(masterHash, salts[0], config)
        let h2 = await getGenHash(login, salts[1], config)
        let h3 = await getGenHash(h1+h2, salts[2], config)
        res(getPassword(h3, config.useSymbols || false))
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

async function getSalts(login, config){
    let salts = []
    let currentArg = login
    for(let i = 0, salt = "";i < 3;i++){
        salt = await getGenHash(currentArg, document.defaultConfig.generation.salt, config)
        salts.push(salt)
        currentArg = salt
    }
    return salts
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