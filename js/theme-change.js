theme = sessionStorage.getItem("theme") === undefined ? "light" : sessionStorage.getItem("theme")

document.addEventListener("DOMContentLoaded", (event) => {
    document.documentElement.setAttribute("data-theme", theme);
    var themeSwitcher = document.getElementById("theme-switcher");
    themeSwitcher.onclick = function() {
        var currentTheme = document.documentElement.getAttribute("data-theme");
        theme = currentTheme === "dark" ? "light" : "dark"
        document.documentElement.setAttribute("data-theme", theme);
        sessionStorage.setItem("theme", theme)
    }
});