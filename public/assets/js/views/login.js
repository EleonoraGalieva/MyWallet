let login = {
    render: async() => {
        let view = /*html*/ `
                    <header class="header">
                        <div class="container__centered">
                            <div class="header__logo">
                                <img src="assets/img/wallet_icon.png" class="header__image">
                                <a href="/">MyWallet</a>
                            </div>
                        </div>
                    </header>

                <main class="authorization__container">
                    <article class="authorization__inner">
                        <h1>Authorization</h1>
                        <h2 class="authorization__inner__subtite">Don't have an account yet? <a href="/#/register">Click here to create one!</a></h2>
                        <section class="form__container">
                            <form method="POST" name="login" class="form">
                                <label for="email">Email:</label><br>
                                <input type="text" id="email" name="login" class="input" required><br>
                                <label for="email">Password:</label><br>
                                <input type="password" id="password" name="login" class="input" required><br>
                                <input type="submit" value="Sign In" class="input__button form">
                            </form>
                            <p>or sign In with...</p>
                            <button class="form__image__button">
                                <div class="submit__container">
                                    <img class="img__logo" src="assets/img/google_logo.png">
                                Sign In with Google
                            </div></button>
                            <button class="form__image__button">
                                <div class="submit__container">
                                    <img class="img__logo" src="assets/img/facebook_logo.png">
                                Sign In with Facebook
                            </div></button>
                            <button class="form__image__button">
                                <div class="submit__container">
                                    <img class="img__logo" src="assets/img/apple_logo.png">
                                Sign In with Apple
                            </div></button>
                        </section>
                    </article>
                </main>
                <script src="/js/theme-change.js"></script>`
        return view
    },
    after_render: async() => {}
}

export default login