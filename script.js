let options = document.getElementsByClassName("option");

let integers = "1234567890";
let letters =
    "abcdefghijklmnopqrstuvwxyz" + "abcdefghijklmnopqrstuvwxyz".toUpperCase();
let symbols = "`~!@#$%^&*()-=_+[]{};'\\:\"|,./<>?";

let pool = integers + letters + symbols;
let poolLength = pool.length;

let noPasswords = true;

function randInt(start, stop) {
    let int = start + Math.round(Math.random() * (stop - start - 1));
    return int;
}

function getRandomPassword(len) {
    let randomPassword = "";
    for (let i = 0; i < len; i++) {
        let index = randInt(0, poolLength);
        let char = pool[index];
        if (char === "<") {
            char = "&lt";
        } else if (char === ">") {
            char = "&gt";
        }
        randomPassword += char;
    }
    return randomPassword;
}

function generatePassword() {
    let passwordLength = document.getElementById("pwd-length").value;
    for (option of options) {
        option.innerHTML = "";
        let password = getRandomPassword(passwordLength);
        let html = `<p class="rand-pwd">${password}</p>`;
        option.innerHTML = html;
    }
    // Make sure that it only copies to clipboard
    // after clicking the button at least once.
    if (noPasswords === true) {
        noPasswords = false;
    }
}

function changeTheme() {
    let themeFile = document.getElementById("theme-file");
    let themeButton = document.getElementById("theme");

    if (themeButton.className === "theme--light") {
        themeButton.className = "theme--dark";
        themeButton.textContent = "Dark theme";
        themeFile.setAttribute("href", "./styles/light-theme.css");
    } else {
        themeButton.className = "theme--light";
        themeButton.textContent = "Light theme";
        themeFile.setAttribute("href", "");
    }
}

function copyToClipboard(e) {
    // Check that the options contain passwords.
    if (!noPasswords) {
        let text = e.currentTarget.childNodes[0].textContent;
        let notification = document.getElementById("notification");
        navigator.clipboard
            .writeText(text)
            .then(() => {
                notification.style = `
            transition: all 2s;
            visibility: visible;
            opacity: 0;
            
            `;
                setTimeout(
                    () =>
                        (notification.style = `
                visibility: hidden;
                opacity: 1;
                `),
                    1000
                );
            })
            .catch(
                err => {
                    alert(err)
                }
            );
    }
}
