
const navWrapper = document.getElementById("main-nav")
//initial
//these selectors does not yet exist 
let loggedIn;
let registrationLink ;
let loginLink;
let logoutLink ;


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

const html = `<button class="registrLink">Rejestracja</button>
    <button class="loginLink">Logowanie</button>
    <div class="logoutWrapper">
        <button class="logoutLink">Wyloguj</button>
    </div>
    `


navWrapper.insertAdjacentHTML("afterbegin",html)

//html is inserted in other place (index.html) and after that it's redefining variables based on that inserted html and its selectors. 


loggedIn = localStorage.getItem("user");
registrationLink = document.querySelector(".registrLink");
loginLink = document.querySelector(".loginLink")
logoutLink = document.querySelector(".logoutLink");

//attaching onclick functions 

registrationLink.onclick = toRegistration;
loginLink.onclick = toLogin;
logoutLink.onclick = logoutHandle;


//checking local storage and displaying proper navigation 

if (!loggedIn) logoutLink.style.visibility = "hidden";
if (loggedIn) loginLink.style.visibility = "hidden";
if (loggedIn) registrationLink.style.visibility = "hidden";