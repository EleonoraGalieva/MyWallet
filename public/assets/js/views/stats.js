import authorization from '../database/authorization.js'
import Transaction from '../database/models/transaction.js'
import Category from '../database/models/category.js'
let stats = {
    render: async() => {
        let view = /*html*/ `<header class="header">
                                <div class="container">
                                    <div class="header__logo">
                                        <img src="assets/img/wallet_icon.png" class="header__image">
                                        <a id="logoName">MyWallet</a>
                                    </div>
                                    <div class="dropdown">
                                        <button id="dropdownBtn"><img class="dropdown__button" src="img/menu_icon_phone.png"></button>
                                        <nav class="nav" id="nav">
                                            <a href="/#/wallet">Transactions</a>
                                            <a href="/#/categories">Categories</a>
                                            <a href="/#/stats">Statistics</a>
                                        </nav>
                                    </div>
                                    <div class="user__box">
                                        <div class="user__dropdown">
                                        <button class="username">
                                            <div  id="username">user</div>
                                            <i class="fas fa-caret-down"></i>
                                        </button>
                                        <div class="user__dropdown__content">
                                            <a id="logOut">Logout</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                        </header>


                        <main class="statistics__container">
                            <section class="stats">
                                <div class="form">
                                    <label for="from">From: </label>
                                    <label for="to">To:</label>
                                    <input type="date" class="input" id="from">
                                    <input type="date" class="input" id="to">
                                    <input class="input__button" id="find" type="submit" value="Find">
                                </div>
                                <p>
                                    Total spendings: <span id="totalSpendings"></span>
                                </p>
                                <p>
                                    Total income: <span id="totalIncome"></span>
                                </p>
                                <br>
                                <article id="diagram" style="min-width: 600px; margin-right: 20px"></article>
                            </section>
                            <aside class="aside">
                                <div class="aside__container">
                                    Check out our blog posts on smart spending:<br>
                                    <ol>
                                        <li><a href="https://www.everydollar.com/blog/create-better-spending-habits">How to Create Better Spending Habits</a></li>
                                        <li><a href="https://searcyfinancial.com/blog-posts/81-financial-planning/53-6-habits-for-smart-money-management">6 Habits for Smart Money Management</a></li>
                                    </ol>
                                </div>
                            </aside>
                        </main>`
        return view;
    },
    after_render: async() => {
        const spendingsSpan = document.getElementById('totalSpendings');
        const incomeSpan = document.getElementById('totalIncome');
        const fromDateInput = document.getElementById('from');
        const toDateInput = document.getElementById('to');
        let fromDate = null;
        let toDate = null;

        // Logout
        document.getElementById('logOut').addEventListener('click', () => {
            authorization.logOut();
        });
        document.getElementById('username').textContent = localStorage.getItem('currentUserEmail');

        document.getElementById('find').addEventListener('click', () => {
            fromDate = fromDateInput.value;
            toDate = toDateInput.value;
            dataTableArray = [];
            setTotals();
        });

        let categoriesList;
        let dataTableArray = [];

        setTotals();

        function setTotals() {
            Transaction.getTotalSpendingsAndIcome(fromDate, toDate).then((res) => {
                console.log(res);
                spendingsSpan.innerHTML = `${res[0]} $`;
                incomeSpan.innerHTML = `${res[1]} $`;
            });

            setDataTableArray().then((res) => {
                google.load("visualization", "1", {
                    packages: ["corechart"]
                });
                google.setOnLoadCallback(function drawChart() {
                    var data = google.visualization.arrayToDataTable(res);
                    var options = {
                        title: 'Income & Spendings per categories:',
                        hAxis: {
                            title: 'Category'
                        },
                        vAxis: {
                            title: 'Dollars'
                        }
                    };
                    var chart = new google.visualization.ColumnChart(document.getElementById('diagram'));
                    chart.draw(data, options);
                });
            })
        }

        function setDataTableArray() {
            return new Promise((resolve, reject) => {
                Category.readCategories().then((res) => {
                    categoriesList = res;
                    dataTableArray.push(['Category', 'Income', 'Spendings']);
                    let promisesArray = [];
                    for (let i = 0; i < categoriesList.length; i++) {
                        promisesArray.push(Transaction.getTotalSpendingsAndIncomePerCategory(categoriesList[i].name, fromDate, toDate));
                    }
                    Promise.all(promisesArray).then((values) => {
                        for (let i = 0; i < values.length; i++) {
                            dataTableArray.push(values[i]);
                        }
                        resolve(dataTableArray);
                    });
                });
            });
        }
    }
}

export default stats