
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

let registration_confirmedEmail;
let registration_properPassword;
let registration_properEmail;
let registration_uniqueUsername;
let registration_uniqueEmail;
let registration_properUsername; 

//function for delete old error messages - updating view in form 
let registration_deleteOldErrorMessage = () => {
  const errorMessages = document.querySelectorAll(".error-message");
  console.log(`error messages found`);
  if (errorMessages.length > 0) {
    errorMessages.forEach(err => err.parentNode.removeChild(err));
  };
};

const checkEmailAndAliases = (str) =>{
  return /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(str);
};

const checkUsername = (str) =>{
  return /^((?=.*[0-9])(?=.*[a-zA-Z]{5,})[a-zA-Z0-9\-\_\/\\]{6,16})$/.test(str);
};

const isEmailUnique = (email, users_storage) => {
  const isEmailTaken = users_storage.find(user=> user.email === email); 
  if(isEmailTaken) {
    return false; 
  };
  return true;
};

const isUsernameUnique = (username, users_storage) => {
  const isUsernameTaken = users_storage.find(user=> user.username === username ) 
  if(isUsernameTaken){
    return false;
  }
  return true;
};

const errorInputDisplay = (str,elementWrapper )=> { 
  const message = document.createElement("p");
  message.innerHTML = str;
  message.classList.add("error-message");
  elementWrapper.insertAdjacentElement('afterend', message);
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

  //validation
  registration_properEmail = checkEmailAndAliases(newUser.email);
  registration_uniqueEmail = isEmailUnique(newUser.email,registration_users)
  registration_confirmedEmail = registration_confirmEmailInput.value === newUser.email;
  registration_properUsername = checkUsername(newUser.username)
  registration_uniqueUsername = isUsernameUnique(newUser.username, registration_users) 
  registration_properPassword = newUser.password.length > 5;

//check in console log if registraction passed
  console.log(`uniqueEmail ${registration_uniqueEmail}`)
  console.log(`uniqueUsername ${registration_uniqueUsername}`)
  console.log(`properPassword ${registration_properPassword}`)
  console.log(`emailConfirmed ${registration_confirmedEmail}`)

  const isEmailValid =  registration_properEmail && registration_uniqueEmail && registration_confirmedEmail; 
  const isUserNameValid = registration_properUsername  && registration_uniqueUsername;


  const isFormValid = isEmailValid && isUserNameValid && registration_properPassword;
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
    if (!registration_properEmail) {
      errorInputDisplay("Email musi mieć poprawny format", registration_emailInputWrapper);

    } if (!registration_uniqueEmail) {
      errorInputDisplay("Zajęty email. Użyj innego email", registration_emailInputWrapper);

    } if (!registration_confirmedEmail) {
      errorInputDisplay(`Pole "Potwierdź email musi mieć taką samą wartość jak pole "Email"`, registration_confirmEmailInputWrapper);
      
    } if (!registration_uniqueUsername) {
      errorInputDisplay("Nazwa użytkownika musi być unikalna.", registration_usernameInputWrapper);

    } if (!registration_properUsername) {
      errorInputDisplay("Nazwa użytkownika ma wynosić od 6 do 16 znaków, składać się tylko z liter, cyfr i znaków - _ [ ] \ / przy czym musi zawierać co najmniej 5 liter i jedną cyfrę", registration_usernameInputWrapper);
    
    } if (!registration_properPassword) {
      errorInputDisplay("Hasło musi składać się conajmniej z 6 znaków.", registration_passwordInputWrapper);
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