import { getData } from '../services/api-service.js';
import { store } from '../js/global.js';
let response;
let registrationLink;
let loginLink;
let logoutLink;
let loggedIn;

const logoutUser = (e) => {
    e.preventDefault();
    console.log("logout correct");
    sessionStorage.removeItem("currentUser");
    logoutLink = document.querySelector(".logoutLink");
    
    loggedIn = sessionStorage.getItem("currentUser");

    //should i do "if" only for possible situation or not to be sure?

    // if(loggedIn){
    //     logoutLink.style.visibility = "visible";
    //     loginLink.style.visibility = "hidden";
    //     registrationLink.style.visibility = "hidden";
    //  };

    //are these conditions necessary? logoutUser and functions only without check if the user is logged in or not?
    
    if(!loggedIn){
        logoutLink.style.visibility = "hidden";
        loginLink.style.visibility = "visible";
        registrationLink.style.visibility = "visible";

        registrationLink.style.order = "0";
        loginLink.style.order= "0";

    };

    return window.history.pushState({}, "","/");

};

export const beforeTransactionsRender = async () => {
    response = await getData('https://api.npoint.io/38edf0c5f3eb9ac768bd',{});

    store.transactions = response.transactions;

    const result = { transactions: response.transactions };

    return result;
}

export const renderTransactions = () => {
    return (`
        <h1>transactions</h1>
        <ul id='transactions-list'>
            ${response.transactions.map(transaction => (`
                <li>
                    <div id="transaction-${transaction.id}">
                        Transaction ${transaction.description}
                    </div>
                    <p>Data: ${transaction.date}</p>
                    <p>Kwota: ${transaction.amount}</p>
                </li>
                `)
    )}
        </ul>
    `)
};

export const initTransactions = () => {

    registrationLink = document.querySelector(".registrLink");
    loginLink = document.querySelector(".loginLink");
    logoutLink = document.querySelector(".logoutLink");

    const allTransactions = store.transactions;

    for (const transaction of allTransactions) {
        const transactionDiv = document.getElementById(`transaction-${transaction.id}`);

        const onTransactionClick = (_event) => {
            window.history.pushState({}, "", `/transaction/${transaction.id}`);
        };

        if (transactionDiv) {
            transactionDiv.onclick = onTransactionClick;
        }
    }

    logoutLink.onclick = logoutUser;
};

export const cleanupTransactions = () => {
    console.log('cleanupLogin');
    logoutLink = document.querySelector('.logoutLink');
    logoutLink.removeEventListener('click', logoutUser);
};