import { cleanup404, init404, render404 } from "../pages/404.js";
import { cleanupMain, initMain, renderMain } from "../pages/main.js";
import { cleanupLogin, initLogin, renderLogin } from "../pages/login.js";
import { cleanupRegistration, initRegistration, renderRegistration } from "../pages/registration.js";
import {
    cleanupTransactions,
    initTransactions,
    renderTransactions,
    beforeTransactionsRender,
} from "../pages/transactions.js";
import {
    cleanupTransaction,
    initTransaction,
    renderTransaction,
    beforeTransactionRender,
} from "../pages/transaction.js";

export const routes = {
    404: {render: render404, init: init404, cleanup: cleanup404},
    "/": {render: renderMain, init: initMain, cleanup: cleanupMain},
    "/registration": {render: renderRegistration, init: initRegistration, cleanup: cleanupRegistration},
    "/login": {render: renderLogin, init: initLogin, cleanup: cleanupLogin},
    "/transactions": {
        beforeRender: beforeTransactionsRender,
        render: renderTransactions,
        init: initTransactions,
        cleanup: cleanupTransactions
    },
    "/transaction/1": {
        beforeRender: beforeTransactionRender,
        render: renderTransaction,
        init: initTransaction,
        cleanup: cleanupTransaction
    },
}

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    let beforeResult;

    if (route.beforeRender) {
        beforeResult = await route.beforeRender();
    }

    document.getElementById("main-page").innerHTML = route.render(beforeResult);
    route.init();
}

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const cleanup = () => {
    console.log('location changed!');
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    route.cleanup();
}

// https://stackoverflow.com/a/52809105
(() => {
    let oldPushState = history.pushState;
    history.pushState = function pushState() {
        let ret = oldPushState.apply(this, arguments);
        window.dispatchEvent(new Event('pushstate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
    };

    let oldReplaceState = history.replaceState;
    history.replaceState = function replaceState() {
        let ret = oldReplaceState.apply(this, arguments);
        window.dispatchEvent(new Event('replacestate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
    };

    window.addEventListener('popstate', () => {
        window.dispatchEvent(new Event('locationchange'));
    });
})();

window.addEventListener('locationchange', function () {
    console.log('location changed!', window.location.href);
    handleLocation();
});

window.route = route;

handleLocation();
