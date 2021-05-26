import authorization from '../database/authorization.js'
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
                            <div method="POST" name="login" class="form" id="loginForm">
                                <label for="email">Email:</label><br>
                                <input type="text" id="emailLogin" name="login" class="input" required><br>
                                <label for="email">Password:</label><br>
                                <input type="password" id="passwordLogin" name="login" class="input" required><br>
                                <input type="submit" value="Sign In" class="input__button form" id="signInEmail">
                            </div>
                            <p>or sign In with...</p>
                            <button class="form__image__button" id="signInGoogle">
                                <div class="submit__container">
                                    <img class="img__logo" src="assets/img/google_logo.png">
                                Sign In with Google
                            </div></button>
                            <button class="form__image__button" id="signInFacebook">
                                <div class="submit__container">
                                    <img class="img__logo" src="assets/img/facebook_logo.png">
                                Sign In with Facebook
                            </div></button>                            
                        </section>
                    </article>
                </main>
                <script src="/js/theme-change.js"></script>`
        return view
    },
    after_render: async() => {
        document.getElementById('signInEmail').addEventListener('click', () => {
            submitLoginForm();
        });

        document.getElementById('signInGoogle').addEventListener('click', () => {
            authorization.signUpWithGoogle();
        });

        document.getElementById('signInFacebook').addEventListener('click', () => {
            authorization.signUpWithFacebook();
        });

        async function submitLoginForm() {
            let email = document.getElementById('emailLogin').value;
            let password = document.getElementById('passwordLogin').value;
            authorization.signInWithEmailAndPassword(email, password);
        }
    }
}

export default login