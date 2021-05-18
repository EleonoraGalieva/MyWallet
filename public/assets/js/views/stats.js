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
                                        <button class="add__button">+ Transaction</button>
                                        <div class="user__dropdown">
                                            <button class="username">
                                                username
                                                <i class="fas fa-caret-down"></i>
                                            </button>
                                            <div class="user__dropdown__content">
                                                <a href="#">Logout</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </header>


                        <main class="statistics__container">
                            <section class="stats">
                                <form class="form">
                                    <label for="from">From: </label>
                                    <label for="to">To:</label>
                                    <input type="date" class="input" id="from">
                                    <input type="date" class="input" id="to">
                                </form>
                                <p>
                                    Total spendings: 50$
                                </p>
                                <p>
                                    Total income: 50$
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
                        </main>
                        <script src="/js/theme-change.js"></script>
                        <script src="https://kit.fontawesome.com/9a4d92866a.js" crossorigin="anonymous"></script>
                        <script src="https://www.google.com/jsapi"></script>
                        <script>
                            google.load("visualization", "1", {
                                packages: ["corechart"]
                            });
                            google.setOnLoadCallback(drawChart);

                            function drawChart() {
                                var data = google.visualization.arrayToDataTable([
                                    ['Category', 'Income', 'Spendings'],
                                    ['Food', 0, 70],
                                    ['Fun', 2, 100],
                                    ['Groceries', 100, 1000],
                                    ['Home', 0, 300],
                                    ['Salary', 4000, 0],
                                    ['Shopping', 0, 300],
                                    ['Transport', 0, 300],
                                    ['Travel', 0, 300]
                                ]);
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
                            }
                        </script>`
        return view;
    },
    after_render: async() => {}
}

export default stats