let sha256 = require("js-sha256")
let event = new (require("events").EventEmitter)()

function generator(masterPassword, username, service, config = {}){
    config = sanitize(config)
    return new Promise(async (res, rej) => {
        let h1 = sha256.hmac.update(masterPassword, config.salt || document.defaultConfig.generation.salt).array()
        let h2 = sha256.hmac.update(username, service).array()
        
        let input = sha256.update(h1).array()
        let salt = sha256.hmac.update(h2, h1).array()
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
            hashLen: config.hashLength || document.defaultConfig.generation.hashLength,
            parallelism: 1,
            type: config.argonType || document.defaultConfig.generation.argonType,
            distPath: 'libs/argon2-browser/dist'
        }).then(hash => {
            event.emit("hash")
            res(hash.hash)
        }).catch(e => {
            rej(e)
        })
    }) 
}

function sanitize(config){
    if(config.concatenations) config.concatenations = Number.parseInt(config.concatenations)
    if(config.iterations) config.iterations = Number.parseInt(config.iterations)
    if(config.salt) config.salt = config.salt.toString()
    if(config.memorySize) config.memorySize = Number.parseInt(config.memorySize)
    if(config.hashLength) config.hashLength = Number.parseInt(config.hashLength)
    return config
}

document.generator = generator
document.hashEvent = event