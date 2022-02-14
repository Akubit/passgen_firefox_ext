// 
// Data
//

const pass = [
    document.getElementById("pass1"),
    document.getElementById("pass2"),
    document.getElementById("pass3"),
    document.getElementById("pass4")
]

const copyBtn = [
    document.getElementById("copy1"),
    document.getElementById("copy2"),
    document.getElementById("copy3"),
    document.getElementById("copy4")
]
const generateBtn = document.getElementById("generate")
const amount = document.getElementById("amount")
const upper = document.getElementById("uppercase")
const lower = document.getElementById("lowercase")
const num = document.getElementById("numbers")
const special = document.getElementById("special")
const range = document.getElementById("range")
const current = document.getElementById("current")

let filters = [
     'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
     'abcdefghijklmnopqrstuvwxyz',
     '0123456789',
     '!@#$%^&*_()+=?><'
    ];

let settings = []
let regexFilter = []

// 
// Functions
// 

function activeLower () {
    if (!upper.checked && !num.checked && !special.checked) {
        lower.checked = true
    }
}

function currentSetting() {
    settings = []
    regexFilter = []

    settings.push(`${range.value} characters`)

    if (upper.checked) {
        settings.push(`Uppercase`)
        regexFilter.push(/([^A-Z]+)\w+/g)
    }
    if (lower.checked) {
        settings.push(`Lowercase`)
        regexFilter.push(/([^a-z]+)\w+/g)
    }
    if (num.checked) {
        settings.push(`Numbers`)
        regexFilter.push(/([^0-9]+)\w+/g)
    }
    if (special.checked) {
        settings.push(`Specials`)
        regexFilter.push(/([^!@#$%^&*-_()+=?><]+)\w+/g)
    }
}

function generate () {
    
    let chars = ""
    
    if (upper.checked) {
        chars += filters[0]
    }
    if (lower.checked) {
        chars += filters[1]
    }
    if (num.checked) {
        chars += filters[2]
    }
    if (special.checked) {
        chars += filters[3]
    }
    let randomPassword = [...window.crypto.getRandomValues(new Uint32Array(range.value))]
    .map((x) => chars[x % chars.length])
    .join('')
    return randomPassword


}

function copy(element) {
    navigator.clipboard.writeText(element.innerText)
}

function displayPassword() {
    currentSetting()
    for (let password of pass) {
        let genPass = generate()
        for (let reg of regexFilter) {
            if (genPass.match(reg)) {
                genPass = generate()
            } else if (genPass.length !== range.length) {
                genPass = generate()
            }
        }
        password.innerText = `${genPass}` 
    }
    document.getElementById('copy-passwords').style.display = "grid"
    for  (let button in copyBtn) {
        copyBtn[button].addEventListener('click', function (){
            copy(pass[button])
        })
    }
    current.innerText = `Current settings: ${settings.join(', ')}`
}

// 
// Event listeners 
// 

range.addEventListener('input', function() {
    amount.innerText = range.value
})

upper.addEventListener('click', function() {
    activeLower();
})

lower.addEventListener('click', function() {
    activeLower();
})

num.addEventListener('click', function() {
    activeLower();
})

special.addEventListener('click', function() {
    activeLower();
})

generateBtn.addEventListener('click', function () {
    displayPassword()
})
