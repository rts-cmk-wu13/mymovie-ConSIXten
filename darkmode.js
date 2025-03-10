// Get the root element and the switch element
let rootElm = document.documentElement; // The <html> element
let switchElm = document.querySelector("#switch") // The switch that toggles dark mode

// Read the user's preference from localStorage (if it exists)
let userDark = readFromLocalStorage("isDarkMode")
// Check the user's dark mode preference in the browser (as a fallback)
let browserDark = window.matchMedia("prefers-color-scheme: dark").matches;


// Check if user has a saved preference in localStorage, if not, use browser's preference
// If there's a user preference, apply it
if (userDark !== null) {
    if (userDark) {
        switchElm.checked = true; // Check the toggle switch
        rootElm.setAttribute("data-dark", "true"); // Set the data-dark attribute
    } else {
        switchElm.checked = false;
        rootElm.setAttribute("data-dark", "false");
    }
} else {

    // Fallback to browser's dark mode preference
// If there's no user preference, use the browser's default setting
    if (browserDark) {
        console.log("Browser preference: Dark Mode");
        switchElm.checked = true;
        rootElm.setAttribute("data-dark", "true");
    } else {
        console.log("Browser preference: Light Mode");
        switchElm.checked = false;
        rootElm.setAttribute("data-dark", "false");
    }
}
 // When the switch changes, save the preference and update the data-dark attribute
switchElm.addEventListener("change", function() {
    // console.log(switchElm.checked);
    saveToLocalStorage("isDarkMode", switchElm.checked); // Save the preference to localStorage
    
    if (switchElm.checked) {
        rootElm.setAttribute("data-dark", "true");
    } else {
        rootElm.setAttribute("data-dark", "false");
    }
});
