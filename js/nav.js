
//initial

const loggedIn = localStorage.getItem("user");
const registrationLink = document.querySelector(".registrLink");
const loginLink = document.querySelector(".loginLink")
const logoutLink = document.querySelector(".logoutLink");

    if (!loggedIn) logoutLink.style.visibility = "hidden";
    if (loggedIn) loginLink.style.visibility = "hidden";
    if (loggedIn) registrationLink.style.visibility = "hidden";



