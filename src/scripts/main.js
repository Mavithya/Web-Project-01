//dom content event listener to event listener to ensure that the DOM is fully loaded before your script tries to access and manipulate DOM elements. 
//This is important because the browser reads an HTML file from top to bottom, and if your script tries to access an element that hasn't been loaded yet, it will throw an error.


document.addEventListener("DOMContentLoaded", function() {
    
    // $("#sButton2").click(function(){
    //     sliderButton2();
    // });
 
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

   
    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CHECKS LOGIN STATUS AND REDIRECTING TO INDEX PAGE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Check if user is logged in
    if (sessionStorage.getItem("loggedIn") == "true") {
        // window.location.href = "login.html";
        document.getElementById('logoutButton').classList.remove('hidden');
        document.getElementById('SignInButton').classList.add('hidden');
        document.getElementById('SignInIcon').classList.add('hidden');
        document.getElementById('SignInButtonHeader').classList.add('hidden');
    } else {
        document.getElementById('logoutIcon').classList.add('hidden');
        document.getElementById('logoutButtonHeader').classList.add('hidden');
    }

    // Logout function to clear the session storage and redirect to login page
    function logout() {
        // Clear session storage
        sessionStorage.removeItem("loggedIn");
        // Redirect to login page
        window.location.href = "index.html";
    };

    //add event listener for logout button
    document.getElementById('logoutButton').addEventListener('click', logout);
    document.getElementById('logoutButtonHeader').addEventListener('click', logout);
    // Add event listener for logout icon
    document.getElementById('logoutIcon').addEventListener('click', logout);
    
    
    // Logout function to clear the session storage and redirect to login page
    function login() {
        // Redirect to login page
        window.location.href = "../dist/login.html";
    };

    //add event listener for logout button
    document.getElementById('SignInButton').addEventListener('click', login);
    document.getElementById('SignInButtonHeader').addEventListener('click', login);
    // Add event listener for logout icon
    document.getElementById('SignInIcon').addEventListener('click', login);
});