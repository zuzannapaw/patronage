
const page_not_found_storeInLogin = Object.prototype.patronage.getGlobalKey('store',store);

const beforeRender404  = () => {
    console.log('Before 404 render');

   page_not_found_storeInLogin.isInLoginPage = false;
   Object.prototype.patronage.setGlobalKey('store',storeInLogin);
   
    const page_not_found_toRegistrationBtn = document.querySelector(".to-registration-page");
    const page_not_found_toLoginBtn = document.querySelector(".to-login-page")
    if (!page_not_found_storeInLogin.isInLoginPage) {
        page_not_found_toLoginBtn.style.visibility = "visible";
        page_not_found_toRegistrationBtn.style.visibility = "visible";
        page_not_found_toLoginBtn.style.order = "0";
        page_not_found_toRegistrationBtn.style.order = "0";
    }
};
Object.prototype.patronage.setGlobalKey('page_404_before_render', beforeRender404);

const render404  = () => {
    console.log('404 Render');

    return (`
        <h1>PAGE NOT FOUND</h1>`
    );
};
Object.prototype.patronage.setGlobalKey('page_404_render', render404);

const init404 = () => {
    console.log('404 init');
};
Object.prototype.patronage.setGlobalKey('page_404_init', init404);

const cleanup404 = () => {
    console.log('404 cleanup');
};
Object.prototype.patronage.setGlobalKey('page_404_cleanup', cleanup404);