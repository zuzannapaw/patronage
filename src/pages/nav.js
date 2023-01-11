
const navWrapper = document.getElementById("main-nav")
//initial

let nav_loggedIn;
let nav_toRegistrationBtn ;
let nav_toLoginBtn;
let nav_logoutBtn ;

const toRegistration = () => {
    window.location.hash = '#/registration';
};

const toLogin = () => {
    window.location.hash = '#/login';
};

const logoutHandle = () => {
    window.location.hash = '#/';
};

const html = `<button class="to-registration-page">Rejestracja</button>
    <button class="to-login-page">Logowanie</button>
    <div class="logout-wrapper">
        <button class="logout-btn">Wyloguj</button>
    </div>
    `
navWrapper.insertAdjacentHTML("afterbegin",html)

//html is inserted in other place (index.html) and after that it's redefining variables based on that inserted html and its selectors. 


nav_loggedIn = sessionStorage.getItem("currentUser");
nav_toRegistrationBtn = document.querySelector(".to-registration-page");
nav_toLoginBtn = document.querySelector(".to-login-page")
nav_logoutBtn = document.querySelector(".logout-btn");

//attaching onclick functions 

nav_toRegistrationBtn.onclick = toRegistration;
nav_toLoginBtn.onclick = toLogin;
nav_logoutBtn.onclick = logoutHandle;


//checking local storage and displaying proper navigation 

if (!nav_loggedIn) nav_logoutBtn.style.visibility = "hidden";
if (nav_loggedIn) nav_toLoginBtn.style.visibility = "hidden";
if (nav_loggedIn) nav_toRegistrationBtn.style.visibility = "hidden";
