import { getData } from '../services/api-service.js';
import { store } from '../js/global.js';

let response;
let transactions;
let transactionTypes;
let currentTransactionType;
let toRegistrationBtn;
let toLoginBtn;
let logoutBtn;
let loggedIn;

let logoutWrapper;
let usernameDiv;


const logoutUser = (e) => {
    e.preventDefault();
    console.log("logout correct");
    sessionStorage.removeItem("currentUser");
    logoutBtn = document.querySelector(".logout-btn");

    loggedIn = sessionStorage.getItem("currentUser");

    //should i do "if" only for possible situation or not to be sure?

    // if(loggedIn){
    //     logoutLink.style.visibility = "visible";
    //     loginLink.style.visibility = "hidden";
    //     registrationLink.style.visibility = "hidden";
    //  };

    //are these conditions necessary? logoutUser and functions only without check if the user is logged in or not?

    if (!loggedIn) {
        logoutBtn.style.visibility = "hidden";
        toLoginBtn.style.visibility = "visible";
        toRegistrationBtn.style.visibility = "visible";

        toRegistrationBtn.style.order = "0";
        toLoginBtn.style.order = "0";

    };

    logoutWrapper.removeChild(usernameDiv);

    return window.history.pushState({}, "", "/");

};

export const beforeTransactionsRender = async () => {
    response = await getData('https://api.npoint.io/38edf0c5f3eb9ac768bd', {});

    //mistake in object's name in database
    transactions = response.transactions;
    transactionTypes = response.transacationTypes;
    // transaction = transactions.find(transaction.type === transactionTypes.keys )
    console.log(`Transactions types ${transactionTypes}`);
    store.transactions = response.transactions;
    const result = { transactions: response.transactions };

    //do i really need store?

    return result;
}

export const renderTransactions = () => {
    let transactionTypesArray = Object.entries(transactionTypes);

    return (`
        <div class = "charts-wrapper">
            <div class="doughnut-chart">
                <canvas id="myChart"></canvas>
            </div>
            <div class="bar-chart">
                <canvas id="myChart2"></canvas>
            </div>
        </div>
        <ul id='transactions-list'>
            ${transactions.map(transaction => (`
                <li>
                    <div id="transaction-${transaction.id}">
                        Transaction ${transaction.description}
                    </div>
                    <p>Data: ${transaction.date}</p>
                    <p>Kwota: ${transaction.amount}</p>
                    <p> Saldo : ${transaction.balance} </p>
                    <p>Typ: ${transactionTypesArray.find(keyType => keyType[0] == transaction.type)[1]}</p>
                </li>
                `)
    )}
        </ul>
    `)
};
export const initTransactions = () => {


    logoutWrapper = document.querySelector(".logoutWrapper");
    toRegistrationBtn = document.querySelector(".to-registration-page");
    toLoginBtn = document.querySelector(".to-login-page");
    logoutBtn = document.querySelector(".logout-btn");
    usernameDiv = document.querySelector(".username-div");

    //charts

    const ctx = document.getElementById('myChart');

    const data = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: data,
    });


    ////////

    const ctx2 = document.getElementById('myChart2');
//utils?
    const labels = null;
    const data2 = {
        labels: labels,
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };

    new Chart(ctx2, {
        type: 'bar',
        data: data2,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    });
    ///////

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

    logoutBtn.onclick = logoutUser;
};

export const cleanupTransactions = () => {
    console.log('cleanupLogin');
    logoutBtn = document.querySelector('.logoutLink');
    logoutBtn.removeEventListener('click', logoutUser);
};