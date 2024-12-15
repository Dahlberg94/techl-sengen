

document.addEventListener("DOMContentLoaded", (event) => {
    const generate = document.getElementById("generate");
    const input = document.getElementById("password");
    const slider = document.getElementById("slider");
    const lengthValue = document.getElementById("sliderLength"); 
    const useUpper = document.getElementById("Upper");
    const useLower = document.getElementById("Lower");
    const useNumbers = document.getElementById("Numbers");
    const useSymbols = document.getElementById("Symbols");
    const strength = document.getElementById("strength");

    slider.addEventListener("input", () => {
        lengthValue.textContent = slider.value; 
    });



    function handleClick() {
        const randomPassword = generatePassword(slider.value,
            useUpper.checked,
            useLower.checked,
            useNumbers.checked,
            useSymbols.checked
        );
        input.value = randomPassword;
        updateStrength(randomPassword);
    }

    generate.addEventListener("click", handleClick);
});

function generatePassword(length, useUpper, useLower, useNumbers, useSymbols) {
    let pwSet = [];

    if (useUpper) {
        pwSet.push ("QWERTYUIOPASDFGHJKLZXCVBNM");
    }
    if (useLower) {
        pwSet.push ("qwertyuiopasdfghjklzxcvbnm");
    }
    if (useNumbers) {
        pwSet.push ("1234567890");
    }
    if (useSymbols) {
        pwSet.push ("!#¤%&/()=?,.-_<>");
    }
    if (pwSet.length === 0) {
        pwSet.push ("qwertyuiopasdfghjklzxcvbnbm")
    }

    pwSet = pwSet.join('');

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * pwSet.length);
        password += pwSet[randomIndex];
    }
    return password;
}

var slider = document.getElementById("slider");
var sliderLength = document.getElementById("slideLength"); 

sliderLength.innerHTML = slider.value;

slider.oninput = function() {
    sliderLength.innerHTML = this.value;
};

slider.addEventListener('input', function() {
    var x = (this.value - this.min) / (this.max - this.min) * 100;
    var color = 'linear-gradient(90deg, rgb(166, 56, 246) ' + x + '%, rgb(133, 133, 133, 0.349) ' + x + '%)';
    this.style.background = color;
});

function updateStrength(password) {
    const isLong = password.length >= 10;
    const isMedium = password.length >= 5;
    const isBad = password.length <= 5;
    const useUpper = /[A-Z]/.test(password);
    const useLower = /[a-z]/.test(password);
    const useNumbers = /\d/.test(password);
    const useSymbols = /[!#¤%&/()=?,.\-_<>\[\]]/.test(password);

    let message = "";

    if (useUpper && useLower && useNumbers && useSymbols && isLong) {
        message = "Super Strong";
        color1 = "green";
        color2 = "green";
        color3 = "green";
        color4 = "green";
    } else if (
        (useUpper && useLower && useNumbers && useSymbols && isMedium) ||
        (useUpper && useLower && useNumbers && isMedium) ||
        (useUpper && useLower && useSymbols && isMedium) ||
        (useUpper && useSymbols && useNumbers && isMedium) ||
        (useSymbols && useLower && useNumbers && isMedium) ||
        (useUpper && useLower && useNumbers && isMedium)
    ) {
        message = "Great";
        color1 = "green";
        color2 = "green";
        color3 = "green";
        color4 = "gray";
    } else if (
        (useUpper && useLower && useNumbers && isBad) ||
        (useUpper && useLower && useSymbols) ||
        (useUpper && useSymbols && useNumbers) ||
        (useSymbols && useLower && useNumbers)
    ) {
        message = "Okay";
        color1 = "green";
        color2 = "green";
        color3 = "gray";
        color4 = "gray";
    } else if (
        (useUpper && useLower) ||
        (useUpper && useNumbers) ||
        (useNumbers && useSymbols) ||
        (useSymbols && useUpper) ||
        (useSymbols && useLower) ||
        (useNumbers && useLower)
    ) {
        message = "Bad";
        color1 = "green";
        color2 = "gray";
        color3 = "gray";
        color4 = "gray";
    } else {
        message = "Very Bad";
        color1 = "gray";
        color2 = "gray";
        color3 = "gray";
        color4 = "gray";
    }

    strength.textContent = message;
    updateMeterColors(color1, color2, color3, color4);

}

function updateMeterColors(color1, color2, color3, color4) {
    sM1.style.backgroundColor = color1;
    sM2.style.backgroundColor = color2;
    sM3.style.backgroundColor = color3;
    sM4.style.backgroundColor = color4;
}

input.addEventListener("input", () => {
    updateStrength(input.value);
});

function copyPassword() {
    var copyText = document.getElementById("password");
    navigator.clipboard.writeText(copyText.value).then(function() {
        console.log("text Copied");
    }).catch(function(err) {
        console.error("error, didnt Copy", err);
    });
}