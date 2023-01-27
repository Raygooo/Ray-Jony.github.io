let myImage = document.querySelector('img')

myImage.onclick = function () {
    let mySrc = myImage.getAttribute('src')
    if (mySrc === 'images/firefox-logo.png') {
        myImage.setAttribute('src', 'images/firefox-logo2.png')
    } else {
        myImage.setAttribute('src', 'images/firefox-logo.png')
    }
}

let myButton = document.querySelector('button')
let myHeading = document.querySelector('h1')

function setUserName() {
    let myName = prompt('input your name')
    localStorage.setItem('name', myName)
    myHeading.textContent = 'Mozilla is Soooooo cool, ' + myName
}

if (!localStorage.getItem('name')) {
    setUserName()
} else {
    let storedName = localStorage.getItem('name')
    myHeading.textContent = 'Mozilla is Soooooo cool, ' + storedName
}

myButton.onclick = function () {
    setUserName()
}