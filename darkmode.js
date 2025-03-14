document.addEventListener('DOMContentLoaded', () => {
    let rootElm = document.documentElement;
    

    const initDarkMode = () => {
        let switchElm = document.querySelector("#switch");
        if (!switchElm) {
            setTimeout(initDarkMode, 1);
            return;
        }

        let userDark = readFromLocalStorage("isDarkMode");
        let browserDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (userDark !== null) {
            switchElm.checked = userDark;
            rootElm.setAttribute("data-dark", userDark.toString());
        } else {
            switchElm.checked = browserDark;
            rootElm.setAttribute("data-dark", browserDark.toString());
        }

        switchElm.addEventListener("change", function() {
            saveToLocalStorage("isDarkMode", switchElm.checked);
            rootElm.setAttribute("data-dark", switchElm.checked.toString());
        });
    };

    initDarkMode();
});
