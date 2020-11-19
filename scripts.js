"use strict";
// SCROLL TO TOP
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
    
  }

const anchorsFadeIn = document.querySelectorAll(".anchors ul li");

// START: Gather all pages to create a menu.
let queryPages = document.querySelectorAll('[data-anchor]');
let pages = [];
queryPages.forEach(page => {
    pages.push(page.getAttribute('name'));
});
// END: Gather all pages to create a menu.

// START: Create dynamical menu
let menu = document.createElement('div');
let ul = document.createElement('ul');
menu.classList.add('anchors');
pages.forEach(page => {

    let li = document.createElement('li');
    let a = document.createElement('a');
    let href = page.split(" ").join("");

    a.textContent = page;
    a.setAttribute('href', '#' + href);
    li.append(a);
    ul.append(li);
});

let mobileMenu = ul.cloneNode(true);
mobileMenu.append(ul);
mobileMenu.classList.add('mobile-nav');
menu.append(ul);

const body = document.querySelector('body');
body.prepend(mobileMenu);
body.prepend(menu);
// END: Create dynamical menu


// SCROLL FUNCTION
const anchors = document.querySelector(".anchors");

anchors.querySelector("ul").firstElementChild.firstElementChild.classList.add('active');

const pageable = new Pageable("main", {
    interval: 400,
    delay: 100,
    onBeforeStart: function(x, y) {
        this.pages.forEach((page, i) => {
            page.firstElementChild.classList.remove("active");
        });
        
    },          
    onScroll: function(y) {
    },
    onFinish: function(data) {
        menuCheck(false, true);
        this.pages.forEach((page, i) => {
            page.firstElementChild.classList.toggle("active", i === this.index);
            anchors.querySelector("ul").children[i].firstElementChild.classList.toggle("active", i === this.index);
        });
    } 
});

if( window.location.hash === '#top' || window.location.hash == ''){
    // document.getElementsByClassName('anchors')[0].style.display = 'none';
}else{
    // console.log(document.getElementsByClassName('logo')[0].getElementsByTagName("img")[0].style.width = '100px');
}




function menuShowHide(show = null){
    const anchorsFade = document.querySelectorAll(".anchors ul li");

    if(show == 'hide'){
        anchorsFade.forEach((x, index) => {
            console.log(x.style.animationName);
           if(x.style.animation != '' && window.location.hash === '#top' || window.location.hash == '' && x.style.animationName == 'menuFadeIn'){
               x.style.animation = '';
                if(!x.style.animation){
                    x.style.opacity = "1";
                    x.style.animation = `menuFadeOut 1s ease forwards ${index / ( anchorsFade.length -1 ) + 0.1}s`;
                }
            }
        });
    }
    if(show == 'show'){
        anchorsFade.forEach((x, index) => {
            document.getElementsByClassName('anchors')[0].style.display = 'block';
            if(x.style.animationName === 'menuFadeOut' && window.location.hash !== '#top' || window.location.hash != ''){
                x.style.animation = '';
            }
            if(!x.style.animation){
                x.style.opacity = "0";
                x.style.animation = `menuFadeIn 0.5s ease forwards ${index / (anchorsFade.length-1)+ 0.4}s`;
            }                        
        });
    }
}


// create function for resizing and page scroll control

function menuCheck(hash = null, scrollFinish = null){

    const logoImage = document.getElementsByClassName('logo')[0].getElementsByTagName("img")[0];
    const imageSize = logoImage.clientWidth;
    
    logoImage.style.transform = '';
    logoImage.style.transformOrigin = '';
    const anchor = document.getElementsByClassName('anchors')[0];
    const dots = document.getElementsByClassName('dots')[0];
    
    // Show color dots for #personalize
    dots.style.display = (window.location.hash === '#personalize' ? 'block' : 'none');

    if(scrollFinish === true){
        if(window.location.hash === '#top' || window.location.hash == ''){
            menuShowHide('hide');
        } else if (document.body.clientWidth >= 900 && window.location.hash !== '#top') {
            menuShowHide('show');
        }else{
        }
    }
}

window.addEventListener("resize", function(event) {
    if( window.location.hash === '#top' || window.location.hash == ''){
    } else if (document.body.clientWidth >= 900 && window.location.hash !== '#top') {
        document.getElementsByClassName('anchors')[0].style.display = 'block';
        
    }else if (document.body.clientWidth <= 900 && window.location.hash !== '#top') {
        document.getElementsByClassName('anchors')[0].style.display = 'none';
    }else if ( window.location.hash !== '#top' || window.location.hash != ''){
        
    }else{}
});

const dots = document.querySelectorAll('.dot');
dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
        const color = e.target.getAttribute('id');
        const imageParent = document.querySelector('.personalize');
        const image = imageParent.getElementsByTagName('img')[0];
        image.src = `/images/colors_${color}.jpg`;
    });
});

// Menu click function
anchors.addEventListener("click", (e) => {
    e.preventDefault();
    const anchor = e.target.getAttribute('href');
    pageable.scrollToAnchor(`#${anchor}`);
});


const nav = () => {
    
    const hamburger = document.querySelector(".hamburger-menu");
    const mobileNav = document.querySelector(".mobile-nav");
    const navLinks = document.querySelectorAll(".mobile-nav li");
    const mobileNavActive = document.getElementsByClassName('.mobile-nav-active');
    const logo = document.querySelector('.logo');



    // HAMBURGER-MENU FUNCTION
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("toggle");
        mobileNav.classList.toggle('mobile-nav-active');
        
        // Toggle mobile-link on/off
        navLinks.forEach((link, index) => {
            if(!link.style.animation){
                link.style.animation = `navLinkFadeIn 1s ease forwards ${index / navLinks.length + 0.4}s`;
            }else{
                link.style.animation = '';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                navLinks.forEach((link, index) => {
                    if(!link.style.animation){
                        link.style.animation = `navLinkFadeIn 1s ease forwards ${index / navLinks.length + 0.4}s`;
                    }else{
                        link.style.animation = '';
                    }
                });
                
                e.preventDefault();
               
                hamburger.classList.toggle("toggle");
                mobileNav.classList.remove('mobile-nav-active');
                pageable.scrollToAnchor(`#${link.firstElementChild.getAttribute('href')}`);
            })
        });
    });


};

nav();