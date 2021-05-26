let home = {
    render: async() => {
        let view = /*html*/ `
                        <header class="header">
                            <div class="container">
                                <div class="header__logo">
                                    <img src="assets/img/wallet_icon.png" class="header__image">
                                    <a href="/">MyWallet</a>
                                </div>
                                <div class="dropdown">
                                    <button id="dropdownBtn"><img class="dropdown__button" src="img/menu_icon_phone.png"></button>
                                    <nav class="nav" id="nav">
                                        <a href="/">Home</a>
                                        <a href="/#/about">About us</a>
                                        <a href="/#/login">Login</a>
                                    </nav>
                                </div>
                            </div>
                        </header>

                        <main class="container" id="index__container">
                            <div class="left__side">
                                <button id="themeSwitcher" class="switch__themes">Click me to switch themes!</button>
                                <div class="intro__title">
                                    <h1>We make finances<br> easy.</h1>
                                </div>
                                <div class="intro__title__mobile">
                                    <h1>We make<br> finances easy.</h1>
                                </div>
                                <h2 id="subtitle">Try our new app.</h2>
                                <img src="assets/img/app_store_google.png" alt="App store and Google play" class="intro__image">
                            </div>
                            <img src="assets/img/phones.png" alt="Phones image" class="intro__phones">
                        </main>

                        <footer class="footer">
                            <div class="container">
                                <p>© 2021 Eleonora </p>
                            </div>
                        </footer>`
        return view;
    },
    after_render: async() => {
        let themeSwitcher = document.getElementById("themeSwitcher")
        let theme = sessionStorage.getItem("theme") === undefined ? "light" : sessionStorage.getItem("theme")
        document.documentElement.setAttribute("data-theme", theme);

        themeSwitcher.addEventListener("click", () => {
            let currentTheme = sessionStorage.getItem("theme") === undefined ? "light" : sessionStorage.getItem("theme");
            theme = currentTheme === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", theme);
            sessionStorage.setItem("theme", theme);
        });
    }
}

export default home;