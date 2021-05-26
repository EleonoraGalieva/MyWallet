import authorization from '../database/authorization.js'
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
                        <div name="register" class="form" id="registerForm">
                            <label>Email:</label><br>
                            <input type="text" id="emailRegister" name="register" class="input" required><br>
                            <label>Password:</label><br>
                            <input type="password" id="passwordRegister" name="register" class="input" required><br>
                            <label>Confirm password:</label><br>
                            <input type="password" id="confirmPassword" name="register" class="input" required><br>
                            <input type="submit" value="Sign Up" class="input__button form" id="signUpEmail">
                        </div>
                        <p>or sign up with...</p>
                        <button class="form__image__button" id="signUpGoogle">
                            <div class="submit__container">
                                <img class="img__logo" src="assets/img/google_logo.png">
                            Sign Up with Google
                        </div></button>
                        <button class="form__image__button" id="signUpFacebook">
                            <div class="submit__container">
                                <img class="img__logo" src="assets/img/facebook_logo.png">
                            Sign Up with Facebook
                        </div></button>                
                    </section>
                </article>
            </main>`
        return view;
    },
    after_render: async() => {
        document.getElementById('signUpEmail').addEventListener('click', () => {
            submitRegisterForm();
        });

        document.getElementById('signUpGoogle').addEventListener('click', () => {
            authorization.signUpWithGoogle();
        });

        document.getElementById('signUpFacebook').addEventListener('click', () => {
            authorization.signUpWithFacebook();
        });

        async function submitRegisterForm() {
            let email = document.getElementById('emailRegister').value;
            let password = document.getElementById('passwordRegister').value;
            let confirmPassword = document.getElementById('confirmPassword').value;
            authorization.signUpWithEmailAndPassword(email, password, confirmPassword);
        }
    }
}

export default register