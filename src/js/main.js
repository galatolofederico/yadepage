let fields = ["concatenations", "iterations", "salt", "memorySize", "hashLength"]

function init(){    
    for(let field of fields) document.getElementById(field).placeholder = document.defaultConfig.generation[field]
}

document.computePassword = function(){
    let config = {}
    for(let field of fields) config[field] = document.getElementById(field).value != "" ? document.getElementById(field).value : undefined 
    document.generator(
        document.getElementById("masterPassword").value,
        document.getElementById("username").value,
        document.getElementById("service").value,
        config
    )
}

init()
