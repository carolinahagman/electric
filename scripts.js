"use strict";
// SCROLL TO TOP
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
    
  }

const anchorsFadeIn = document.querySelectorAll(".anchors ul li");
anchorsFadeIn.forEach((x, index) => {
x.style.animation = `menuFadeIn 1s ease forwards ${index / anchorsFadeIn.length + 0.4}s`;
});


//   
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
        this.pages.forEach((page, i) => {
            page.firstElementChild.classList.toggle("active", i === this.index);
            anchors.querySelector("ul").children[i].firstElementChild.classList.toggle("active", i === this.index);
        });
        if(window.location.hash === '#personalize'){
            document.getElementsByClassName('dots')[0].style.display = 'block';
        }else{
            document.getElementsByClassName('dots')[0].style.display = 'none';
        }
    } 
});

const dots = document.querySelectorAll('.dot');

dots.forEach((div) => {
    div.addEventListener('click', (e) => {
        console.log(e.target);
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