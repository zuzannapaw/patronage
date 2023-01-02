import { getData } from '../services/api-service.js';
import { store } from '../js/global.js';

let registrationLink;
let loginLink;
let logoutLink;
let loggedIn;

const logoutUser = () => {
    console.log("logout correct")
    localStorage.clear("user");
    logoutLink = document.querySelector(".logoutLink");
    loggedIn = localStorage.getItem("user");

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
    const { record } = await getData('https://api.jsonbin.io/v3/b/63adb792dfc68e59d5737c74', {
        'x-access-key': '$2b$10$x7ySYzbsgjw/0uzom0c9Su40HGSn/Qiw9VHcoGQNU1V6bwQdnRDIS',
    });

    store.transactions = record.transactions;

    const result = { transactions: record.transactions };

    return result;
}

export const renderTransactions = ({ transactions }) => {
    return (`
        <h1>transactions</h1>
        <ul id='transactions-list'>
            ${transactions.map(transaction => (`
                <li>
                    <div id="transaction-${transaction.id}">
                        Transaction ${transaction.id}
                    </div>
                </li>
                `)
    )}
        </ul>
    `)
};

export const initTransactions = () => {
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

    registrationLink = document.querySelector(".registrLink");
    loginLink = document.querySelector(".loginLink");
    logoutLink = document.querySelector(".logoutLink");
    loggedIn = localStorage.getItem("user");

    logoutLink.onclick = logoutUser;
};

export const cleanupTransactions = () => {
    console.log('cleanupLogin');
    logoutLink = document.querySelector('.logoutLink');
    logoutLink.removeEventListener('click', logoutUser);
};