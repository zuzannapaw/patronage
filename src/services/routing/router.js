/* PAGES */
// 404
const page_404_before_render = Object.prototype.patronage.getGlobalKey('page_404_before_render');
const page_404_render = Object.prototype.patronage.getGlobalKey('page_404_render');
const page_404_init = Object.prototype.patronage.getGlobalKey('page_404_init');
const page_404_cleanup = Object.prototype.patronage.getGlobalKey('page_404_cleanup');

// Home
const page_before_home_render = Object.prototype.patronage.getGlobalKey('page_before_home_render');
const page_home_render = Object.prototype.patronage.getGlobalKey('page_home_render');
const page_home_init = Object.prototype.patronage.getGlobalKey('page_home_init');
const page_home_cleanup = Object.prototype.patronage.getGlobalKey('page_home_cleanup');

// Login
const page_render_login = Object.prototype.patronage.getGlobalKey('page_render_login');
const page_login_render = Object.prototype.patronage.getGlobalKey('page_login_render');
const page_login_init = Object.prototype.patronage.getGlobalKey('page_login_init');
const page_login_cleanup = Object.prototype.patronage.getGlobalKey('page_login_cleanup');

// Registration
const page_before_registration_render = Object.prototype.patronage.getGlobalKey('page_before_registration_render');
const page_registration_render = Object.prototype.patronage.getGlobalKey('page_registration_render');
const page_registration_init = Object.prototype.patronage.getGlobalKey('page_registration_init');
const page_registration_cleanup = Object.prototype.patronage.getGlobalKey('page_registration_cleanup');

// Transactions
const page_before_transactions_render = Object.prototype.patronage.getGlobalKey('page_before_transactions_render');
const page_transactions_render = Object.prototype.patronage.getGlobalKey('page_transactions_render');
const page_transactions_init = Object.prototype.patronage.getGlobalKey('page_transactions_init');
const page_transactions_cleanup = Object.prototype.patronage.getGlobalKey('page_transactions_cleanup');

const routes = {
    404: {
        beforeRender: page_404_before_render,
        render: page_404_render,
        init: page_404_init,
        cleanup: page_404_cleanup
    },
    '/': {
        beforeRender: page_before_home_render,
        render: page_home_render,
        init: page_home_init,
        cleanup: page_home_cleanup
    },
    '/login': {
        beforeRender: page_render_login,
        render: page_login_render,
        init: page_login_init,
        cleanup: page_login_cleanup
    },
    '/registration': {
        beforeRender: page_before_registration_render,
        render: page_registration_render,
        init: page_registration_init,
        cleanup: page_registration_cleanup
    },
    '/transactions': {
        beforeRender: page_before_transactions_render,
        render: page_transactions_render,
        init: page_transactions_init,
        cleanup: page_transactions_cleanup
    },
}

// https://dev.to/thedevdrawer/single-page-application-routing-using-hash-or-url-9jh
const locationHandler = async () => {
    // get the url path, replace hash with empty string
    let location = window.location.hash.replace("#", "");
    // if the path length is 0, set it to primary page route
    if (location.length == 0) {
        location = "/";
    }

    // get the route object from the routes object
    const route = routes[location] || routes[404];

    let beforeResult;

    if (route.beforeRender) {
        beforeResult = await route.beforeRender();
    }

    // get the html from the template
    const html = route.render(beforeResult);
    // set the content of the content div to the html
    document.getElementById("main-page").innerHTML = html;

    route.init();
};

window.addEventListener("hashchange", locationHandler);
// call the urlLocationHandler to load the page
locationHandler();
