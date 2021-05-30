let about = {
    render: async() => {
        let view = /*html*/ `
                                <header class="header">
                                    <div class="container">
                                        <div class="header__logo">
                                            <img src="assets/img/wallet_icon.png" class="header__image">
                                            <a href="/">MyWallet</a>
                                        </div>
                                        <nav class="nav">
                                            <a href="/">Home</a>
                                            <a href="/#/about">About us</a>
                                            <a href="/#/login">Login</a>
                                        </nav>
                                    </div>
                                </header>

                                <main class="wrapper">
                                    <section class="top">
                                        <div class="top__profile">
                                        </div>
                                        <div class="top__content">
                                            <h1 class="title">About us</h1><br>
                                            <p class="subtitle">This is a website<br>for finance tracking. Record all<br> your <span class="underline">spendings and income.</span></p>
                                            <div class="social">
                                                <div class="social__item">
                                                    <i class="fas fa-envelope"></i>
                                                    <a class="social__copy" href="mailto:eleonoragalieva2001@gmail.com">eleonoragalieva2001@gmail.com</a>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </main>
                                <script src="assets/js/theme-change.js"></script>
                            `
        return view;
    },
    after_render: async() => {}
}

export default about;