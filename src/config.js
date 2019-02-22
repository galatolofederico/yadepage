document.defaultConfig = {
    version: 1,
    generation:{
        concatenations: 3, // Number of Argon2 + SHA256 concatenations
        maxIterations: 10,// Maximum number of Argon2 maxIterations
        salt: "yf9rH8.,Q4)faP2.J?;", // Secret salt
        memorySize: 1024, // Memory size for Argon2
        passwordLength: 24, // Password length
        argonType: argon2.ArgonType.Argon2d // Type of the Argon2 hash
    }
}