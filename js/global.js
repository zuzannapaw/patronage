

const loginButton =  document.querySelector("login");

const state = {
    loggedIn: false,
};

const updateLogin = ()=>  {

    state.loggedIn = !state.loggedIn

};

loginButton.addEventListener("click",updateLogin);

console.log(state.loggedIn)