
import { store } from '../js/global.js';
let registrationLink;
let loginLink;
let logoutLink;
let navBar;
let registrationButton;


const registrationHandle = () => {
  logoutLink = document.querySelector(".logoutLink");
  loginLink = document.querySelector(".loginLink");
  registrationLink = document.querySelector(".registrLink");
  
  localStorage.setItem("user","zuza");
  const loggedIn = localStorage.getItem("user");


  //should i do "if" only for possible situation or not to be sure?

  if (loggedIn) {
      logoutLink.style.visibility = "visible";
      loginLink.style.visibility = "hidden";
      registrationLink.style.visibility = "hidden";
     }
  
  if (!loggedIn) logoutLink.style.visibility = "hidden";

  
 return window.history.pushState({}, "","/transactions");
 

}

export const renderRegistration = () => `<div class="form-wrapper">
    <form>
        <ul class="wrapper">
            <li class="form-row">
                <label for="password">Hasło</label>
                <input type="password" id="password">
              </li>
          <li class="form-row">
            <label for="townborn">Email</label>
            <input type="text" id="townborn">
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