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
        <div class ="transactions-list-wrapper">
            <ul class="transactions-list">
                ${transactions.map(transaction => (`
                    <li class="transaction">
                        <div class="transaction-data">
                            <p>${transaction.description}<p>
                        </div>
                        <div class="transaction-data">
                            <p>Data: ${transaction.date}</p>
                        </div>
                        <div class="transaction-data">
                            <p>Kwota: ${transaction.amount}</p>
                        </div>
                        <div class="transaction-data">
                            <p>Saldo : ${transaction.balance} </p>
                        </div>
                        <div class="transaction-data">
                            <p>Typ: ${transactionTypesArray.find(keyType => keyType[0] == transaction.type)[1]}</p>
                        </div>
                    </li>
                    `)
                )}
            </ul>
        </div>
    `)
};

export const initTransactions = () => {
    logoutWrapper = document.querySelector(".logoutWrapper");
    toRegistrationBtn = document.querySelector(".to-registration-page");
    toLoginBtn = document.querySelector(".to-login-page");
    logoutBtn = document.querySelector(".logout-btn");
    usernameDiv = document.querySelector(".username-div");

    //charts

    //doughnut chart
    const ctx = document.getElementById('myChart');

    //creating chart's data
    const transactions1 = [];
    const transactions2 = [];
    const transactions3 = [];
    const transactions4 = [];

    console.log(transactions)

    transactions.forEach(transaction => {
        if(transaction.type == 1){
            transactions1.push(transaction)
        }
        if(transaction.type == 2){
            transactions2.push(transaction)
        }
        if(transaction.type == 3){
            transactions3.push(transaction)
        }
        if(transaction.type == 4){
            transactions4.push(transaction)
        }
    });

    const transactions1Length = transactions1.length;
    const transactions2Length = transactions2.length;
    const transactions3Length = transactions3.length;
    const transactions4Length = transactions4.length;
 
    
    const transactionTypesValues = Object.values(transactionTypes);
    console.log(transactionTypesValues)

    const transactionTypesValuesArray = transactionTypesValues.map(value=>{
        return value
    })

    //chart data
    const data = {
        labels: transactionTypesValuesArray,
        datasets: [{
            labels: [
                transactionTypesValuesArray,  
            ],  
            data: [transactions1Length,transactions2Length,transactions3Length,transactions4Length],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(124,252,0)',
            ],
            hoverOffset: 4
        }]
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: data,
    });


    //bar chart
    const ctx2 = document.getElementById('myChart2');

    //dates

    const transactionsDates = transactions.map(transaction=>{
        return transaction.date
    });

    const transactionsDatesSet = new Set(transactionsDates);

    const transactionsDatesArray = Array.from(transactionsDatesSet)

    //balance

    let balanceArray = [];


             balanceArray = transactions.map((transaction,i)=>{
                if(transaction.date)
                
             })
            
        

    console.log(balanceArray)

    const data2 = {
        labels: transactionsDatesArray,
        datasets: [{
            labels: transactionsDatesArray,
            data: [65, 59, 80],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 45, 0.2)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 46, 86)',
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