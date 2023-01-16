let home_logoutBtn = document.querySelector(".logout-btn");;
let home_toLoginBtn = document.querySelector(".to-login-page");
let home_toRegistrationBtn = document.querySelector(".to-registration-page");

const beforeRenderHome  = () => {
    console.log('Before render home');

    home_logoutBtn.style.visibility = "hidden";
    home_toLoginBtn.style.visibility = "visible";
    home_toRegistrationBtn.style.visibility = "visible";

    //navigation buttons get to normal position
    home_toLoginBtn.style.order = "0";
    home_toRegistrationBtn.style.order = "0";
};

Object.prototype.patronage.setGlobalKey('page_before_home_render', beforeRenderHome);

const renderHome  = () => {
    console.log('Home render');

    return (`
    <div class="start-decoration">
        <div class ="text-decoration">
            <h1 class="text">Kontrol Bank</h1>
            <div class="h2-wrapper">
                <h2 class="text">Miej kontrolę nad swoimi wydatkami.</h2>
                <h2 class="text">Planuj lepiej z nami.</h2>
            </div>
        </div>
        <img src="./src/images/money.jpg" alt="Pieniądze">
    <div>
    `);
};
Object.prototype.patronage.setGlobalKey('page_home_render', renderHome);

const initHome = () => {
    console.log('Home init');
    home_logoutBtn
    home_toLoginBtn
    home_toRegistrationBtn
};
Object.prototype.patronage.setGlobalKey('page_home_init', initHome);

const cleanupHome = () => {
    console.log('Home cleanup');
};
Object.prototype.patronage.setGlobalKey('page_home_cleanup', cleanupHome);
