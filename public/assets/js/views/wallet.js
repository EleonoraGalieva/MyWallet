import authorization from '../database/authorization.js'
import Transaction from '../database/models/transaction.js'
import Category from '../database/models/category.js'
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
                <ul id="transactionsList"></ul>
            </main>
            <article class="modal" id="addTransaction">
                <div class="modal__transaction__content">
                    <div class="overflow__container">
                        <div class="overflow__container__header">
                            <h1 class="overflow__container__heading" id="heading">ADD NEW TRANSACTION</h1>
                            <span id="closeTransactionOwerflow"><svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.353553" y1="0.646447" x2="46.3536" y2="46.6464" stroke="black" stroke-opacity="0.48"/>
                        <path d="M46.5 0.5L0.5 46.5" stroke="black" stroke-opacity="0.48"/>
                        </svg></span>
                        </div>
                    </div>
                    <div class="transaction__parts">
                        <div class="part__one">
                            <div class="switch__container">
                                <button id="income" class="selected__switch left__switch">Income</button>
                                <button id="outcome" class="unselected__switch right__switch">Outcome</button>
                            </div>
                            <div name="transaction" class="form" id="partOne">                            
                                <div class="flex">
                                    <div>
                                        <label for="amount">Amount:</label><br>
                                        <input type="number" min="1" id="amount" name="transaction" class="input" required>
                                    </div>
                                    <div>
                                        <label for="currency">Currency:</label><br>
                                        <select id="currency" name="transaction" class="input">
                                            <option value="dollars">USD</option>
                                            <option value="euro">EUR</option>
                                            <option value="byRubles">BYN</option>
                                            <option value="ruRubles">RUB</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="part__three">
                                <div name="transaction" class="form" id="partThree">
                                    <label for="category">Category:</label><br>
                                    <select id="category" name="transaction" class="input">                                                                                 
                                    </select><br>
                                    <label for="date">Date:</label><br>
                                    <input type="date" id="date" name="transaction" class="input" required><br>
                                    <input type="submit" value="Add transaction" class="add__transaction__button" id="submitTransaction">
                                </div>
                            </div>
                        </div>
                        <div class="part__two">
                            <div name="transaction" class="form" id="partTwo">
                                <label for="receiver">Receiver:</label><br>
                                <input type="text" id="receiver" name="transaction" class="input" required><br>
                                <label for="comment">Comment:</label><br>
                                <input type="text" id="comment" name="transaction" class="input"><br>
                                <label for="place">Place:</label><br>
                                <input type="text" id="place" name="transaction" class="input"><br>
                                <label for="image">Image:</label><br>
                                <input type="file" id="image" name="transaction"><br>
                            </div>
                        </div>
                    </div>
                </div>
            </article>`
        return view;
    },
    after_render: async() => {
        loadCategories();
        loadTransactions();
        let type = 'income';
        let mode = 'add';
        let selectCategories = document.getElementById('category');
        let transactionList, currentTransaction, categoriesList;
        // Logout
        document.getElementById('logOut').addEventListener('click', () => {
            authorization.logOut();
        });
        // Setting username
        document.getElementById('username').textContent = localStorage.getItem('currentUserEmail');
        // Making addTransactions element modal
        let modalTransaction = document.getElementById('addTransaction');
        let addTransactionBtn = document.getElementById('addTransactionBtn');
        let closeTransactionOwerflow = document.getElementById('closeTransactionOwerflow');

        addTransactionBtn.onclick = function() {
            mode = 'add';
            document.getElementById('heading').textContent = 'ADD NEW TRANSACTION';
            document.getElementById('submitTransaction').value = 'Add transaction';
            modalTransaction.style.display = 'block';
        }

        closeTransactionOwerflow.onclick = function() {
            modalTransaction.style.display = 'none';
        }

        window.onclick = function(event) {
                if (event.target == modalTransaction) {
                    modalTransaction.style.display = 'none';
                }
            }
            // Adding transaction
        document.getElementById('income').addEventListener('click', () => {
            document.getElementById('income').className = 'selected__switch left__switch';
            document.getElementById('outcome').className = 'unselected__switch right__switch';
            type = 'income';
        });

        document.getElementById('outcome').addEventListener('click', () => {
            document.getElementById('income').className = 'unselected__switch left__switch';
            document.getElementById('outcome').className = 'selected__switch right__switch';
            type = 'outcome';
        });

        function loadCategories() {
            Category.readCategories().then((res) => {
                categoriesList = res;
                for (let i = 0; i < categoriesList.length; i++) {
                    let optionCategory = document.createElement('option');
                    optionCategory.value = categoriesList[i].name;
                    optionCategory.innerHTML = categoriesList[i].name;
                    selectCategories.appendChild(optionCategory);
                }
            });
        }

        document.getElementById('submitTransaction').addEventListener('click', () => {
            if (mode == 'add') {
                let amount = document.getElementById('amount').value;
                let date = document.getElementById('date').value;
                let place = document.getElementById('place').value;
                let category = document.getElementById('category').value;
                let comment = document.getElementById('comment').value;
                let image = document.getElementById('image').value;
                let receiver = document.getElementById('receiver').value;
                let currency = document.getElementById('currency').value;
                Transaction.addTransaction(new Transaction(type, amount, currency, date, place, category, comment, image, receiver));
            } else {
                currentTransaction.amount = document.getElementById('amount').value;
                currentTransaction.date = document.getElementById('date').value;
                currentTransaction.place = document.getElementById('place').value;
                currentTransaction.category = document.getElementById('category').value;
                currentTransaction.comment = document.getElementById('comment').value;
                if (document.getElementById('image').value != null) {
                    currentTransaction.image = document.getElementById('image').value;
                }
                currentTransaction.receiver = document.getElementById('receiver').value;
                currentTransaction.currency = document.getElementById('currency').value;
                Transaction.updateTransaction(currentTransaction);
            }
            modalTransaction.style.display = "none";
            loadTransactions();
        });

        //Loading all transactions
        function loadTransactions() {
            Transaction.readTransactions().then(res => {
                let ul = document.getElementById('transactionsList');
                if (ul !== null) {
                    ul.innerHTML = '';
                }
                transactionList = res;
                for (let i = 0; i < transactionList.length; i++) {
                    let sign, colour, currency;
                    if (transactionList[i].type === 'outcome') {
                        sign = '-';
                        colour = 'outcome';
                    } else {
                        sign = '+';
                        colour = 'income';
                    }
                    switch (transactionList[i].currency) {
                        case 'euro':
                            currency = '€';
                            break;
                        case 'dollars':
                            currency = '$';
                            break;
                        case 'byRubles':
                            currency = 'Br';
                            break;
                        case 'ruRubles':
                            currency = '₽';
                            break;
                    }
                    let li = document.createElement('li');
                    let index = categoriesList.findIndex(item => item.name === transactionList[i].category)
                    Category.getIconURL(categoriesList[index].icon)
                        .then((urlRes) => {
                            li.innerHTML = `<p id="trDate">` + transactionList[i].date + `</p>
                        <section class="transaction">
                            <input type="checkbox" name="choose_all" class="checkbox">
                            <div class="transaction__category">
                                <img src="` + urlRes + `" class="img__category">
                                <p id="trCategory">` + transactionList[i].category + `</p>
                            </div>
                            <div class="transaction__info">
                                <p id="trReceiver">` + transactionList[i].receiver + `</p>
                                <p id="trComment">` + transactionList[i].comment + `</p>
                            </div>
                            <div class="price ` + colour + `">
                                <p id="trPrice">` + sign + transactionList[i].amount + currency + `</p>
                            </div>
                            <div class="transaction__dropdown">
                                <button>
                            <svg width="10" height="35" viewBox="0 0 10 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="5" cy="5" r="5" fill="#C4C4C4"/>
                            <circle cx="5" cy="30" r="5" fill="#C4C4C4"/>
                            <path d="M10 17.5C10 20.2614 7.76144 22.5 5.00002 22.5C2.23859 22.5 1.65087e-05 20.2614 1.65087e-05 17.5C1.65087e-05 14.7386 2.23859 12.5 5.00002 12.5C7.76144 12.5 10 14.7386 10 17.5Z" fill="#C4C4C4"/>
                            </svg></button>
                                <div class="transaction__dropdown__content">
                                    <a name="editTransactionBtn">Edit</a>
                                    <a name="deleteTransactionBtn">Delete</a>
                                </div>
                            </div>
                        </section>`
                        });
                    ul.prepend(li);
                }
                let transactionsLiEdit = document.getElementsByName('editTransactionBtn');
                for (let i = 0; i < transactionsLiEdit.length; i++) {
                    transactionsLiEdit[i].addEventListener('click', function(e) {
                        mode = 'edit';
                        document.getElementById('heading').textContent = 'EDIT TRANSACTION';
                        document.getElementById('submitTransaction').value = 'Edit transaction';
                        modalTransaction.style.display = 'block';
                        let selectesLi = e.target.closest('li');
                        let selectedIndex = Array.from(ul.children).indexOf(selectesLi);
                        currentTransaction = transactionList[transactionList.length - selectedIndex - 1];
                        if (currentTransaction.type === 'income') {
                            document.getElementById('income').className = 'selected__switch left__switch';
                            document.getElementById('outcome').className = 'unselected__switch right__switch';
                            type = 'income';
                        } else {
                            document.getElementById('income').className = 'unselected__switch left__switch';
                            document.getElementById('outcome').className = 'selected__switch right__switch';
                            type = 'outcome';
                        }
                        document.getElementById('comment').value = currentTransaction.comment;
                        document.getElementById('amount').value = currentTransaction.amount;
                        document.getElementById('date').value = currentTransaction.date;
                        document.getElementById('place').value = currentTransaction.place;
                        document.getElementById('category').value = currentTransaction.category;
                        document.getElementById('image').value = currentTransaction.image;
                        document.getElementById('receiver').value = currentTransaction.receiver;
                        document.getElementById('currency').value = currentTransaction.currency;
                    });
                }
                let transactionsLiDelete = document.getElementsByName('deleteTransactionBtn');
                for (let i = 0; i < transactionsLiDelete.length; i++) {
                    transactionsLiDelete[i].addEventListener('click', function(e) {
                        let selectedLi = e.target.closest('li');
                        let selectedIndex = Array.from(ul.children).indexOf(selectedLi);
                        currentTransaction = transactionList[transactionList.length - selectedIndex - 1];
                        Transaction.deleteTransaction(currentTransaction);
                        selectedLi.parentNode.removeChild(selectedLi);
                    });
                }
            }).catch(err => {
                console.error(err);
            });
        }
    }
}

export default wallet