
const navWrapper = document.getElementById("main-nav")
//initial

let loggedIn;
let toRegistrationBtn ;
let toLoginBtn;
let logoutBtn ;

//return?
const toRegistration = () => {

    return window.history.pushState({}, "","/registration");

}

const toLogin = () => {
   return window.history.pushState({}, "","/login");
}

const logoutHandle = () => {
   return window.history.pushState({}, "","/");

}

//why attached onclick functions are undefined?

const html = `<button class="to-registration-page">Rejestracja</button>
    <button class="to-login-page">Logowanie</button>
    <div class="logoutWrapper">
        <button class="logout-btn">Wyloguj</button>
    </div>
    `


navWrapper.insertAdjacentHTML("afterbegin",html)

//html is inserted in other place (index.html) and after that it's redefining variables based on that inserted html and its selectors. 


loggedIn = sessionStorage.getItem("currentUser");
toRegistrationBtn = document.querySelector(".to-registration-page");
toLoginBtn = document.querySelector(".to-login-page")
logoutBtn = document.querySelector(".logout-btn");

//attaching onclick functions 

toRegistrationBtn.onclick = toRegistration;
toLoginBtn.onclick = toLogin;
logoutBtn.onclick = logoutHandle;


//checking local storage and displaying proper navigation 

if (!loggedIn) logoutBtn.style.visibility = "hidden";
if (loggedIn) toLoginBtn.style.visibility = "hidden";
if (loggedIn) toRegistrationBtn.style.visibility = "hidden";