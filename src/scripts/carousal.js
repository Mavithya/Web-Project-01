//dom content event listener to event listener to ensure that the DOM is fully loaded before your script tries to access and manipulate DOM elements. 
//This is important because the browser reads an HTML file from top to bottom, and if your script tries to access an element that hasn't been loaded yet, it will throw an error.


document.addEventListener("DOMContentLoaded", function() {
    
    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< courersel >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
let currentIndex = 0;

function updateCarousel() {
  const offset = -currentIndex * 100;
  carousel.style.transform = `translateX(${offset}%)`;
  
}
function autoSlide() {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel();
}

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel();
});

const button = document.querySelector('.button');

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;

  updateCarousel();
});


setInterval(autoSlide, 4000); 

updateCarousel();




});