
const registrationStore = Object.prototype.patronage.getGlobalKey('store');

let registration_toLoginBtn
let registration_logoutBtn;
let registration_toRegistrationBtn

let registration_registrationBtn

let registration_emailInput;
let registration_confirmEmailInput;
let registration_passwordInput;
let registration_usernameInput;

let registration_navBar;
let registration_logoutWrapper;
let registration_ulWrapper;

//for validation
let registration_emailInputWrapper;
let registration_confirmEmailInputWrapper;
let registration_usernameInputWrapper;
let registration_passwordInputWrapper;

let registration_freeEmail;
let registration_users;
let registration_loggedIn;

let registration_emailConfirmed;
let registration_properPassword;
let registration_properEmail;
let registration_uniqueUsername;
let registration_uniqueEmail;

//function for delete old error messages - updating view in form 
let registration_deleteOldErrorMessage = () => {
  const errorMessages = document.querySelectorAll(".error-message");

  console.log(`error messages found`);

  if (errorMessages.length > 0) {
    errorMessages.forEach(err => err.parentNode.removeChild(err));
  };
};

const checkEmailAlias = (str) =>{
  return /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(str);
}

  //validation for proper username regex 
const checkUsername = (str) =>{
  return /^((?=.*[0-9])(?=.*[a-zA-Z]{5,})[a-zA-Z0-9\-\_\/\\]{6,16})$/.test(str);
};

const registrationHandle = (e) => {
  e.preventDefault();

  registration_deleteOldErrorMessage();
  ////////////////////////////////
  const storageUsers = sessionStorage.getItem("users");
  if (storageUsers) {
    registration_users = JSON.parse(storageUsers);
  } else {
    registration_users = [];
  };

  //creating new user
  const newUser = {
    email: registration_emailInput.value,
    username: registration_usernameInput.value,
    password: registration_passwordInput.value,
  };

  // validation start
  //validation for unique email in case when users array exist and not
  if (registration_users.length > 0) {
    const emailIsTaken = registration_users.find(user => user.email === registration_emailInput.value);
    if (emailIsTaken) {
      console.log('user is free')
      registration_freeEmail = false
    } else {
      console.log('user is not free')
      registration_freeEmail = registration_emailInput.value;
    }
  } else {
    registration_freeEmail = registration_emailInput.value
  };

  //validations for other inputs
  registration_properEmail = registration_emailInput.value.includes("@") && registration_emailInput.value.includes(".") ;
  registration_uniqueEmail = newUser.email === registration_freeEmail;
  registration_properPassword = registration_passwordInput.value.length > 5;
  registration_emailConfirmed = registration_confirmEmailInput.value == registration_emailInput.value;

  //validation for unique username in case when users array exist and not
  if (registration_users.length > 0) {
    const usernameIsTaken = registration_users.find(user => user.username === registration_usernameInput.value);
    if (usernameIsTaken) {
      registration_uniqueUsername = false
    } else {
      registration_uniqueUsername = registration_usernameInput.value;
    }
  }else{
    registration_uniqueUsername = registration_usernameInput.value;
  };
//check in console log if registraction passed
  console.log(`uniqueEmail ${registration_uniqueEmail}`)
  console.log(`uniqueUsername ${registration_uniqueUsername}`)
  console.log(`properPassword ${registration_properPassword}`)
  console.log(`emailConfirmed ${registration_emailConfirmed}`)

  const isEmailAlias = checkEmailAlias(registration_emailInput.value)   
  const isUserNameValid = checkUsername(registration_usernameInput.value);
//alias
  console.log(` email alias ${isEmailAlias}`) 

  const isFormValid = registration_uniqueEmail && registration_properEmail && registration_emailConfirmed && registration_uniqueUsername && isUserNameValid && registration_properPassword;
  //main validation
  if (isFormValid) {
    registration_users.push(newUser);
    const updatedUsersString = JSON.stringify(registration_users);
    sessionStorage.setItem("users", updatedUsersString);
    const newUserString = JSON.stringify(newUser)
    //setting current user (new registrated) in session storage
    sessionStorage.setItem("currentUser", newUserString);
    const usernameDiv = document.createElement("div");
    const innerText = `<h4>${newUser.username}</h4>`
    usernameDiv.insertAdjacentHTML("afterbegin", innerText)
    usernameDiv.classList.add("username-div");
     //do not work 
    registration_logoutWrapper.insertAdjacentElement("beforeend", usernameDiv);
    window.location.hash = '#/transactions';

    // geting current user for proper navigation display after changing location
    registration_loggedIn = sessionStorage.getItem("currentUser");

    if (registration_loggedIn) {
      registration_logoutBtn.style.visibility = "visible";
      registration_toLoginBtn.style.visibility = "hidden";
      registration_toRegistrationBtn.style.visibility = "hidden";
    };

    if (!registration_loggedIn) nav_logoutBtn.style.visibility = "hidden";

    //navigation buttons get to normal position
    registration_toLoginBtn.style.order = "0";
    registration_toRegistrationBtn.style.order = "0";

    console.log("registration correct")

  } else {
    if(!registration_properEmail){
      const message = document.createElement("p");
      message.innerHTML = "Email musi mieć poprawny format";
      message.classList.add("error-message");
      registration_emailInputWrapper.insertAdjacentElement('afterend', message);

    }if (!registration_uniqueEmail) {
      const message = document.createElement("p");
      message.innerHTML = "Zajęty email. Użyj innego email"
      message.classList.add("error-message");
      registration_emailInputWrapper.insertAdjacentElement('afterend', message);

    } if (!registration_emailConfirmed) {
      const message = document.createElement("p");
      message.innerHTML = `Pole "Potwierdź email musi mieć taką samą wartość jak pole "Email"`
      message.classList.add("error-message");
      registration_confirmEmailInputWrapper.insertAdjacentElement('afterend', message);

    } if (!registration_uniqueUsername) {
      const message = document.createElement("p");
      message.innerHTML = "Nazwa użytkownika musi być unikalna."
      message.classList.add("error-message");
      registration_usernameInputWrapper.insertAdjacentElement('afterend', message);

    } if (!isUserNameValid) {
      const message = document.createElement("p");
      message.innerHTML = "Nazwa użytkownika ma wynosić od 6 do 16 znaków, składać się tylko z liter, cyfr i znaków - _ [ ] \ / przy czym musi zawierać co najmniej 5 liter i jedną cyfrę"
      message.classList.add("error-message");
      registration_usernameInputWrapper.insertAdjacentElement('afterend', message);

    } if (!registration_properPassword) {
      const message = document.createElement("p");
      message.innerHTML = "Hasło musi składać się conajmniej z 6 znaków."
      message.classList.add("error-message");
      registration_passwordInputWrapper.insertAdjacentElement('afterend', message);
    }
  }
};

const beforeRegistrationRender = async () => {
  console.log('Before render registration');

  registrationStore.isInLoginPage = false;
  registration_navBar = document.getElementById("main-nav");
  registration_toRegistrationBtn = document.querySelector(".to-registration-page");
  registration_toLoginBtn = document.querySelector(".to-login-page");

  //to keep proper display of navigation
  if (!registrationStore.isInLoginPage) {
    registration_toLoginBtn.style.visibility = "visible";
    registration_toRegistrationBtn.style.visibility = "hidden";
    registration_toRegistrationBtn.style.order = "1";
    registration_toLoginBtn.style.order = "-1";
  }

}

Object.prototype.patronage.setGlobalKey('page_before_registration_render', beforeRegistrationRender);

const renderRegistration = () => {
console.log('Registration render');

return(`
<div class="form-wrapper-registration">
        <ul class="wrapper-registration">
            <li class="form-row-registration" id="email-li">
                <label for="email">Email</label>
                <input id="email">
              </li>
          <li class="form-row-registration" id="confirm-email-li">
            <label>Potwierdź email</label>
            <input class="registration-email" id="confirm-email">
          </li>
          <li class="form-row-registration" id="username-li">
          <label>Nazwa użytkownika</label>
          <input class="registration-username" type="text" id="username">
        </li>
          <li class="form-row-registration" id="password-li">
            <label for="password">Hasło</label>
            <input type="password" id="password">
          </li>
          <li class="form-row-registration">
            <button class="registration-button">Zarejestruj</a>
          </li>
        </ul>
    </div>
`)};

Object.prototype.patronage.setGlobalKey('page_registration_render', renderRegistration);

const initRegistration = () => {
  
  console.log('Registration init');

  registration_ulWrapper = document.querySelector(".wrapper")
  //it does not find this selector
  registration_logoutWrapper = document.querySelector(".logout-wrapper");
  registration_logoutBtn = document.querySelector(".logout-btn");
  registration_emailInput = document.getElementById("email");
  registration_confirmEmailInput = document.getElementById("confirm-email");
  registration_usernameInput = document.getElementById("username");
  registration_passwordInput = document.getElementById("password");

  registration_emailInputWrapper = document.getElementById("email-li");
  registration_confirmEmailInputWrapper = document.getElementById("confirm-email-li");
  registration_usernameInputWrapper = document.getElementById("username-li");
  registration_passwordInputWrapper = document.getElementById("password-li");

  registration_registrationBtn = document.querySelector(".registration-button");

  //onclick
  registration_registrationBtn.onclick = registrationHandle;
};

Object.prototype.patronage.setGlobalKey('page_registration_init', initRegistration);

const cleanupRegistration = () => { 
  console.log('Registration cleanup');
};

Object.prototype.patronage.setGlobalKey('page_registration_cleanup', cleanupRegistration);