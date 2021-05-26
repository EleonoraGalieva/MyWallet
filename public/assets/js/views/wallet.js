import authorization from '../database/authorization.js'
let wallet = {
    render: async() => {
        let view = /*html*/
            `<header class="header">
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
                        <button class="add__button" id="addTransactionBtn">+ Transaction</button>
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
            <main class="transactions__container">
                <div class="transaction">
                    <input type="checkbox" name="choose_all" class="checkbox">
                    <label for="choose_all">Choose all...</label>
                </div>
                <ul>
                    <li>
                        <p>02.02.21</p>
                        <section class="transaction">
                            <input type="checkbox" name="choose_all" class="checkbox">
                            <div class="transaction__category">
                                <img src="assets/img/food_category.png" class="img__category">
                                <p>Food</p>
                            </div>
                            <div class="transaction__info">
                                <p>McDonalds</p>
                                <p>Not again...</p>
                            </div>
                            <div class="price">
                                <p>-12$</p>
                            </div>
                            <div class="transaction__dropdown">
                                <button>
                    <svg width="10" height="35" viewBox="0 0 10 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="5" cy="5" r="5" fill="#C4C4C4"/>
                            <circle cx="5" cy="30" r="5" fill="#C4C4C4"/>
                            <path d="M10 17.5C10 20.2614 7.76144 22.5 5.00002 22.5C2.23859 22.5 1.65087e-05 20.2614 1.65087e-05 17.5C1.65087e-05 14.7386 2.23859 12.5 5.00002 12.5C7.76144 12.5 10 14.7386 10 17.5Z" fill="#C4C4C4"/>
                            </svg></button>
                                <div class="transaction__dropdown__content">
                                    <a href="#">Edit</a>
                                    <a href="#">Delete</a>
                                </div>
                            </div>
                        </section>
                    </li>
                </ul>
            </main>
            <article class="modal" id="addTransaction">
                <div class="modal__transaction__content">
                    <div class="overflow__container">
                        <div class="overflow__container__header">
                            <h1 class="overflow__container__heading">ADD NEW TRANSACTION</h1>
                            <span id="closeTransactionOwerflow"><svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.353553" y1="0.646447" x2="46.3536" y2="46.6464" stroke="black" stroke-opacity="0.48"/>
                        <path d="M46.5 0.5L0.5 46.5" stroke="black" stroke-opacity="0.48"/>
                        </svg></span>
                        </div>
                    </div>
                    <div class="transaction__parts">
                        <div class="part__one">
                            <div class="switch__container">
                                <button id="income" class="selected__switch">Income</button>
                                <button id="outcome" class="unselected__switch">Outcome</button>
                            </div>
                            <form method="POST" name="transaction" class="form" id="partOne">
                                <label for="wallet">Wallet:</label><br>
                                <input type="text" id="wallet" name="transaction" class="input" required><br>
                                <div class="flex">
                                    <div>
                                        <label for="amount">Amount:</label><br>
                                        <input type="number" id="amount" name="transaction" class="input" required>
                                    </div>
                                    <div>
                                        <label for="currency">Currency:</label><br>
                                        <input type="text" id="currency" name="transaction" class="input" required>
                                    </div>
                                </div>
                            </form>
                            <div class="part__three">
                                <form method="POST" name="transaction" class="form" id="partThree">
                                    <label for="category">Category:</label><br>
                                    <input type="text" id="category" name="transaction" class="input" required><br>
                                    <label for="date">Date:</label><br>
                                    <input type="date" id="date" name="transaction" class="input" required><br>
                                    <input type="submit" value="Add transaction" class="add__transaction__button">
                                </form>
                            </div>
                        </div>
                        <div class="part__two">
                            <form method="POST" name="transaction" class="form" id="partTwo">
                                <label for="receiver">Receiver:</label><br>
                                <input type="text" id="receiver" name="transaction" class="input" required><br>
                                <label for="comment">Comment:</label><br>
                                <input type="text" id="comment" name="transaction" class="input"><br>
                                <label for="place">Place:</label><br>
                                <input type="text" id="place" name="transaction" class="input"><br>
                                <label for="image">Image:</label><br>
                                <input type="file" id="image" name="transaction"><br>
                            </form>
                        </div>
                    </div>
                </div>
            </article>
            <script src="/js/transactions.js"></script>
            <script src="/js/theme-change.js"></script>`
        return view;
    },
    after_render: async() => {
        document.getElementById('logOut').addEventListener('click', () => {
            authorization.logOut();
        });
        document.getElementById('username').textContent = localStorage.getItem('currentUserEmail');
    }
}

export default wallet