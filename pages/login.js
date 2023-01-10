import { store } from '../js/global.js';

let emailInput;
let passwordInput;

let toRegistrationBtn;
let toLoginBtn;
let logoutBtn;
let loginBtn;

let loggedIn;
let currentUser;

let logoutWrapper;
let emailInputWrapper;
let passwordInputWrapper;
let correctPassword;

//function for delete old error messages - updating view in form 
let deleteOldErrorMessage = () => {
    const errorMessages = document.querySelectorAll(".error-message");
  
    console.log(`error messages found`);
  
    if (errorMessages.length > 0) {
      errorMessages.forEach(err => err.parentNode.removeChild(err));
    };
};


//in future maybe helper function for login and registration?

const loginUser = (e) => {
    e.preventDefault();
    deleteOldErrorMessage();

    const storageUsers = sessionStorage.getItem("users");
    const users = JSON.parse(storageUsers);

    //looking for current user
    if(users){
    currentUser = users.find(user => user.email === emailInput.value || user.username === emailInput.value)
    console.log(`Current user: ${currentUser}`);

    if (currentUser) {
        correctPassword = passwordInput.value === currentUser.password;
    }else{
        correctPassword = false;
    }
}else{
    currentUser = false;
    correctPassword = false;
}

    if (currentUser && correctPassword) {
        console.log("login correct");
        const currentUserString = JSON.stringify(currentUser);
        sessionStorage.setItem("currentUser", currentUserString);
        const usernameDiv = document.createElement("div");
        const innerText = `<h4>${currentUser.username}</h4>`
        usernameDiv.insertAdjacentHTML("afterbegin", innerText)
        usernameDiv.classList.add("username-div");
        logoutWrapper.insertAdjacentElement("beforeend", usernameDiv);

        window.history.pushState({}, "", "/transactions");

        //checking for proper navigation display after changing location
        loggedIn = sessionStorage.getItem("currentUser");

        if (loggedIn) {
            logoutBtn.style.visibility = "visible";
            toLoginBtn.style.visibility = "hidden";
            toRegistrationBtn.style.visibility = "hidden";
        };

        if (!loggedIn) logoutBtn.style.visibility = "hidden";

        //navigation buttons get to normal position
        toLoginBtn.style.order = "0";
        toRegistrationBtn.style.order = "0";

    } else if (!currentUser || !correctPassword) {
        if (!currentUser) {
            const message = document.createElement("p");
            message.innerHTML = "Użytkownik nie istnieje. Zarejestruj się! ";
            message.classList.add("error-message");
            emailInputWrapper.insertAdjacentElement('afterend', message);

        } if (!correctPassword) {
            const message = document.createElement("p");
            message.innerHTML = "Błędne hasło";
            message.classList.add("error-message");
            passwordInputWrapper.insertAdjacentElement("afterend", message)
        };

    };
    //should i do "if" only for possible situation or not to be sure?
}

//this in beforeLoginRender?

export const beforeLoginRender = async () => {
    store.isInLoginPage = true;
    toRegistrationBtn = document.querySelector(".to-registration-page");
    toLoginBtn = document.querySelector(".to-login-page")
    if (store.isInLoginPage) {
        toLoginBtn.style.visibility = "hidden";
        toRegistrationBtn.style.visibility = "visible";
        toLoginBtn.style.order = "1";
        toRegistrationBtn.style.order = "-1";
    }

}

export const renderLogin = () => `
<div class="form-wrapper-login">
    <form>
        <ul class="wrapper-login">
            <li class="form-row-login" id="login-email-li">
                <label>Nazwa użytkownika/Email</label>
                <input id="email">
            </li>
            <li class="form-row-login" id="login-password-li">
                <label for="password">Hasło</label>
                <input type="password" id="password">
            </li>
            <li class="form-row-login">
                <button id="login-btn" class="login">Zaloguj</button>
            </li>
        </ul>
    </form>
</div>
`;

export const initLogin = () => {
    emailInputWrapper = document.getElementById("login-email-li");
    passwordInputWrapper = document.getElementById("login-password-li");
    logoutWrapper = document.querySelector(".logoutWrapper");
    logoutBtn = document.querySelector(".logout-btn");
    loginBtn = document.getElementById('login-btn');
    //for validation
    emailInput = document.getElementById("email");
    passwordInput = document.getElementById('password');

    loginBtn.onclick = loginUser;
};

export const cleanupLogin = () => {
    console.log('cleanupLogin');
    loginBtn = document.getElementById('login-btn');
    loginBtn.removeEventListener('click', loginUser);
};

