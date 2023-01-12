const transactionsGetData = Object.prototype.patronage.getGlobalKey('api_getData');
const transactionsStore = Object.prototype.patronage.getGlobalKey('store');

let transactions_response;
let transactions_transactions;
let transactions_transactionTypes;
let transactions_currentTransactionType;
let transactions_toRegistrationBtn;
let transactions_toLoginBtn;
let transactions_logoutBtn;
let transactions_loggedIn;

let transactions_logoutWrapper;
let transactions_usernameDiv;

let transactions_transactionRows;
let transactions_transactionRowsMobile;

let oneRowClicked = false;
let allOthersRows = [];

const expandRow = (e) => {

    oneRowClicked = !oneRowClicked;
    let e_target = e.target;

    if(oneRowClicked){
        allOthersRows = []
    }

    console.log("clicked!")
   
    //preventing e.target to be the child of row
    e.stopPropagation();
    transactions_transactionRowsMobile = document.querySelectorAll(".transaction-expanded-on-mobile")

    //if e.target is div inside li
    if(e_target.classList.contains("transaction-data")){
        e_target = e_target.parentElement;
        console.log(e_target);
        console.log(" i'm div and above me is my 1st parent element");
    }else{
        //and if not, maintain your e.target,because its li element
        e_target = e.target
    };

       //if e.target is p inside div
    if(e_target.classList.contains("transaction-text")){
        // e_target = e.target.parentElement of that parent Element
        const e_target_p_parent = e_target.parentElement;
        e_target = e_target_p_parent.parentElement;
        console.log(e_target);
        console.log(" i'm p and above me is my 2nd parent element");
    }else{
        //and if not, maintain your e.target,because its li element
        e_target = e.target
    };

    //but for fiv transaction-data it does not work. check why

    console.log(e_target)

    //expanding only one row

    transactions_transactionRowsMobile.forEach(row => {
        if (row.id === e_target.id) {
            row.classList.toggle("active");

            const childrenOfElement = row.children
            for (let i = 0; i < childrenOfElement.length; i++) {
                    childrenOfElement[i].style.display = "block";
            }
        };
    });


    if(oneRowClicked){
        transactions_transactionRows.forEach(row => {
            if (e_target.id !== row.id) {
                allOthersRows.push(row)
            }
        });
    };

    if (oneRowClicked) {
        allOthersRows.forEach(row => {
            row.onclick = null;
        })
    }else{
        transactions_transactionRows.forEach(row=>{
            row.onclick = expandRow;
        })
    }

    console.log(allOthersRows)

};

const logoutUser = (e) => {
    e.preventDefault();
    console.log("logout correct");
    sessionStorage.removeItem("currentUser");
    transactions_loggedIn = sessionStorage.getItem("currentUser");

    console.log(transactions_loggedIn)

    //should i do "if" only for possible situation or not to be sure?

    // if(transactions_loggedIn){
    //     logoutLink.style.visibility = "visible";
    //     loginLink.style.visibility = "hidden";
    //     registrationLink.style.visibility = "hidden";
    //  };

    //are these conditions necessary? logoutUser and functions only without check if the user is logged in or not?

    if (!transactions_loggedIn) {
        transactions_logoutBtn.style.visibility = "hidden";
        transactions_toLoginBtn.style.visibility = "visible";
        transactions_toRegistrationBtn.style.visibility = "visible";

        transactions_toRegistrationBtn.style.order = "0";
        transactions_toLoginBtn.style.order = "0";

    };

    transactions_logoutWrapper.removeChild(transactions_usernameDiv);

    window.location.hash = '/';

};

const beforeTransactionsRender = async () => {
    console.log('Before render transactions');

    transactions_response = await transactionsGetData('https://api.npoint.io/38edf0c5f3eb9ac768bd', {});

    //mistake in object's name in database
    transactions_transactions = transactions_response.transactions;
    console.log('API RESPONSE', transactions_transactions, transactions_response)
    transactions_transactionTypes = transactions_response.transacationTypes;
    // transaction = transactions_transactions.find(transaction.type === transactions_transactionTypes.keys )
    console.log(`Transactions types ${transactions_transactionTypes}`);
    transactionsStore.transactions = transactions_response.transactions;
    const result = { transactions_transactions: transactions_response.transactions };

    return result;
}

Object.prototype.patronage.setGlobalKey('page_before_transactions_render', beforeTransactionsRender);

function makeId(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const getTransaction = (transaction) => {
    const transactionTypesArray = Object.entries(transactions_transactionTypes);
    console.log(transactionTypesArray)
    const transactionType = transactionTypesArray.find(keyType => keyType[0] == transaction.type)[1];
    const icon = getIcon(transactionType);
    let id = makeId(5)

    return (`
        <li class="transaction transaction-mobile-row" id=${id}>
            <div class="transaction-data" id="date_div">
                <p class="transaction-text" id="date">${transaction.date}<p>
            </div>
            <div class="transaction-data">
                <p class="icon-wrapper transaction-text">${icon}</p>
            </div>
            <div class="transaction-data">
                <div class="description_type" id="descriptionType_div">
                    <p class="transaction-text" id="description">${transaction.description}</p>
                    <p class = "transaction-text" id="type">${transactionType}</p>
                </div>
            </div>
            <div class="transaction-data" id="amount_div">
                <p class ="transaction-text">${transaction.amount} </p>
            </div>
            <div class="transaction-data" id="balance_div">
                <p class = "transaction-text">${transaction.balance}</p>
            </div>
        </li>
        <li class="transaction transaction-expanded-on-mobile" id=${id}>
            <div class="transaction-data" id="date_div">
                <p class="transaction-text" id="date">${transaction.date}<p>
            </div>
            <div class="transaction-data">
                <p class="icon-wrapper transaction-text">${icon}</p>
            </div>
            <div class="transaction-data">
                <div class="description_type" id="descriptionType_div">
                    <p class="transaction-text" id="description">${transaction.description}</p>
                    <p class="transaction-text" id="type">${transactionType}</p>
                </div>
            </div>
            <div class="transaction-data" id="amount_div">
                <p class="transaction-text">${transaction.amount} </p>
            </div>
            <div class="transaction-data" id="balance_div">
                <p class ="transaction-text">${transaction.balance}</p>
            </div>
        </li>
    `)
};

const getIcon = (transactionType) => {
    switch (transactionType) {
        case "Wpływy - inne":
            return '<i class="fa-solid fa-arrow-up"></i>';
        case "Wydatki - zakupy":
            return '<i class="fa-solid fa-cart-arrow-down"></i>';
        case "Wpływy - wynagrodzenie":
            return '<i class="fa-solid fa-briefcase"></i>';
        case "Wydatki - inne":
            return '<i class="fa-solid fa-arrow-down"></i>';
        default:
            return '<i class="fa-solid fa-circle-question"></i>';

    };
};

const renderTransactions = () => {
    console.log('Transactions render');

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
            <ol class="transactions-list">
                ${transactions_transactions.map(transaction => getTransaction(transaction)).join('')}
            </ol>
        </div>
    `)
};
Object.prototype.patronage.setGlobalKey('page_transactions_render', renderTransactions);

const initTransactions = () => {
    console.log('Transactions init');

    transactions_logoutWrapper = document.querySelector(".logout-wrapper");
    transactions_toRegistrationBtn = document.querySelector(".to-registration-page");
    transactions_toLoginBtn = document.querySelector(".to-login-page");
    transactions_logoutBtn = document.querySelector(".logout-btn");
    transactions_usernameDiv = document.querySelector(".username-div");
    transactions_transactionRows = document.querySelectorAll(".transaction-mobile-row");
    //charts

    //doughnut chart
    const ctx = document.getElementById('myChart');

    //creating chart's data
    const transactions1 = [];
    const transactions2 = [];
    const transactions3 = [];
    const transactions4 = [];

    transactions_transactions.forEach(transaction => {
        if (transaction.type == 1) {
            transactions1.push(transaction)
        }
        if (transaction.type == 2) {
            transactions2.push(transaction)
        }
        if (transaction.type == 3) {
            transactions3.push(transaction)
        }
        if (transaction.type == 4) {
            transactions4.push(transaction)
        }
    });

    const transactions1Length = transactions1.length;
    const transactions2Length = transactions2.length;
    const transactions3Length = transactions3.length;
    const transactions4Length = transactions4.length;


    const transactionTypesValues = Object.values(transactions_transactionTypes);

    const transactionTypesValuesArray = transactionTypesValues.map(value => {
        return value
    })

    //chart data
    const data = {
        labels: transactionTypesValuesArray,
        datasets: [{
            labels: [],
            data: [transactions1Length, transactions2Length, transactions3Length, transactions4Length],
            backgroundColor: [
                '#6D798C',
                '#5CE5F2',
                '#F4B29A',
                '#BF4736',
            ],
            hoverOffset: 4
        }]
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            plugins: {
                legend: { position: "top", align: "start" },
            }
        }
    });


    //bar chart
    const ctx2 = document.getElementById('myChart2');

    //dates

    const transactionsDates = transactions_transactions.map(transaction => {
        return transaction.date
    });

    //this will always be dynamic bcs it depends of transactions_transactions.map
    const transactionsDatesSet = new Set(transactionsDates);

    const transactionsDatesArray = Array.from(transactionsDatesSet)


    const groupByDate = transactions_transactions.reduce((group, product) => {
        const { date } = product;
        group[date] = group[date] ?? [];
        group[date].push(product);
        return group;
    }, {});
    console.log(groupByDate);

    let amount;
    const initialValue = 0;


    const groupByDateEntries = Object.entries(groupByDate);

    const balanceArray = groupByDateEntries.map(value => {
        amount = value[1].reduce((acc, transaction) => acc + transaction.amount, initialValue)
        return amount
    })

    console.log(balanceArray)

    const barsColorsArray = balanceArray.map(balance => {
        if (balance < 0) {
            return 'rgba(255, 99, 132, 0.2)'
        }

        if (balance > 0) {
            return 'rgba(137, 166, 55, 0.2)'
        }
    })

    const bordersColorsArray = balanceArray.map(balance => {
        if (balance < 0) {
            return 'rgb(255, 99, 132)'
        }

        if (balance > 0) {
            return 'rgb(137,166,55)'
        }

    })


    const data2 = {
        labels: transactionsDatesArray,
        datasets: [{
            label: "Saldo",
            data: balanceArray,
            backgroundColor: barsColorsArray,
            borderColor: bordersColorsArray,
            borderWidth: 1
        }],
    };

    new Chart(ctx2, {
        type: 'bar',
        data: data2,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: function (context) {
                            if (context.tick.value === 0) {
                                return '#23395d'
                            } else {
                                return 'rgba(0,0,0,0.1)'
                            }
                        },
                        lineWidth: function (context) {
                            console.log(context)
                            if (context.tick.value === 0) {
                                return 2
                            } else {
                                return 0.5
                            }
                        }
                    },
                    ticks: {
                        callback: function (value) {
                            if (value === 0) {
                                return value + " PLN";
                            } else {
                                return value
                            }
                        }
                    }
                },
            },
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: "Saldo względem dat transakcji"
                },
            },
        },
    });



    //for it to work from desktop to mobile is needs to be reload ,because function only executes once. When user is already on phone since the first using it works
    if (screen.width < 769) {
        transactions_transactionRows.forEach(row => {
            row.onclick = expandRow;
        });
    }


    transactions_logoutBtn.onclick = logoutUser;
};
Object.prototype.patronage.setGlobalKey('page_transactions_init', initTransactions);

const cleanupTransactions = () => {
    console.log('cleanupLogin');
    transactions_logoutBtn = document.querySelector('.logoutLink');
    transactions_logoutBtn.removeEventListener('click', logoutUser);
};
Object.prototype.patronage.setGlobalKey('page_transactions_cleanup', cleanupTransactions);
