//dom content event listener to event listener to ensure that the DOM is fully loaded before your script tries to access and manipulate DOM elements. 
//This is important because the browser reads an HTML file from top to bottom, and if your script tries to access an element that hasn't been loaded yet, it will throw an error.


document.addEventListener("DOMContentLoaded", function() {

    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< toggle sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    //toggle sidebar
    const sidebar = document.querySelector('.sidebar');
  
    // Ensure the sidebar is not in the collapesed state on page load
    sidebar.classList.add('collapesed');

    document.getElementById('toggleBtnHamburgerNav').addEventListener('click', () => {
        sidebar.classList.toggle('collapesed');
    });
    
    document.getElementById('toggleBtnCross').addEventListener('click', () => {
        sidebar.classList.toggle('collapesed');
    });

        
    /* -----Swap Stations-----*/
    function swapStations() {
        var startStationInput = document.getElementById("start-station");
        var endStationInput = document.getElementById("end-station");
    
        var temp = startStationInput.value;
        startStationInput.value = endStationInput.value;
        endStationInput.value = temp;
    }
    /* -----return tick----*/
    function toggleReturnDate() {
        var returnDateLabel = document.getElementById("return-date-label");
        var returnDateInput = document.getElementById("return-date");
        
        if (returnDateInput.style.display === "none") {
            returnDateLabel.style.display = "block";
            returnDateInput.style.display = "block";
        } else {
            returnDateLabel.style.display = "none";
            returnDateInput.style.display = "none";
        }
    }
  
    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CHECKS LOGIN STATUS AND REDIRECTING TO INDEX PAGE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // // Check if user is logged in
    // if (sessionStorage.getItem("loggedIn") !== "true") {
    //     window.location.href = "login.html";
    // }

    // Check if user is logged in
    if (sessionStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html";
    }

    // Logout function to clear the session storage and redirect to login page
    function logout() {
        // Clear session storage
        sessionStorage.removeItem("loggedIn");
        // Redirect to login page
        window.location.href = "login.html";
    };

    //add event listener for logout button
    document.getElementById('logoutButton').addEventListener('click', logout);
    // Add event listener for logout icon
    document.getElementById('logoutIcon').addEventListener('click', logout);

});