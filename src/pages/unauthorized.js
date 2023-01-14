const unauthorized_store = Object.prototype.patronage.getGlobalKey('store',store);

const beforeRenderUnauthorized  = () => {
    console.log('Before 404 render');

   unauthorized_store.isInLoginPage = false;
   Object.prototype.patronage.setGlobalKey('store',store);
   
    const unauthorized_toRegistrationBtn = document.querySelector(".to-registration-page");
    const unauthorized_toLoginBtn = document.querySelector(".to-login-page");
    
    if (!unauthorized_store.isInLoginPage) {
        unauthorized_toLoginBtn.style.visibility = "visible";
        unauthorized_toRegistrationBtn.style.visibility = "visible";
        unauthorized_toLoginBtn.style.order = "0";
        unauthorized_toRegistrationBtn.style.order = "0";
    }
};

Object.prototype.patronage.setGlobalKey('page_unauthorized_before_render', beforeRenderUnauthorized);

const renderUnauthorized  = () => {
    console.log('Unauthorized Render');

    return (`
        <h1>UNAUTHORIZED</h1>`
    );
};
Object.prototype.patronage.setGlobalKey('page_unauthorized_render', renderUnauthorized);

const initUnauthorized = () => {
    console.log('unauthorized init');
};
Object.prototype.patronage.setGlobalKey('page_unauthorized_init', initUnauthorized);

const cleanupUnauthorized = () => {
    console.log('unauthorized cleanup');
};
Object.prototype.patronage.setGlobalKey('page_unauthorized_cleanup', cleanupUnauthorized);