
import { store } from '../js/global.js';
let toRegistrationBtn;
let toLoginBtn


let logoutBtn;
let registrationBtn;

let emailInput;
let confirmEmailInput;
let passwordInput;
let usernameInput;

let navBar;
let logoutWrapper;
let ulWrapper;

//for validation
let emailInputWrapper;
let confirmEmailInputWrapper;
let usernameInputWrapper;
let passwordInputWrapper;

let freeEmail;
let users;
let loggedIn;

let emailConfirmed;
let properPassword;
let uniqueUsername;
let uniqueEmail;

//function for delete old error messages - updating view in form 
let deleteOldErrorMessage = () => {
  const errorMessages = document.querySelectorAll(".error-message");

  console.log(`error messages found`);

  if (errorMessages.length > 0) {
    errorMessages.forEach(err => err.parentNode.removeChild(err));
  };
};


const registrationHandle = (e) => {
  e.preventDefault();

  deleteOldErrorMessage();
  ////////////////////////////////
  const storageUsers = sessionStorage.getItem("users");

  if (storageUsers) {
    users = JSON.parse(storageUsers);
  } else {
    users = [];
  }

  //creating new user
  const newUser = {
    email: emailInput.value,
    username: usernameInput.value,
    password: passwordInput.value,
  };

  // validation start
  //validation for unique email in case when users array exist and not
  if (users.length > 0) {
    const emailIsTaken = users.find(user => user.email === emailInput.value);
    if (emailIsTaken) {
      console.log('user is free')
      freeEmail = false
    } else {
      console.log('user is not free')
      freeEmail = emailInput.value;
    }
  } else {
    freeEmail = emailInput.value
  };

  uniqueEmail = newUser.email === freeEmail;
  properPassword = passwordInput.value.length > 5;
  emailConfirmed = confirmEmailInput.value == emailInput.value;

  //validation for unique username in case when users array exist and not
  if (users.length > 0) {
    const usernameIsTaken = users.find(user => user.username === usernameInput.value);
    if (usernameIsTaken) {
      uniqueUsername = false
    } else {
      uniqueUsername = usernameInput.value;
    }
  } else {
    uniqueUsername = usernameInput.value;
  };

  console.log(`uniqueEmail ${uniqueEmail}`)
  console.log(`uniqueUsername ${uniqueUsername}`)
  console.log(`properPassword ${properPassword}`)
  console.log(`emailConfirmed ${emailConfirmed}`)

  //main validation
  if (uniqueEmail && emailConfirmed && uniqueUsername && properPassword) {
    users.push(newUser);
    const updatedUsersString = JSON.stringify(users);
    sessionStorage.setItem("users", updatedUsersString);
    const newUserString = JSON.stringify(newUser)
    sessionStorage.setItem("currentUser", newUserString);
    const usernameDiv = document.createElement("div");
    const innerText = `<h4>${newUser.username}</h4>`
    usernameDiv.insertAdjacentHTML("afterbegin", innerText)
    usernameDiv.classList.add("username-div");
    logoutWrapper.insertAdjacentElement("beforeend", usernameDiv);
    window.history.pushState({}, "", "/transactions");

    //for proper navigation display after changing location
    loggedIn = sessionStorage.getItem("currentUser");

    if (loggedIn) {
      logoutBtn.style.visibility = "visible";
      toLoginBtn.style.visibility = "hidden";
      toRegistrationBtn.style.visibility = "hidden";
    };

    if (!loggedIn) logoutBtn.style.visibility = "hidden";

    //navigation buttons get to normal position
    toLoginBtn.style.order = "0";
    toRegistrationBtn.style.order = "0";

    console.log("registration correct")

    //i will see only first error if there is more during one registration!!!

  } else {
      if (!uniqueEmail) {
      const message = document.createElement("p");
      message.innerHTML = "Zajęty email. Użyj innego email"
      message.classList.add("error-message");
      emailInputWrapper.insertAdjacentElement('afterend', message);
    } if (!emailConfirmed) {
      const message = document.createElement("p");
      message.innerHTML = "Email musi być potwierdzony."
      message.classList.add("error-message");
      confirmEmailInputWrapper.insertAdjacentElement('afterend', message);
    } if (!uniqueUsername) {
      const message = document.createElement("p");
      message.innerHTML = "Nazwa użytkownika musi być unikalna."
      message.classList.add("error-message");
      usernameInputWrapper.insertAdjacentElement('afterend', message);
    } if (!properPassword) {
      const message = document.createElement("p");
      message.innerHTML = "Hasło musi składać się conajmniej z 6 znaków."
      message.classList.add("error-message");
      passwordInputWrapper.insertAdjacentElement('afterend', message);
    }
  }
  

};

export const beforeRegistrationRender = async () => {
  store.isInLoginPage = false;
  navBar = document.getElementById("main-nav");
  toRegistrationBtn = document.querySelector(".to-registration-page");
  toLoginBtn = document.querySelector(".to-login-page");
  if (!store.isInLoginPage) {
    toLoginBtn.style.visibility = "visible";
    toRegistrationBtn.style.visibility = "hidden";
    toRegistrationBtn.style.order = "1";
    toLoginBtn.style.order = "-1";
  }

}

export const renderRegistration = () => `<div class="form-wrapper">
    <form>
        <ul class="wrapper">
            <li class="form-row" id="email-li">
                <label for="email">Email</label>
                <input id="email">
              </li>
          <li class="form-row" id="confirm-email-li">
            <label>Potwierdź email</label>
            <input class="registration-email" id="confirm-email">
          </li>
          <li class="form-row" id="username-li">
          <label>Nazwa użytkownika</label>
          <input class="registration-username" type="text" id="username">
        </li>
          <li class="form-row" id="password-li">
            <label for="password">Hasło</label>
            <input type="password" id="password">
          </li>
          <li class="form-row">
            <button class="registration-button">Zarejestruj</a>
          </li>
        </ul>
      </form>
    </div>
`;

export const initRegistration = () => {
  ulWrapper = document.querySelector(".wrapper")
  logoutWrapper = document.querySelector(".logoutWrapper");
  logoutBtn = document.querySelector(".logout-btn");
  emailInput = document.getElementById("email");
  confirmEmailInput = document.getElementById("confirm-email");
  usernameInput = document.getElementById("username");
  passwordInput = document.getElementById("password");

  emailInputWrapper = document.getElementById("email-li");
  confirmEmailInputWrapper = document.getElementById("confirm-email-li");
  usernameInputWrapper = document.getElementById("username-li");
  passwordInputWrapper = document.getElementById("password-li");

  registrationBtn = document.querySelector(".registration-button");

  // //function for delete old error messages - updating view in form
  // deleteOldErrorMessage = () => {
  //   // const isErrorInRegistration = document.querySelector(".wrapper > .error-message")
  //   const errorMessages = document.querySelectorAll(".error-message");

  //   console.log(`error messages found`);
  //   // console.log(`is error ${!!isErrorInRegistration}`)

  //   if (errorMessages.length > 0) {
  //     // if (!!isErrorInRegistration) {
  //       // ulWrapper.removeChild(errorMessage)
  //     // };
  //     errorMessages.forEach(err => err.parentNode.removeChild(err));
  //   };
  // };

  registrationBtn.onclick = registrationHandle;
};

export const cleanupRegistration = () => { };