
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
let freeUser;
let users;

//if i change value of variable inside function it will be changed in global scope as well?


const registrationHandle = (e) => {
  e.preventDefault();
 
  const storageUsers = sessionStorage.getItem("users");

  if(storageUsers){
    users = JSON.parse(storageUsers);
  }else{
    users = [];
  }
  
  const newUser = {
  email: emailInput.value,
  name: JSON.stringify(emailInput.value).substring(-1,1),
  password: passwordInput.value,
 };
 

  //freeUser if existing user or another user
  if(users.length > 0){
  freeUser = users.find(user=> user.email !== emailInput.value);
  }else{
    freeUser = emailInput.value
  };

  //basic validation
  if(newUser.email === freeUser){
    users.push(newUser);
    const updatedUsersString = JSON.stringify(users);
    sessionStorage.setItem("users",updatedUsersString);
    const newUserString = JSON.stringify(newUser)
    sessionStorage.setItem("currentUser",newUserString);
    window.history.pushState({}, "","/transactions");
   
    console.log("registration correct")

  }else{
    liInput = document.querySelector(".form-row");
    const emailMessage = document.createElement("p");
    emailMessage.innerHTML= "Email duplicated. Insert another email"
    emailMessage.classList.add("email-error");
    liInput.insertAdjacentElement('afterend',emailMessage);
  }

  loggedIn = sessionStorage.getItem("currentUser");

  if (loggedIn) {
    logoutLink.style.visibility = "visible";
    loginLink.style.visibility = "hidden";
    registrationLink.style.visibility = "hidden";
   }

if (!loggedIn) logoutLink.style.visibility = "hidden";
 
};

export const beforeRegistrationRender = async () => {
  store.isInLoginPage = false;
  navBar = document.getElementById("main-nav");
  registrationLink = document.querySelector(".registrLink");
  loginLink = document.querySelector(".loginLink")
  if (!store.isInLoginPage) {
    loginLink.style.visibility = "visible";
    registrationLink.style.visibility = "hidden";
    registrationLink.style.order = "1";
    loginLink.style.order = "-1";
  }

}

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

export const initRegistration = () => {
  logoutLink = document.querySelector(".logoutLink");
  emailInput = document.querySelector(".registration-email");
  passwordInput = document.getElementById("password");

  registrationButton = document.querySelector(".registr-button");
  
  registrationButton.onclick = registrationHandle;
};

export const cleanupRegistration = () => {};