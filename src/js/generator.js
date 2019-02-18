let sha256 = require("js-sha256")
let event = new (require("events").EventEmitter)()

function generator(masterPassword, username, service, config = {}){
    config = loadDefaultsMissing(config)
    event.emit("hash", {max: config.concatenations})
    
    return new Promise(async (res, rej) => {
        let usernameHash = SHA256(username)
        let serviceHash = SHA256(service)
        let saltHash = SHA256(config.salt)
        let masterPasswordHash = SHA256(masterPassword)

        let xor1 = XOR(usernameHash, serviceHash)
        let xor2 = XOR(saltHash, masterPasswordHash)

        let sha1 = SHA256(xor1)
        let sha2 = SHA256(xor2)

        let xor3 = XOR(sha1, sha2)
        let xor4 = XOR(sha2, xor1)

        let argonInput = xor4
        let argonOutput = undefined
        let argonLength = 32
        let shaInput = xor3
        let shaOutput = undefined
        let shaIterationsInput = xor4
        let shaIterationsOutput = undefined
        let iterationsNumber = undefined
        for(let i = 0;i < config.concatenations;i++){
            if(i == (config.concatenations - 1)) argonLength = config.passwordLength

            shaOutput = SHA256(shaInput)
            shaIterationsOutput = SHA256(shaIterationsInput, true)
            iterationsNumber = shaIterationsOutput[1], shaIterationsOutput = shaIterationsOutput[0]
            argonOutput = await Argon2(argonInput, shaOutput, iterationsNumber, argonLength, config)
            
            if(i != (config.concatenations - 1)){
                shaIterationsInput = XOR(argonOutput, shaIterationsOutput)
                argonInput = argonOutput
                shaInput = XOR(argonOutput, shaOutput)
            }
        }
        res(getPassword(argonOutput))
    })
}

function XOR(arr1, arr2){
    if(arr1.length != arr2.length) throw Error("XOR of arrays with different length")
    let ret = new Uint8Array(arr1.length)
    for(let i = 0;i < arr1.length; i++) ret[i] = (arr1[i] ^ arr2[i])
    return ret
}

function SHA256(input, getInternal = false){
    if(!getInternal)
        return sha256.update(input).array()
    else {
        let hash = sha256.update(input)
        return [hash.array(), hash.h0]
    }
}

async function Argon2(input, salt, iterations, length, config){
    await syncSleep(10)
    return new Promise((res, rej) => {
        argon2.hash({
            pass: input,
            salt: salt,
            time:  Math.abs(iterations) % config.maxIterations,
            mem:  config.memorySize, 
            hashLen: length,
            parallelism: 1,
            type: config.argonType,
            distPath: 'libs/argon2-browser/dist'
        }).then(hash => {
            event.emit("hash", {max: config.concatenations})
            res(hash.hash)
        }).catch(e => {
            rej(e)
        })
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

function loadDefaultsMissing(config){
    if(config.concatenations) config.concatenations = Number.parseInt(config.concatenations)
    else config.concatenations =  document.defaultConfig.generation.concatenations

    if(config.iterations) config.iterations = Number.parseInt(config.iterations)
    else config.iterations =  document.defaultConfig.generation.iterations

    if(config.salt) config.salt = config.salt.toString()
    else config.salt =  document.defaultConfig.generation.salt

    if(config.memorySize) config.memorySize = Number.parseInt(config.memorySize)
    else config.memorySize =  document.defaultConfig.generation.memorySize

    if(config.passwordLength) config.passwordLength = Number.parseInt(config.passwordLength)
    else config.passwordLength =  document.defaultConfig.generation.passwordLength
    
    config.argonType = document.defaultConfig.generation.argonType
    return config
}

function syncSleep(t){
    return new Promise((res, rej) => {
        setTimeout(() => {
            res()
        }, t)
    })
}

document.generator = generator
document.hashEvent = event