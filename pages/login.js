
let btnLogin;
let emailInput;
let passwordInput;

let registrationLink;
let loginLink; 
let logoutLink; 
let loggedIn; 


const loginUser = () => {
    console.log("login correct");
    localStorage.setItem("user","zuza");
    loggedIn = localStorage.getItem("user");

    //should i do "if" only for possible situation or not to be sure?

    if (loggedIn) {
        logoutLink.style.visibility = "visible";
        loginLink.style.visibility = "hidden";
        registrationLink.style.visibility = "hidden";
       }
    
    if (!loggedIn) logoutLink.style.visibility = "hidden";
   
};

export const renderLogin = () => `
<div class="form-wrapper">
    <form>
        <ul class="wrapper">
            <li class="form-row">
                <label for="email">Email</label>
                <input type="email" id="email">
            </li>
            <li class="form-row">
                <label for="password">Hasło</label>
                <input type="password" id="password">
            </li>
            <li class="form-row">
                <a id="login-btn" class="login" href="/transactions" type="submit" onclick="route()">Zaloguj</a>
            </li>
        </ul>
    </form>
</div>
`;

export const initLogin = () => {
 btnLogin = document.getElementById('login-btn');
 emailInput = document.querySelector('#email');
 passwordInput = document.querySelector('#password');
 //these selectors should be visible by code because navigation is in index.html
 registrationLink = document.querySelector(".registrLink");
 loginLink = document.querySelector(".loginLink")
 logoutLink = document.querySelector(".logoutLink");
 loggedIn = localStorage.getItem("user");

 btnLogin.addEventListener("click",loginUser)

 
};

export const cleanupLogin = () => {
    console.log('cleanupLogin');
    btnLogin = document.getElementById('login-btn');
    btnLogin.removeEventListener('click', loginUser);
};













//////////////////////////////////////////////////////////////////OLD
// const user1 = {
//     name: "Zuzanna",
//     email:"zuzanna@",
//     password:"11111",
// }

// const user2 = {
//     name: "Marcin",
//     email:"Marcin@",
//     password:"22222"
// }

// const users = [user1,user2]

// let currentUser;
// let loginHref;

//  const loginHandler = (e) => {
//      e.preventDefault();
//     //  if (emailInput.value) {
//     //     //  currentUser = users.find(user => user.email === emailInput.value);
//     //     //  loginHref = "/user";
//     //      localStorage.setItem("user","zuza");
//     //      console.log("login correct")
        
//     //  }else{
//     //      loginHref = "/";
//     //      emailInput.style.color = "red";
//     //      return
//     //      //jesli wpisaes zle dane haslo login to nie mozesz wejsc. link nie moze cie dac na druga strone 
//     //  }

//      console.log("login correct")

//  }

//  btnLogin.addEventListener("click", loginUser);