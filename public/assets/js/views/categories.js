import authorization from '../database/authorization.js'
import Category from '../database/models/category.js'
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
                        <ul class="categories__list" id="categoriesList"></ul>
                    </main>
                    <article class="modal" id="addCategory">
                        <div class="modal__category__content">
                            <div class="overflow__category__container">
                                <div class="overflow__container__header category__header">
                                    <h2 id="heading">ADD NEW CATEGORY</h2>
                                    <span id="closeCategoryOwerflow"><svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="0.353553" y1="0.646447" x2="46.3536" y2="46.6464" stroke="black" stroke-opacity="0.48"/>
                                    <path d="M46.5 0.5L0.5 46.5" stroke="black" stroke-opacity="0.48"/>
                                    </svg></span>
                                </div>
                            </div>
                            <div name="category" class="form">
                                <label for="categoryName">Category name:</label><br>
                                <input type="text" id="categoryName" name="category" class="input" required><br>
                                <label for="imageCategory">Category icon (optional):</label><br>
                                <input type="file" id="imageCategory" name="category"><br>
                                <div class="button__container">
                                    <input type="submit" value="Add category" class="add__category__button" id="submitCategory">
                                </div>
                            </div>
                        </div>
                    </article>
                    <script src="/js/categories.js"></script>
                    <script src="/js/theme-change.js"></script>`
        return view
    },
    after_render: async() => {
        let mode = 'add';
        let categoriesList, image, currentCategory;
        let ul = document.getElementById('categoriesList');;
        loadCategories();
        // Logout
        document.getElementById('logOut').addEventListener('click', () => {
            authorization.logOut();
        });
        document.getElementById('username').textContent = localStorage.getItem('currentUserEmail');
        var modalCategory = document.getElementById("addCategory");
        var addCategoryBtn = document.getElementById("addCategoryBtn");
        var closeCategoryOwerflow = document.getElementById("closeCategoryOwerflow");
        // Add category
        addCategoryBtn.onclick = function() {
            mode = 'add';
            document.getElementById('heading').textContent = 'ADD NEW CATEGORY';
            document.getElementById('submitCategory').value = 'Add category';
            modalCategory.style.display = "block";
        }

        closeCategoryOwerflow.onclick = function() {
            modalCategory.style.display = "none";
            image = null;
        }

        window.onclick = function(event) {
            if (event.target == modalCategory) {
                modalCategory.style.display = "none";
                image = null;
            }
        }

        document.getElementById('imageCategory').addEventListener('change', (e) => {
            image = e.target.files[0];
        });

        document.getElementById('submitCategory').addEventListener('click', () => {
            let name = document.getElementById('categoryName').value;
            modalCategory.style.display = "none";
            if (mode === 'add') {
                Category.addCategory(new Category(name, image)).then((res) => {
                    if (res) {
                        loadCategories();
                        image = null;
                    } else {
                        console.error('Problem with loading an icon.');
                    }
                });
            } else {
                Category.updateCategory(currentCategory, new Category(name, image)).then((res) => {
                    if (res) {
                        loadCategories();
                        image = null;
                    }
                });
            }
        });

        function loadCategories() {
            Category.readCategories().then((res) => {
                categoriesList = res;
                if (ul != null) {
                    ul.innerHTML = '';
                }
                for (let i = 0; i < categoriesList.length; i++) {
                    let li = document.createElement('li');
                    li.className = 'category';
                    categoriesList[i].name = categoriesList[i].name.charAt(0).toUpperCase() + categoriesList[i].name.slice(1);
                    Category.getIconURL(categoriesList[i].icon).then((urlRes) => {
                        li.innerHTML = `<p id="loadedName">` + categoriesList[i].name + `</p>
                    <img id="loadedImg" class="category__img" src="` + urlRes + `" alt="` + categoriesList[i].name + ` category image">
                    <p class="category__delete" id="deleteCategory">delete</p>`
                        document.getElementById('deleteCategory').addEventListener('click', (e) => {
                            modalCategory.style.display = "none";
                            let selectesLi = e.target.closest('li');
                            let selectedIndex = Array.from(ul.children).indexOf(selectesLi);
                            currentCategory = categoriesList[categoriesList.length - selectedIndex - 1];
                            Category.deleteCategory(currentCategory).then((res) => {
                                if (res) {
                                    loadCategories();
                                }
                            });
                        });
                        document.getElementById('loadedImg').addEventListener('click', (e) => {
                            let selectesLi = e.target.closest('li');
                            let selectedIndex = Array.from(ul.children).indexOf(selectesLi);
                            currentCategory = categoriesList[categoriesList.length - selectedIndex - 1];
                            modalCategory.style.display = "block";
                            mode = 'edit';
                            document.getElementById('heading').textContent = 'EDIT CATEGORY';
                            document.getElementById('submitCategory').value = 'Edit category';

                            document.getElementById('categoryName').value = currentCategory.name;
                            document.getElementById('imageCategory').textContent = currentCategory.icon;
                        });
                    });
                    ul.prepend(li);
                }
            });
        }
    }
}

export default categories