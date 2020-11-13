// SCROLL TO TOP
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  

// SCROLL FUNCTION
const anchors = document.querySelector(".anchors");
anchors.firstElementChild.firstElementChild.firstElementChild.classList.add('active');

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
            anchors.firstElementChild.children[i].firstElementChild.classList.toggle("active", i === this.index);
        });
    },
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