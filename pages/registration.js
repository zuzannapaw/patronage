// <!-- <link rel="stylesheet" href="styles/registration.css" /> -->
import { store } from "../js/global";
let registrationLink;
let loginLink;

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
            <a href="/user" onclick="route()">Zarejestruj</a>
          </li>
        </ul>
      </form>
    </div>
`;
export const initRegistration = () => {
  registrationLink = document.querySelector(".registrLink")
  loginLink = document.querySelector(".loginLink")
  store.isInLogin = false;
  if(!store.isInLogin){
    registrationLink.style.visibility = "hidden";
    loginLink.style.visibility = "visible"
  }
};
export const cleanupRegistration = () => {};