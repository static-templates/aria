// Add your javascript here

window.darkMode = false;

const stickyClasses = ['fixed', 'h-14'];
const unstickyClasses = ['absolute', 'h-20'];
const stickyClassesContainer = ['border-neutral-300/50' , 'bg-white/80', 'dark:border-neutral-600/40', 'dark:bg-neutral-900/60', 'backdrop-blur-2xl'];
const unstickyClassesContainer = ['border-transparent'];
let headerElement = null;

document.addEventListener('DOMContentLoaded', function(){
    headerElement = document.getElementById('header');

    if(localStorage.getItem('dark_mode') && localStorage.getItem('dark_mode') == 'true'){
        window.darkMode = true;
        showNight();
    } else {
        showDay();
    }
    stickyHeaderFuncionality();
    applyMenuItemClasses();
    evaluateHeaderPosition();
    mobileMenuFunctionality();
});

// window.toggleDarkMode = function(){
//     document.documentElement.classList.toggle('dark');
//     if(document.documentElement.classList.contains('dark')){
//         localStorage.setItem('dark_mode', true);
//         window.darkMode = true;
//     } else {
//         window.darkMode = false;
//         localStorage.setItem('dark_mode', false);
//     }
// }




window.stickyHeaderFuncionality = function(){
    window.addEventListener('scroll', function() {
        evaluateHeaderPosition();
    });
}

window.evaluateHeaderPosition = function(){
    if(window.scrollY > 16){
        headerElement.firstElementChild.classList.add(...stickyClassesContainer);
        headerElement.firstElementChild.classList.remove(...unstickyClassesContainer);
        headerElement.classList.add(...stickyClasses);
        headerElement.classList.remove(...unstickyClasses);
        document.getElementById('menu').classList.add('top-[56px]');
        document.getElementById('menu').classList.remove('top-[75px]');

    } else {
        headerElement.firstElementChild.classList.remove(...stickyClassesContainer);
        headerElement.firstElementChild.classList.add(...unstickyClassesContainer);
        headerElement.classList.add(...unstickyClasses);
        headerElement.classList.remove(...stickyClasses);
        document.getElementById('menu').classList.remove('top-[56px]');
        document.getElementById('menu').classList.add('top-[75px]');
    }
}



document.getElementById('darkToggle').addEventListener('click', function(){
    document.documentElement.classList.add('duration-300');
    
    if(document.documentElement.classList.contains('dark')){
        localStorage.removeItem('dark_mode');
        showDay(true);
        
    } else {
        localStorage.setItem('dark_mode', true);
        showNight(true);
        
    }
});

function showDay(animate){
    document.getElementById('sun').classList.remove('setting');
    document.getElementById('moon').classList.remove('rising');
    
    let timeout = 0;
    

    if(animate){
        timeout = 500;
        
        document.getElementById('moon').classList.add('setting');
    }

    setTimeout(function(){
        document.getElementById('dayText').classList.remove('hidden');
        document.getElementById('nightText').classList.add('hidden');

        document.getElementById('moon').classList.add('hidden');
        document.getElementById('sun').classList.remove('hidden');

        if(animate){
            document.documentElement.classList.remove('dark');
            document.getElementById('sun').classList.add('rising');
        }
        
    }, timeout);
}

function showNight(animate){
    document.getElementById('moon').classList.remove('setting');
    document.getElementById('sun').classList.remove('rising');

    let timeout = 0;
    

    if(animate){
        timeout = 500;
        
        document.getElementById('sun').classList.add('setting');
    }

    setTimeout(function(){
        document.getElementById('nightText').classList.remove('hidden');
        document.getElementById('dayText').classList.add('hidden');

        document.getElementById('sun').classList.add('hidden');
        document.getElementById('moon').classList.remove('hidden');

        if(animate){
            document.documentElement.classList.add('dark');
            document.getElementById('moon').classList.add('rising');
        }

    }, timeout);
}

window.applyMenuItemClasses = function(){
    const menuItems = document.querySelectorAll('#menu a');
    console.log(menuItems);
    for(let i = 0; i < menuItems.length; i++){
        if(menuItems[i].pathname == window.location.pathname){
            menuItems[i].classList.add('text-neutral-900', 'dark:text-white');
        }
    }
    //:class="{ 'text-neutral-900 dark:text-white': window.location.pathname == '{menu.url}', 'text-neutral-700 dark:text-neutral-400': window.location.pathname != '{menu.url}' }"
}


function mobileMenuFunctionality(){
    document.getElementById('openMenu').addEventListener('click', function(){
        openMobileMenu();
    });

    document.getElementById('closeMenu').addEventListener('click', function(){
        closeMobileMenu();
    });
}

window.openMobileMenu = function(){
    document.getElementById('openMenu').classList.add('hidden');
    document.getElementById('closeMenu').classList.remove('hidden');
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('mobileMenuBackground').classList.add('opacity-0');
    document.getElementById('mobileMenuBackground').classList.remove('hidden');

    setTimeout(function(){
        document.getElementById('mobileMenuBackground').classList.remove('opacity-0');
    }, 1);
}

window.closeMobileMenu = function(){
    document.getElementById('closeMenu').classList.add('hidden');
    document.getElementById('openMenu').classList.remove('hidden');
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('mobileMenuBackground').classList.add('hidden');
}


document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const posts = document.querySelectorAll('.postItem');

    posts.forEach(post => {
        const title = post.querySelector('a').textContent.toLowerCase();
        if (title.includes(query)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });

    // Update the URL's query string without reloading the page
    const newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + '?search=' + encodeURIComponent(query);
    window.history.pushState({path:newURL},'',newURL);
});

window.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('search');
    if (query) {
        const inputField = document.getElementById('searchInput');
        inputField.value = query;

        const posts = document.querySelectorAll('.postItem');
        posts.forEach(post => {
            const title = post.querySelector('a').textContent.toLowerCase();
            if (title.includes(query.toLowerCase())) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }
});

document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const posts = document.querySelectorAll('.postItem');
    let postFound = false; // To check if at least one post is found

    posts.forEach(post => {
        const title = post.querySelector('a').textContent.toLowerCase();
        if (title.includes(query)) {
            post.style.display = 'block';
            postFound = true;
        } else {
            post.style.display = 'none';
        }
    });

    // Display the noPostsFound div if no posts are visible
    const noPostsFoundDiv = document.getElementById('noPostsFound');
    if (postFound) {
        noPostsFoundDiv.classList.add('hidden');
    } else {
        noPostsFoundDiv.classList.remove('hidden');
    }
});
