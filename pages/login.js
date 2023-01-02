import { store } from '../js/global.js';

let btnLogin;
let emailInput;
let passwordInput;

let registrationLink;
let loginLink; 
let logoutLink; 
let loggedIn; 
let liInput;

const storageUsers = localStorage.getItem("users");
const users = JSON.parse(storageUsers)
console.log( `users in storage: ${users}`);


//in future maybe helper function for login and registration?

const loginUser = (e) => {

    e.preventDefault();

    console.log( `users in storage: ${users}`);
    //change name
  
    logoutLink = document.querySelector(".logoutLink");
    loginLink = document.querySelector(".loginLink");
    registrationLink = document.querySelector(".registrLink");
    emailInput = document.getElementById("email");
//change to array

    const currentUser = users.find(user => user.email === emailInput.value)
    console.log(currentUser)

    if(emailInput.value.includes("@") && emailInput.value === currentUser.email.value ) {
        console.log("login correct");
        localStorage.setItem("user",currentUser);
        window.history.pushState({}, "","/transactions");
    
       }else{
        //inserting message below input BUT ONLY ONCE *
        liInput = document.querySelector(".form-row");
        const emailMessage = document.createElement("p");
        emailMessage.innerHTML= "Insert proper email"
        emailMessage.classList.add("email-error");
    
        liInput.insertAdjacentElement('afterend',emailMessage);
        return
    }


    //should i do "if" only for possible situation or not to be sure?
    loggedIn = localStorage.getItem("user");

    if (loggedIn) {
        logoutLink.style.visibility = "visible";
        loginLink.style.visibility = "hidden";
        registrationLink.style.visibility = "hidden";
       }
    
    if (!loggedIn) logoutLink.style.visibility = "hidden";

    loginLink.style.order = "0";
    registrationLink.style.order = "0";

   }
 


export const beforeLoginRender = async () => {
    store.isInLogin = true;
    registrationLink = document.querySelector(".registrLink");
    loginLink = document.querySelector(".loginLink")
    if(store.isInLogin){
        loginLink.style.visibility = "hidden";
        registrationLink.style.visibility = "visible";
        loginLink.style.order = "1";
        registrationLink.style.order = "-1";
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

 btnLogin = document.getElementById('login-btn');
 //for validation
 emailInput = document.querySelector('#email');
 passwordInput = document.querySelector('#password');
 //these selectors should be visible by code because navigation is in index.html
 loggedIn = localStorage.getItem("user");

 btnLogin.onclick = loginUser;
};

export const cleanupLogin = () => {
    console.log('cleanupLogin');
    btnLogin = document.getElementById('login-btn');
    btnLogin.removeEventListener('click', loginUser);
};

