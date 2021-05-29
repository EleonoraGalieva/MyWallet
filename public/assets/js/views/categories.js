let categories = {
    render: async() => {
        let view = /*html*/ `
                    <header class="header">
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
                                <button class="add__button" id="addCategoryBtn">+ Category</button>
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

                    <main class="categories">
                        <h1>Categories:</h1>
                        <ul class="categories__list">
                            <li class="category">
                                <p>Food</p>
                                <img class="category__img" src="assets/img/food_category.png" alt="Food category image">
                            </li>
                            <li class="category">
                                <p>Fun</p>
                                <img class="category__img" src="assets/img/fun_category.png" alt="Fun category image">
                            </li>
                            <li class="category">
                                <p>Groceries</p>
                                <img class="category__img" src="assets/img/grocery_category.png" alt="Groceries category image">
                            </li>
                            <li class="category">
                                <p>Home</p>
                                <img class="category__img" src="assets/img/home_category.png" alt="Home category image">
                            </li>
                            <li class="category">
                                <p>Salary</p>
                                <img class="category__img" src="assets/img/salary_category.png" alt="Salary category image">
                            </li>
                            <li class="category">
                                <p>Shop</p>
                                <img class="category__img" src="assets/img/shopping_category.png" alt="Shopping category image">
                            </li>
                            <li class="category">
                                <p>Transport</p>
                                <img class="category__img" src="assets/img/transport_category.png" alt="Transport category image">
                            </li>
                            <li class="category">
                                <p>Travel</p>
                                <img class="category__img" src="assets/img/travel_category.png" alt="Travel category image">
                            </li>
                        </ul>
                    </main>
                    <article class="modal" id="addCategory">
                        <div class="modal__category__content">
                            <div class="overflow__category__container">
                                <div class="overflow__container__header category__header">
                                    <h2>ADD NEW CATEGORY</h2>
                                    <span id="closeCategoryOwerflow"><svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="0.353553" y1="0.646447" x2="46.3536" y2="46.6464" stroke="black" stroke-opacity="0.48"/>
                                    <path d="M46.5 0.5L0.5 46.5" stroke="black" stroke-opacity="0.48"/>
                                    </svg></span>
                                </div>
                            </div>
                            <form method="POST" name="category" class="form">
                                <label for="categoryName">Category name:</label><br>
                                <input type="text" id="categoryName" name="category" class="input" required><br>
                                <label for="imageCategory">Category icon (optional):</label><br>
                                <input type="file" id="imageCategory" name="category"><br>
                                <div class="button__container">
                                    <input type="submit" value="Add category" class="add__category__button">
                                </div>
                            </form>
                        </div>
                    </article>
                    <script src="/js/categories.js"></script>
                    <script src="/js/theme-change.js"></script>`
        return view
    },
    after_render: async() => {
        document.getElementById('logOut').addEventListener('click', () => {
            authorization.logOut();
        });
        document.getElementById('username').textContent = localStorage.getItem('currentUserEmail');
        var modalCategory = document.getElementById("addCategory");
        var addCategoryBtn = document.getElementById("addCategoryBtn");
        var closeCategoryOwerflow = document.getElementById("closeCategoryOwerflow");

        addCategoryBtn.onclick = function() {
            modalCategory.style.display = "block";
        }

        closeCategoryOwerflow.onclick = function() {
            modalCategory.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modalCategory) {
                modalCategory.style.display = "none";
            }
        }
    }
}

export default categories