//dom content event listener to event listener to ensure that the DOM is fully loaded before your script tries to access and manipulate DOM elements. 
//This is important because the browser reads an HTML file from top to bottom, and if your script tries to access an element that hasn't been loaded yet, it will throw an error.


document.addEventListener("DOMContentLoaded", function() {
    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< courersel >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    
    // $("#sButton2").click(function(){
    //     sliderButton2();
    // });

// // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< cc2  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// /* ======Carousal Wallpapers====== */

// const carousel = document.querySelector('.carousel');
// const carouselItems = document.querySelectorAll('.carousel-item');
// const nextButton = document.getElementById('next');
// const prevButton = document.getElementById('prev');
// let currentIndex = 0;

// function updateCarousel() {
//   const offset = -currentIndex * 100;
//   carousel.style.transform = `translateX(${offset}%)`;
  
// }
// function autoSlide() {
//   currentIndex = (currentIndex + 1) % carouselItems.length;
//   updateCarousel();
// }

// nextButton.addEventListener('click', () => {
//   currentIndex = (currentIndex + 1) % carouselItems.length;
//   updateCarousel();
// });

// const button = document.querySelector('.button');

// prevButton.addEventListener('click', () => {
//   currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;

//   updateCarousel();
// });


// setInterval(autoSlide, 6000); // Change image every 100 seconds

// updateCarousel(); // Initial update


// /*Button*/
// const Button = document.querySelector(".button");

// button.addEventListener("click", (e) => {
//   e.preventDefault();
//   button.classList.add("animate");
//   setTimeout(() => {
//     button.classList.remove("animate");
//   }, 600);
// });



// /* -----Date Update-----*/
// function formatDate() {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
//     const day = String(today.getDate()).padStart(2, '0');
    
//     return `${year}-${month}-${day}`;
//   }
  
//   function setDate() {
//     const dateInput = document.getElementById('dateInput');
//     dateInput.value = formatDate();
//   }
  
//   window.onload = setDate;












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