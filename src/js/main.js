let fields = ["concatenations", "maxIterations", "salt", "memorySize", "passwordLength"]

function init(){    
    for(let field of fields) document.getElementById(field).placeholder = document.defaultConfig.generation[field]
}


function handlePassword(password){
    document.getElementById("loading").hidden = true
    document.getElementById("password").hidden = false
    document.getElementById("computedPassword").value = password
}


var step = 0
document.computePassword = function(){
    document.getElementById("params").hidden = true
    document.getElementById("loading").hidden = false

    step = 0
    setTimeout( ()=>{
        let config = {}
        for(let field of fields) config[field] = document.getElementById(field).value != "" ? document.getElementById(field).value : undefined 
        document.generator(
            document.getElementById("masterPassword").value,
            document.getElementById("username").value,
            document.getElementById("service").value,
            config
        ).then(handlePassword)
    }, 10)
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

function copyToClipboard(){
    if(!toggled) document.getElementById("computedPassword").setAttribute("type", "text")
    document.getElementById("computedPassword").select()
    document.execCommand("copy")
    if(!toggled) document.getElementById("computedPassword").setAttribute("type", "password")
    setTimeout(() => {
        window.getSelection().empty()
    }, 100)
}


function reset(){
    document.getElementById("password").hidden = true
    document.getElementById("params").hidden = false
}

document.hashEvent.on("hash", args => {
    step += 1
    console.log(requestAnimationFrame(() => {
        document.getElementById("stepCounter").textContent = step+"/"+args.max
    }))
    console.log(document.getElementById("stepCounter"),  step+"/"+args.max)
})

document.eyeToggle = eyeToggle
document.copyToClipboard = copyToClipboard
document.reset = reset
init()
