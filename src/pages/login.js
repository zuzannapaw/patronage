
const storeInLogin = Object.prototype.patronage.getGlobalKey('store');

let login_emailInput;
let login_passwordInput;

let login_toRegistrationBtn;
let login_toLoginBtn;
let login_logoutBtn;
let login_loginBtn;

let login_loggedIn;
let currentUser;

let login_logoutWrapper;
let login_emailInputWrapper;
let login_passwordInputWrapper;

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
    currentUser = users.find(user => user.email === login_emailInput.value || user.username === login_emailInput.value)
    console.log(`Current user: ${currentUser}`);

    if (currentUser) {
        correctPassword = login_passwordInput.value === currentUser.password;
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
        login_logoutWrapper.insertAdjacentElement("beforeend", usernameDiv);

        window.location.hash = '#/transactions';

        //checking for proper navigation display after changing location
        login_loggedIn = sessionStorage.getItem("currentUser");

        if (login_loggedIn) {
            login_logoutBtn.style.visibility = "visible";
            login_toLoginBtn.style.visibility = "hidden";
            login_toRegistrationBtn.style.visibility = "hidden";
        };

        if (!login_loggedIn) login_logoutBtn.style.visibility = "hidden";

        //navigation buttons get to normal position
        login_toLoginBtn.style.order = "0";
        login_toRegistrationBtn.style.order = "0";

    } else if (!currentUser || !correctPassword) {
        if (!currentUser) {
            const message = document.createElement("p");
            message.innerHTML = "Użytkownik nie istnieje. Zarejestruj się! ";
            message.classList.add("error-message");
            login_emailInputWrapper.insertAdjacentElement('afterend', message);

        } if (!correctPassword) {
            const message = document.createElement("p");
            message.innerHTML = "Błędne hasło";
            message.classList.add("error-message");
            login_passwordInputWrapper.insertAdjacentElement("afterend", message)
        };

    };
    //should i do "if" only for possible situation or not to be sure?
}

//this in beforeLoginRender?
const beforeLoginRender = async () => {
    console.log('Before render login');

    storeInLogin.isInLoginPage = true;
    Object.prototype.patronage.setGlobalKey('store',storeInLogin);
   
    login_toRegistrationBtn = document.querySelector(".to-registration-page");
    login_toLoginBtn = document.querySelector(".to-login-page")
    if (storeInLogin.isInLoginPage) {
        login_toLoginBtn.style.visibility = "hidden";
        login_toRegistrationBtn.style.visibility = "visible";
        login_toLoginBtn.style.order = "1";
        login_toRegistrationBtn.style.order = "-1";
    }
};

Object.prototype.patronage.setGlobalKey('page_render_login', beforeLoginRender);

const renderLogin = () => `
<div class="form-wrapper-login">
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
</div>
`;
Object.prototype.patronage.setGlobalKey('page_login_render', renderLogin);


const initLogin = () => {
    console.log('Login init');

    login_emailInputWrapper = document.getElementById("login-email-li");
    login_passwordInputWrapper = document.getElementById("login-password-li");
    login_logoutWrapper = document.querySelector(".logout-wrapper");
    login_logoutBtn = document.querySelector(".logout-btn");
    login_loginBtn = document.getElementById('login-btn');
    //for validation
    login_emailInput = document.getElementById("email");
    login_passwordInput = document.getElementById('password');

    login_loginBtn.onclick = loginUser;
};

Object.prototype.patronage.setGlobalKey('page_login_init', initLogin);

const cleanupLogin = () => {
    console.log('cleanupLogin');
    login_loginBtn = document.getElementById('login-btn');
    login_loginBtn.removeEventListener('click', loginUser);
};

Object.prototype.patronage.setGlobalKey('page_login_cleanup', cleanupLogin);
