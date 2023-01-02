
import { store } from '../js/global.js';
let registrationLink;
let loginLink;
let logoutLink;
let navBar;
let registrationButton;
let emailInput;
let passwordInput;
let loggedIn;
let liInput;

//if i change value of variable inside function it will be changed in global scope as well?


const registrationHandle = (e) => {
  e.preventDefault();
  logoutLink = document.querySelector(".logoutLink");
  loginLink = document.querySelector(".loginLink");
  registrationLink = document.querySelector(".registrLink");
  emailInput = document.querySelector(".registration-email");
  passwordInput = document.getElementById("password");
  
  const storageUsers = localStorage.getItem("users");
  const users = JSON.parse(storageUsers);
  
  const newUser = {
  email: emailInput.value,
  name: "zuza",
  //name will be changed in global state
  password: passwordInput.value,
}
 
  //should i do "if" only for possible situation or not to be sure?
  //freeUser if existing user or another user
  let freeUser;
  if(users.length){
  freeUser = users.find(user=> user.email !== emailInput.value);
  }else{
    freeUser = emailInput.value
  };

  //basic validation
  if(newUser.email === freeUser){
    users.push(newUser);
    const newUserString = JSON.stringify(users);
    localStorage.setItem("users",newUserString);
    localStorage.setItem("user",newUser);
    loggedIn = localStorage.getItem("user");
    window.history.pushState({}, "","/transactions");
   
    console.log("registration correct")

    
  }else{
    liInput = document.querySelector(".form-row");
    const emailMessage = document.createElement("p");
    emailMessage.innerHTML= "Email duplicated. Insert another email"
    emailMessage.classList.add("email-error");

    liInput.insertAdjacentElement('afterend',emailMessage);
    return
  }


  if (loggedIn) {
    logoutLink.style.visibility = "visible";
    loginLink.style.visibility = "hidden";
    registrationLink.style.visibility = "hidden";
   }

if (!loggedIn) logoutLink.style.visibility = "hidden";
 
};

export const renderRegistration = () => `<div class="form-wrapper">
    <form>
        <ul class="wrapper">
            <li class="form-row">
                <label for="password">Hasło</label>
                <input type="password" id="password">
              </li>
          <li class="form-row">
            <label>Email</label>
            <input class="registration-email" type="text" id="townborn">
          </li>
          <li class="form-row">
            <label for="email">Potwierdź email</label>
            <input type="email" id="email">
          </li>
          <li class="form-row">
            <button class="registr-button">Zarejestruj</a>
          </li>
        </ul>
      </form>
    </div>
`;

export const beforeRegistrationRender = async () => {
  store.isInLogin = false;
  navBar = document.getElementById("main-nav");
  registrationLink = document.querySelector(".registrLink");
  loginLink = document.querySelector(".loginLink")
  if (!store.isInLogin) {
    loginLink.style.visibility = "visible";
    registrationLink.style.visibility = "hidden";
    registrationLink.style.order = "1";
    loginLink.style.order = "-1";
  }

}

export const initRegistration = () => {

  registrationButton = document.querySelector(".registr-button");
  
  registrationButton.onclick = registrationHandle;



};
export const cleanupRegistration = () => { };