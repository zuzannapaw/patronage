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
    <div class = "charts-wrapper-wrapper">
        <div class = "charts-wrapper">
            <div class="doughnut-chart">
                <canvas id="myChart"></canvas>
            </div>
            <div class="bar-chart">
                <canvas id="myChart2"></canvas>
            </div>
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

    const transactionTypesValuesArray = transactionTypesValues.map(value=>{
        return value
    })

    //chart data
    const data = {
        labels: transactionTypesValuesArray,
        datasets: [{
            labels: [],  
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

    //this will always be dynamic bcs it depends of transactions.map
    const transactionsDatesSet = new Set(transactionsDates);

    const transactionsDatesArray = Array.from(transactionsDatesSet)

    //balance
    // przedzie po wszystkch moich transaction i ma je odpowiednio przydzielic do tablic// 
    //czy moze stworzyc tablice z obiektami w której key obiektu to beda daty a value to tablice z transactions 
   
    // const groupByDate = transactions.groupBy(transaction => {
    //     return transaction.date;
    //   });

    const groupByDate= transactions.reduce((group, product) => {
        const { date } = product;
        group[date] = group[date] ?? [];
        group[date].push(product);
        return group;
      }, {});
      console.log(groupByDate);

      let amount;
      const initialValue = 0;


    //   const groupdByDateKeys = Object.keys(groupByDate);
    //   const groupdByDateValues = Object.values(groupByDate);

    const groupByDateEntries =  Object.entries(groupByDate);

    console.log(groupByDateEntries)

      const balanceArray = groupByDateEntries.map(value=> {
        amount = value[1].reduce((acc,transaction) => acc + transaction.amount, initialValue)
        return amount
      })

      console.log(balanceArray)



    const data2 = {
        labels: transactionsDatesArray,
        datasets: [{
            label: "Saldo",
            data: balanceArray,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 205, 86, 0.2)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
            ],
            borderWidth: 1
          }],
    };

    new Chart(ctx2, {
        type: 'bar',
        data: data2,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins:{
            legend: { display: false },
            title: {display:true,
            text:"Saldo względem dat transakcji"},
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