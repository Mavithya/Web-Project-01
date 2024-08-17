

const headerHTML = /*html*/`
    <header class="flex items-center bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100 h-[65px] fixed w-full top-0 z-40 pr-[0px] lg:pr-[70px] dark:bg-none dark:bg-black" >     
        <h2 class="max-w-screen-xl pl-4 py-16  sm:px-6 lg:px-8 text-3xl font-bold text-sky-700 mr-auto">RailReserve.</h2>
        <button 
            id="logoutButtonHeader"
            class=" px-5 py-2 rounded-full bg-sky-700 hover:scale-105 lg:mx-8 " 
            >
                <a href="#">
                    <span class="text-white ">Logout</span> 
                </a>
        </button>
        <button 
            id="SignInButtonHeader"
            class=" px-5 py-2 rounded-full bg-sky-700 hover:scale-105 lg:mx-8" 
            >
                <a href="#">
                    <span class="text-white ">Sign in</span> 
                </a>
        </button>
      
        <div class="flex justify-center items-center w-[50px] h-[50px] hamburgerIcon rounded-md hover:bg-sky-400/20 mx-2.5 lg:hidden">    
              <button 
                id="toggleBtnHamburgerHeader"
                class="absolute text-slate-400  bx bx-menu cursor-pointer leading-[40px] text-3xl hover:text-sky-500 toggleBtn dark:text-white "
                onclick="document.querySelector('.sidebar').classList.toggle('collapesed');"
              >
              </button>
                
        </div>  
    </header>

`;

// Function to insert the header into a page
function loadHeader() {
  document.getElementById('header-container').innerHTML = headerHTML;
}

// Execute the function when the document is ready
document.addEventListener('DOMContentLoaded', loadHeader);
