import parseRequestURL from './Utils.js'
import home from './views/home.js'
import about from './views/about.js'
import categories from './views/categories.js'
import login from './views/login.js'
import register from './views/register.js'
import stats from './views/stats.js'
import wallet from './views/wallet.js'

const routes = {
    '/': home,
    '/about': about,
    '/categories': categories,
    '/login': login,
    '/register': register,
    '/stats': stats,
    '/wallet': wallet
};

const router = async() => {
    const content = null || document.getElementById('page_container');
    let request = parseRequestURL();
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
    let page = routes[parsedURL] ? routes[parsedURL] : 1 //: Error404
    console.log(page)
    content.innerHTML = await page.render();
    await page.after_render();
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);