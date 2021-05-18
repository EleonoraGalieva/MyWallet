let error404 = {
    render: async() => {
        let view = /*html*/ `
                                <main class="error__page">
                                    <h1>Sorry, page is not found :(</h1>
                                    <img src="assets/img/404error.png" class="error__img">
                                </main>
                                <script src="assets/js/theme-change.js"></script>
                            `
        return view;
    },
    after_render: async() => {}
}

export default error404;