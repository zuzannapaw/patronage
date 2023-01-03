import { store } from '../js/global.js';

let emailInput;
let passwordInput;

let toRegistrationBtn;
let toLoginBtn; 
let logoutBtn; 
let loginBtn

let loggedIn; 
let liInput;


//in future maybe helper function for login and registration?

const loginUser = (e) => {

    e.preventDefault();
    const storageUsers = sessionStorage.getItem("users");
    const users = JSON.parse(storageUsers);

    const currentUser = users.find(user => user.email === emailInput.value)
    console.log(currentUser)

    if(currentUser) {
        console.log("login correct");
        const currentUserString = JSON.stringify(currentUser);
        sessionStorage.setItem("currentUser",currentUserString);
        window.history.pushState({}, "","/transactions");
    
       }else{
        //inserting message below input BUT ONLY ONCE *
        liInput = document.querySelector(".form-row");
        const emailMessage = document.createElement("p");
        emailMessage.innerHTML= "Insert proper email";
        emailMessage.classList.add("email-error");
    
        liInput.insertAdjacentElement('afterend',emailMessage);
        return
    }


    //should i do "if" only for possible situation or not to be sure?

     //checking for proper navigation display
    loggedIn = sessionStorage.getItem("currentUser");

    if (loggedIn) {
        logoutBtn.style.visibility = "visible";
        toLoginBtn.style.visibility = "hidden";
        toRegistrationBtn.style.visibility = "hidden";
       }
    
    if (!loggedIn) logoutBtn.style.visibility = "hidden";


    //navigation buttons get to normal position
    toLoginBtn.style.order = "0";
    toRegistrationBtn.style.order = "0";

   }
 
//this in beforeLoginRender?

export const beforeLoginRender = async () => {
    store.isInLoginPage = true;
    toRegistrationBtn = document.querySelector(".to-registration-page");
    toLoginBtn = document.querySelector(".to-login-page")
    if(store.isInLoginPage){
        toLoginBtn.style.visibility = "hidden";
        toRegistrationBtn.style.visibility = "visible";
        toLoginBtn.style.order = "1";
        toRegistrationBtn.style.order = "-1";
    }

}

export const renderLogin = () => `
<div class="form-wrapper">
    <form>
        <ul class="wrapper">
            <li class="form-row">
                <label>Email</label>
                <input id="email">
            </li>
            <li class="form-row">
                <label for="password">Hasło</label>
                <input type="password" id="password">
            </li>
            <li class="form-row">
                <button id="login-btn" class="login">Zaloguj</button>
            </li>
        </ul>
    </form>
</div>
`;

export const initLogin = () => {
 logoutBtn= document.querySelector(".logout-btn");
 loginBtn = document.getElementById('login-btn');
 //for validation
 emailInput = document.querySelector('#email');
 passwordInput = document.querySelector('#password');
 //these selectors should be visible by code because navigation is in index.html

 loginBtn.onclick = loginUser;
};

export const cleanupLogin = () => {
    console.log('cleanupLogin');
    loginBtn = document.getElementById('login-btn');
    loginBtn.removeEventListener('click', loginUser);
};

