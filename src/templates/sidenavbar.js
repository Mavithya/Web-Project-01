// sidenav.js
const sidenavHTML = /*html*/`
    <nav class="fixed flex h-full sidebar z-50 pt-2">
        
        <div  class="flex items-center w-full h-[70px]">
            <h2 class="ml-4 text-3xl font-bold transition-all delay-100 text-sky-700 logo grow">RailReserve.</h2>
            <div class="hidden justify-center items-center w-[70px] h-[50px] hamburgerIcon rounded-md hover:bg-sky-700/20 mx-2.5">    
                <i 
                id="toggleBtnHamburgerNav"
                class="absolute text-slate-400  bx bx-menu cursor-pointer leading-[40px] text-3xl hover:text-sky-700 toggleBtn dark:text-white "
                >
                </i>
            </div>
            <div class="flex justify-center items-center w-[70px] h-[50px] crossIcon pt-2">    
                <i 
                id="toggleBtnCross"
                class="absolute text-slate-400  bx bx-x cursor-pointer leading-[40px] text-4xl hover:text-sky-700 toggleBtn dark:text-white "
                >
                </i>
            </div>                
        </div>
        
        <div class="flex-1">   <!--  -1  grow the flex-->
            
            <ul class="mt-2.5">
                
                <li class="nav-lists">
                    <a href="index.html">
                        <i class='bx bx-home-alt' ></i>
                        <span>Home</span>
                    </a>
                </li>
                
                <li class="nav-lists">
                    <a href="../dist/main_form.html">
                        <i class='bx bxs-train'></i>
                        <span>Reservation</span>
                    </a>
                </li>
                
                <li class="nav-lists">
                    <a href="../dist/aboutus.html">
                        <i class='bx bx-notepad' ></i>
                        <span>About us</span>
                    </a>
                </li>
                
                <li class="nav-lists">
                    <a href="../dist/contactus.html">
                        <i class='bx bxs-conversation' ></i>
                        <span>Contact us </span>
                    </a> 
                </li>
                
                <li class="nav-lists">
                    <a href="../dist/index.html#pic">
                        <i class='bx bxs-dashboard' ></i>
                        <span>Gallery</span>
                    </a>
                </li>
                
            </ul>
        
        </div>
        
    <!-- side nav bar bottom section ------------------------- -->
     

        <div  class="flex flex-col justify-end visible h-full text-center transition-all duration-300 cicle">  
            
            <div class="flex flex-col items-center justify-center userCircleDiv"> 
                <i class="text-6xl text-slate-400 bx bx-user-circle mb-2" ></i>
            </div>
            
            
            <button 
            id="logoutButton"
            class="self-center px-5 py-2 rounded-full bg-sky-700 hover:scale-105 logoutBtn hidden" 
            >
                <a href="#">
                    <span class="text-white ">Logout</span> 
                </a>
            </button>
            <button 
            id="SignInButton"
            class="self-center px-5 py-2 rounded-full bg-sky-700 hover:scale-105 logoutBtn" 
            >
                <a href="#">
                    <span class="text-white ">Sign in</span> 
                </a>
            </button>
            
            <div id="logoutIcon">
            <span class="hidden text-4xl logoutIcon text-slate-400">
                <i class='-translate-x-1 bx bx-log-out' ></i> 
            </span>
            </div>

            <div id="SignInIcon">
            <span class="hidden text-4xl SignInIcon text-slate-200">
                <i class='-translate-x-1 bx bx-log-in' ></i>
            </span>
            </div>
            
            
            <div class="flex justify-center gap-4 mt-4 mb-6">
                <span class="light-dark-mode-text dark:hidden font-medium ">Dark Mode</span>  
                <span class="hidden text-white light-dark-mode-text dark:block">Light Mode</span>         
            
                <button
                    id="toggleDark"
                    class="justify-center"
                    onclick="document.body.classList.toggle('dark')"
                    >
                    <div class="w-[45px] border-[2px] rounded-full border-slate-500 text-slate-500 flex items-center h-[26px] justify-center dark:border-white dark:text-white transition-all duration-150 darkButton  hover:text-sky-700 hover:border-sky-700">
                        <i class="bx bx-moon dark:invisible"></i>
                        <i class="invisible bx bx-sun dark:visible"></i>
                    </div>
                </button>
            </div>
        </div>
    </nav>

`;

// Function to insert the side nav into a page
function loadSidenav() {
  document.getElementById('sidenav-container').innerHTML = sidenavHTML;
}

// Execute the function when the document is ready
document.addEventListener('DOMContentLoaded', loadSidenav);
