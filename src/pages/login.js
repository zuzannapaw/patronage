const storeInLogin = Object.prototype.patronage.getGlobalKey('store');
const login_createHash = Object.prototype.patronage.getGlobalKey('createHash');

let login_emailInput;
let login_passwordInput;

let login_toRegistrationBtn;
let login_toLoginBtn;
let login_logoutBtn;
let login_loginBtn;

let login_emailInputWrapper;
let login_passwordInputWrapper;

//function for delete old error messages - updating view in form 
const login_deleteOldErrorMessage = () => {
    const errorMessages = document.querySelectorAll(".error-message");
    if (errorMessages.length > 0) {
      errorMessages.forEach(err => err.parentNode.removeChild(err));
    };
};

const login_errorInputDisplay = (str,elementWrapper )=> { 
    const message = document.createElement("p");
    message.innerHTML = str;
    message.classList.add("error-message");
    elementWrapper.insertAdjacentElement('afterend', message);
};

const handleLogin = async (e) => {
    e.preventDefault();
    login_deleteOldErrorMessage();

    const login_storageUsers = sessionStorage.getItem("users");
    const login_users = JSON.parse(login_storageUsers);

    //looking for current user - if users already exist, find current user and check if password in form is correct...
    //...by transform password from input into hash and compare it with hashed password of current user 
    //if users do not exist yet, there is no current user and the password is not correct. 
    let correctPassword;
    let currentUser;

    if(login_users){
        currentUser = login_users.find(user => user.email === login_emailInput.value || user.username === login_emailInput.value)

        if (currentUser) {
            const hashInputPassword = await login_createHash(login_passwordInput.value);
            correctPassword = hashInputPassword === currentUser.password;
        } else {
            correctPassword = false;
        }
    } else {
        currentUser = false;
        correctPassword = false;
    }

    //main validation 
    //if current user exists and password is correct: isLoginFormValid is true.
    //if isLoginFormValid is true: 1. convert current user into string to set it into sessionStorage
    //2.change location to transactions

    const isLoginFormValid = currentUser && correctPassword;

    if (isLoginFormValid) {
        console.log("login correct");
        const currentUserString = JSON.stringify(currentUser);
        sessionStorage.setItem("currentUser", currentUserString);

        window.location.hash = '#/transactions';

        //checking for proper navigation display after changing location
        const login_loggedIn = sessionStorage.getItem("currentUser");
        if (login_loggedIn) {
            login_logoutBtn.style.visibility = "visible";
            login_toLoginBtn.style.visibility = "hidden";
            login_toRegistrationBtn.style.visibility = "hidden";
        }

        //navigation buttons get to normal position - helps displaying logoutBtn properly
        login_toLoginBtn.style.order = "0";
        login_toRegistrationBtn.style.order = "0";

    //displaying proper error messages
    } else {
        if (!currentUser) {
            login_errorInputDisplay("Użytkownik nie istnieje. Zarejestruj się!",login_emailInputWrapper)
        } if (!correctPassword) {
            login_errorInputDisplay("Błędne hasło.", login_passwordInputWrapper)
        }
    }
};

// Changing toLogin and toRegistration buttons ...
//...in beforeLoginRender because i wanted navigation to change first, before login page render 
const beforeLoginRender = async () => {
    console.log('Before render login');

   //to keep proper display of navigation - only toLoginBtn is visible. Changing order to switch positions of...
  //toLoginBtn and toRegistrationBtn - visible button must be aligned to left of navigation 
    login_toRegistrationBtn = document.querySelector(".to-registration-page");
    login_toLoginBtn = document.querySelector(".to-login-page")
    login_toLoginBtn.style.visibility = "hidden";
    login_toRegistrationBtn.style.visibility = "visible";
    login_toLoginBtn.style.order = "1";
    login_toRegistrationBtn.style.order = "-1";
};

Object.prototype.patronage.setGlobalKey('page_render_login', beforeLoginRender);

const renderLogin = () => `
<form class="form-wrapper-login">
    <ul class="wrapper-login">
        <li class="form-row-login" id="login-email-li">
            <label>Nazwa użytkownika/Email</label>
            <input id="email" tabindex="0">
        </li>
        <li class="form-row-login" id="login-password-li">
            <label for="password">Hasło</label>
            <input type="password" id="password" tabindex="0">
        </li>
        <li class="form-row-login">
            <button id="login-btn" class="login" type="submit" tabindex="0">Zaloguj</button>
        </li>
    </ul>
</form>
`
;

Object.prototype.patronage.setGlobalKey('page_login_render', renderLogin);

const initLogin = () => {
    console.log('Login init');
    //defining all necessary elments that will be used later (f.ex. in handleLogin function)
    login_emailInputWrapper = document.getElementById("login-email-li");
    login_passwordInputWrapper = document.getElementById("login-password-li");
    login_logoutBtn = document.querySelector(".logout-btn");
    login_loginBtn = document.getElementById('login-btn');
    login_emailInput = document.getElementById("email");
    login_passwordInput = document.getElementById('password');
    //assing onclick function of login button
    login_loginBtn.onclick = handleLogin;
};

Object.prototype.patronage.setGlobalKey('page_login_init', initLogin);

const cleanupLogin = () => {
    console.log('cleanupLogin');
    login_loginBtn = document.getElementById('login-btn');
    login_loginBtn.removeEventListener('click', handleLogin);
};

Object.prototype.patronage.setGlobalKey('page_login_cleanup', cleanupLogin);
