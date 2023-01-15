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

let transactions_charts_wrapper_wrapper;
let transactions_transactionsList;
let transactions_inputSearch;
let transactions_select;

let oneRowClicked = false;
let allOthersRows = [];

// https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d
let touchstartX = 0;
let touchendX = 0;

const handleSwipe = () =>{
    const doughnutChart = document.querySelector(".doughnut-chart");
    const barChart = document.querySelector(".bar-chart");

    // https://stackoverflow.com/questions/39679753/javascript-document-getelementbyidel-style-display-returns-empty-string-but
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
    const barChartStyles = window.getComputedStyle(barChart);
    const barChartDisplay = barChartStyles.getPropertyValue('display')

    if(barChartDisplay === "flex"){
        barChart.style.display = "none"
        doughnutChart.style.display = "flex"
    }else{
        barChart.style.display = "flex"
        doughnutChart.style.display = "none"
    
    }
};


//Helper functions for swipe event
const handleGesture = () => {
    if (touchendX < touchstartX) {
        handleSwipe();
    }
    
    if (touchendX > touchstartX) {
        handleSwipe();
    }
};

const handleOnTouchStart = (e) => {
    if(screen.width < 769){
        touchstartX = e.changedTouches[0].screenX;
    }
};

const handleOnTouchEnd = (e) => {
    if(screen.width < 769){
        touchendX = e.changedTouches[0].screenX;
        handleGesture();
    }
};

//function that returns grouped transactions by date and transfer is to array of entries - for chart data and render transactions when searching 
const getGroupedByDate = (transactions) => {
      //this will always be dynamic bcs it depends of transactions_transactions.map
      const groupByDate = transactions.reduce((group, product) => {
        const { date } = product;
        group[date] = group[date] ?? [];
        group[date].push(product);
        return group;
    }, {});

    const groupByDateEntries = Object.entries(groupByDate);

    return groupByDateEntries;
};

const logoutUser = (e) => {
    e.preventDefault();
    console.log("logout correct");
    sessionStorage.removeItem("currentUser");
    transactions_loggedIn = sessionStorage.getItem("currentUser");

    if (!transactions_loggedIn) {
        transactions_logoutBtn.style.visibility = "hidden";
        transactions_toLoginBtn.style.visibility = "visible";
        transactions_toRegistrationBtn.style.visibility = "visible";

        transactions_toRegistrationBtn.style.order = "0";
        transactions_toLoginBtn.style.order = "0";
    };

    const transactions_usernameDiv = document.querySelector(".username-div");

    transactions_logoutWrapper.removeChild(transactions_usernameDiv);

    window.location.hash = '/';
};

const beforeTransactionsRender = async () => {
    console.log('Before render transactions');
    transactions_response = await transactionsGetData('https://api.npoint.io/38edf0c5f3eb9ac768bd', {});

    const isCurrentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    if(isCurrentUser){
        const  transactions_logoutWrapper = document.querySelector(".logout-wrapper");
        const usernameDiv = document.createElement("div");
        const innerText = `<h4>${isCurrentUser.username}</h4>`
        usernameDiv.insertAdjacentHTML("afterbegin", innerText)
        usernameDiv.classList.add("username-div");
        transactions_logoutWrapper.insertAdjacentElement("beforeend", usernameDiv);
    }

    //mistake in object's name in database, typo in name - "transacationTypes"
    transactions_transactions = transactions_response.transactions;
    transactions_transactionTypes = transactions_response.transacationTypes;
    transactionsStore.transactions = transactions_response.transactions;
    const result = { transactions_transactions: transactions_response.transactions };

    return result;
};

Object.prototype.patronage.setGlobalKey('page_before_transactions_render', beforeTransactionsRender);

// helper function that returns an id for transactions row
const makeId = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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

//get transaction's row with details for expanded row in mobile view
const getTransactionWithDetails = (transaction, transactionType, icon) => {
    return (`
        <div class="transaction-details-mobile box">
            <div class="transaction-data" id="date_div_details">
            <p class="transaction-text" id="date">${transaction.date}<p>
            </div>
            <div class="transaction-data">
                <p class="icon-wrapper transaction-text">${icon}</p>
            </div>
            <div class="transaction-data">
                <div class="description_type" id="descriptionType_div">
                    <p class="transaction-text" id="description">${transaction.description}</p>
                    <p class = "transaction-text" id="type_details">${transactionType}</p>
                </div>
            </div>
            <div class="transaction-data" id="amount_div">
                <p class ="transaction-text">${transaction.amount} </p>
            </div>
            <div class="transaction-data" id="balance_div_details">
                <p class = "transaction-text">${transaction.balance}</p>
            </div>
        </div>
    `);
};

//inside getTratsaction function:
//Creating array full of smaller arrays with key - number type of transaction, and value - name of transaction - by Object.entries
//finding in parent array a "child array" which index 0 (key:number) the same as transaction.type (passed by "transaction" parameter);
//because in array transactions i have only number that describes a type of transaction;
//extract from this child array index [1] which is a value - name of transaction;

const getTransaction = (transaction) => {
    const transactionTypesArray = Object.entries(transactions_transactionTypes);
    const transactionType = transactionTypesArray.find(keyType => keyType[0] == transaction.type)[1];
    const icon = getIcon(transactionType);
    const id = makeId(5);

    return (`
        <div class="transaction item" id=${id}>
            <div class ="visible-row title">
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
            </div>
            ${getTransactionWithDetails(transaction, transactionType, icon)}
        </div>
    `)
};


//this will generate transactions with labels (dates are labels, they grouped by dates)...
//...in transactions list when rendering page for the first time
// and also when searching transactions by description or type in handleSearch
//if passed transactions are undefinded or empty, return initial transactions 
//if passed transactions exists (it means that it was called with filtered transactions in handleSearch)...
//...return these filtered transactions and render them (it creates html with transaction data)   
const getTransactionsWithLabels = (transactions) => {
    let groupByDateEntries;
    if (typeof transactions === "undefined" || transactions.length === 0) {
        groupByDateEntries = getGroupedByDate(transactions_transactions);
    } else {
        groupByDateEntries = getGroupedByDate(transactions);
    }
    
    const transactionsWithLabels = groupByDateEntries.map(element => {
        const transactions = element[1].map(transaction => getTransaction(transaction)).join('');
        return `<div class="transaction-label"><p>${element[0]}</p></div>` + `${transactions}`;
    }).join('');

    return transactionsWithLabels;
};

//helper functions for handleSearch - creating select tag with proper option's names - option value is a number of type...
//... option name is name of transaction's type
// creating input tag in searchInput
const getSelectType = () => {
    const transactionTypesArray = Object.entries(transactions_transactionTypes);
    return(`
        <select class="select">
            <option value="0" selected="selected">Wszystkie</option>
            ${transactionTypesArray.map(transaction=>{
                const selectValue = transaction[0];
                const description = transaction[1];
                return `<option value=${selectValue}>${description}</option>`
            })}
        </select>
    `)
};

const getSearchInput = () =>{
    return(`
        <input class= "input-search" placeholder="Opis transakcji"></input>    
    `)
};

//1.if input value is empty and selected type from select is 0, return all transactions
//2. if input value is NOT empty and selected type from select is 0, return transactions filtered by search input
//3. if input value is empty and selected value is diffrent from 0, return transactions filtered by selected value from select
//4. else - if input value is NOT empty and selected type is diffrent from 0, return filtered transactions by search input AND selected value from select

const handleSearch = () => {
    const searchInputValue = transactions_inputSearch.value.toLowerCase();
    const selectedTypeValue = parseInt(transactions_select.value, 10);
    const allTransactions = transactions_transactions;

    if ((searchInputValue === '' || typeof searchInputValue === "undefined") && selectedTypeValue === 0) {
        transactions_transactionsList.innerHTML = getTransactionsWithLabels(allTransactions);
    } else if(searchInputValue !== '' && selectedTypeValue === 0) {
        const filteredTransactions = allTransactions.filter(transaction => transaction.description.toLowerCase().includes(searchInputValue));
        transactions_transactionsList.innerHTML = getTransactionsWithLabels(filteredTransactions);
    } else if (searchInputValue === '' && selectedTypeValue !== 0) {
        const filteredTransactions = allTransactions.filter(transaction => transaction.type === selectedTypeValue);
        transactions_transactionsList.innerHTML = getTransactionsWithLabels(filteredTransactions);
    } else {
        const filteredTransactions = allTransactions.filter(transaction => transaction.type === selectedTypeValue && transaction.description.toLowerCase().includes(searchInputValue));
        transactions_transactionsList.innerHTML = getTransactionsWithLabels(filteredTransactions);
    }  
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
        <div class = "search-wrapper">
            ${getSearchInput()}
            ${getSelectType()}
        </div>
        <div class ="transactions-list-wrapper">
            <div class="transactions-list accordion">
                ${getTransactionsWithLabels()}
            </div>
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
    transactions_transactionRows = document.querySelectorAll(".transaction-mobile-row");
    transactions_charts_wrapper_wrapper = document.querySelector(".charts-wrapper-wrapper");
    transactions_transactionsList = document.querySelector(".transactions-list");
    transactions_inputSearch = document.querySelector(".input-search");
    transactions_select = document.querySelector(".select");

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

   
    //chart data
    const data = {
        labels: transactionTypesValues,
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
            maintainAspectRatio: false,
            plugins: {
                legend: { position: "top", align: "start" },
            },
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

    const groupByDateEntries = getGroupedByDate(transactions_transactions);

    let amount;
    const initialValue = 0;

    const balanceArray = groupByDateEntries.map(value => {
        amount = value[1].reduce((acc, transaction) => acc + transaction.amount, initialValue)
        return amount
    });

  
    const barsColorsArray = balanceArray.map(balance => {
        if (balance < 0) {
            return 'rgba(255, 99, 132, 0.2)'
        };

        if (balance > 0) {
            return 'rgba(137, 166, 55, 0.2)'
        };
    });

    const bordersColorsArray = balanceArray.map(balance => {
        if (balance < 0) {
            return 'rgb(255, 99, 132)'
        }

        if (balance > 0) {
            return 'rgb(137,166,55)'
        }

    });

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
            maintainAspectRatio: false,
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
            }
        },
    });

    //for mobile view, expanding transaction's row 

    let titles = document.querySelectorAll('.title');
    for(i = 0; i < titles.length; i++){
        titles[i].onclick = function(){
            this.classList.toggle('active');
            let box = this.nextElementSibling;

            if(box.style.maxHeight){
                box.style.maxHeight = null;
            } else {
                box.style.maxHeight = box.scrollHeight + 500 +'px'
            };

            for(j = 0; j < titles.length; j++){
                if(titles[j] !== this ){
                    titles[j].classList.remove('active');
                    titles[j].nextElementSibling.style.maxHeight = null;
                };
            };
        };
    };

    //for mobile view, assing handleSwipe function
    transactions_charts_wrapper_wrapper.ontouchstart = handleOnTouchStart;
    transactions_charts_wrapper_wrapper.ontouchend = handleOnTouchEnd;

    transactions_inputSearch.onkeyup = handleSearch;
    transactions_select.onchange = handleSearch;

    transactions_logoutBtn.onclick = logoutUser;
};

Object.prototype.patronage.setGlobalKey('page_transactions_init', initTransactions);

const cleanupTransactions = () => {
    console.log('cleanupLogin');
    transactions_logoutBtn = document.querySelector('.logoutLink');
    transactions_logoutBtn.removeEventListener('click', logoutUser);
};
Object.prototype.patronage.setGlobalKey('page_transactions_cleanup', cleanupTransactions);
