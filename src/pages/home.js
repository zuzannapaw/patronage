const beforeRenderHome  = () => {
    console.log('Before render home');
};
Object.prototype.patronage.setGlobalKey('page_before_home_render', beforeRenderHome);

const renderHome  = () => {
    console.log('Home render');

    return (`
        <h1>Dzień dobry!</h1>
    `);
};
Object.prototype.patronage.setGlobalKey('page_home_render', renderHome);

const initHome = () => {
    console.log('Home init');
};
Object.prototype.patronage.setGlobalKey('page_home_init', initHome);

const cleanupHome = () => {
    console.log('Home cleanup');
};
Object.prototype.patronage.setGlobalKey('page_home_cleanup', cleanupHome);
