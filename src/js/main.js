let fields = ["concatenations", "maxIterations", "salt", "memorySize", "passwordLength"]

function init(){    
    for(let field of fields) document.getElementById(field).placeholder = document.defaultConfig.generation[field]
    new ClipboardJS('#copyButton');
}

document.computePassword = function(){
    let config = {}
    for(let field of fields) config[field] = document.getElementById(field).value != "" ? document.getElementById(field).value : undefined 
    document.generator(
        document.getElementById("masterPassword").value,
        document.getElementById("username").value,
        document.getElementById("service").value,
        config
    ).then(console.log)
}

let toggled = false;
function eyeToggle(){
    if(!toggled){
        document.getElementById("eye-icon").setAttribute("data-icon", "eye-slash")
        document.getElementById("computedPassword").setAttribute("type", "text")
    }
    else{
        document.getElementById("eye-icon").setAttribute("data-icon", "eye")
        document.getElementById("computedPassword").setAttribute("type", "password")
    }
    toggled = !toggled
}

document.eyeToggle = eyeToggle
init()
