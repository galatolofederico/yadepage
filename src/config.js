document.defaultConfig = {
    generation:{
        concatenations: 3, // Number of Argon2 + SHA256 concatenations
        iterations: 10,// Number of iterations, the higher the safer (but also the slower)
        salt: "yf9rH8.,Q4)faP2.J?;", // Meta-salt for salt generation
        memorySize: 1024, // Memory size for argon
        hashLengh: 24, // Length for the hash
        argonType: argon2.ArgonType.Argon2d // Type of the argon2 hash
    }
}