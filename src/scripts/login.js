
document.getElementById('loginForm').addEventListener('submit', function(event) {
    
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Get the email and password values
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Check if the email and password are correct
    var correctEmail = "user@example.com";
    var correctPassword = "password123";

    if (email === correctEmail && password === correctPassword) {
        // Set session storage item to indicate the user is logged in
        sessionStorage.setItem("loggedIn", "true");
        // Redirect to index.html if the credentials are correct
        window.location.href = "index.html";
        // alert("You have successfully logged in!");
    } else {
        // Show an error message if the credentials are incorrect
        alert("Incorrect email or password. Please try again.");
    }
});