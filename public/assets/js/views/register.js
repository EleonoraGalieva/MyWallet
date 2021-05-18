let register = {
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
                    <h1>Registration</h1>
                    <h2 class="authorization__inner__subtite">Already have an account? <a href="/#/login">Login here!</a></h2>
                    <section class="form__container">
                        <form method="POST" name="register" class="form">
                            <label for="email">Email:</label><br>
                            <input type="text" id="emailLogin" name="register" class="input" required><br>
                            <label for="email">Password:</label><br>
                            <input type="password" id="passwordLogin" name="register" class="input" required><br>
                            <label for="email">Confirm password:</label><br>
                            <input type="password" id="confirm_password" name="register" class="input" required><br>
                            <input type="submit" value="Sign Up" class="input__button form" id="signUpEmail">
                        </form>
                        <p>or sign up with...</p>
                        <button class="form__image__button">
                            <div class="submit__container">
                                <img class="img__logo" src="assets/img/google_logo.png">
                            Sign Up with Google
                        </div></button>
                        <button class="form__image__button">
                            <div class="submit__container">
                                <img class="img__logo" src="assets/img/facebook_logo.png">
                            Sign Up with Facebook
                        </div></button>
                        <button class="form__image__button">
                            <div class="submit__container">
                                <img class="img__logo" src="assets/img/apple_logo.png">
                            Sign Up with Apple
                        </div></button>
                    </section>
                </article>
            </main>`
        return view;
    },
    after_render: async() => {}
}

export default register