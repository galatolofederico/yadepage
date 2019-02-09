const config = require("../config.js")

function generator(masterPassword, login, useSymbols = false){
    return new Promise(async (res, rej) => {
        let masterHash = await getGenHash(masterPassword, config.generation.salt)
        let salts = await getSalts(login)
        let h1 = await getGenHash(masterHash, salts[0])
        let h2 = await getGenHash(login, salts[1])
        let h3 = await getGenHash(h1+h2, salts[2])
        res(getPassword(h3, useSymbols))
    })
}


function getPassword(hash, useSymbols){
    let letters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let symbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
    let characters = letters + (useSymbols ? symbols : "")
    let str = ""
    for(let elem of hash){
        str += characters[elem % characters.length]
    }
    return str
}

async function getSalts(login){
    let salts = []
    let currentArg = login
    for(let i = 0, salt = "";i < 3;i++){
        salt = await getGenHash(currentArg, config.generation.salt)
        salts.push(salt)
        currentArg = salt
    }
    return salts
}

function getGenHash(input, salt){
    return new Promise((res, rej) => {
        argon2.hash({
            pass: input,
            salt: salt,
            time: config.generation.iterations,
            mem: config.generation.memorySize, 
            hashLen: config.generation.hashLengh,
            parallelism: 1,
            type: config.generation.argonType,
            distPath: 'libs/argon2-browser/dist'
        }).then(hash => {
            res(hash.hash)
        }).catch(e => {
            rej(e)
        })
    }) 
}

generator("MasterPassword", "federico@google.com").then(console.log)