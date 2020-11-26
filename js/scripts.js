"use strict";

const settings = {

  logo : {
    menuOpen : 'images/Electric_logo_maxrender_vit.png',
    menuClosed : 'images/Electric_logo_maxrender_svart.png'

  },
  responsive : {
    phone: 900,
  },

  animation : {
    navLinkFade: 0.4,
  },

  scrollAnimation : {
    dekstop : true,
    mobile : false
  }
};

const touchEvent = "ontouchstart" in window ? "touchstart" : "click";

const anchorsFadeIn = document.querySelectorAll(".anchors ul li");

// Gather all pages to create a dynamic menu.
const queryPages = document.querySelectorAll("[data-anchor]");
let pages = [];
queryPages.forEach((page) => {
  pages.push(page.getAttribute("name"));
});

const menu = document.createElement("div");
const ul = document.createElement("ul");
menu.classList.add("anchors");
pages.forEach((page) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  const href = page.split(" ").join("");

  a.textContent = page;
  a.setAttribute("href", "#" + href);
  li.append(a);
  ul.append(li);
  a.classList.add("NavLinks");
});

const mobileMenu = ul.cloneNode(true);
mobileMenu.append(ul);
mobileMenu.classList.add("mobile-nav");
menu.append(ul);

const body = document.querySelector("body");
body.prepend(mobileMenu);
body.prepend(menu);

// Create change language part
const changeLanguageLi = document.createElement("li");
const changeLanguageP = document.createElement("p");
const changeLanguageSpan = document.createElement("span");
changeLanguageSpan.textContent = "SV";
changeLanguageSpan.className = "inactive-language";
changeLanguageP.textContent = "EN | ";
changeLanguageP.appendChild(changeLanguageSpan);
changeLanguageLi.appendChild(changeLanguageP);
changeLanguageLi.style.marginTop = "40px";
changeLanguageLi.className = "mobile-change-language";
ul.appendChild(changeLanguageLi);

// SCROLL FUNCTION
const anchors = document.querySelector(".anchors");

anchors
  .querySelector("ul")
  .firstElementChild.firstElementChild.classList.add("active");

const pageable = new Pageable("main", {
  interval: 20,
  delay: 100,
  onBeforeStart: function (x, y) {
    this.pages.forEach((page, i) => {
      page.firstElementChild.classList.remove("active");
    });
  },
  onScroll: function (y) {},
  onFinish: function (data) {
    // remove bouncing arrow from last page.
    document.querySelector("#next-arrow").style.display =
      window.location.hash === "#joinus" ? "none" : "block";

    menuCheck(false, true);
    this.pages.forEach((page, i) => {
      page.firstElementChild.classList.toggle("active", i === this.index);
      anchors
        .querySelector("ul")
        .children[i].firstElementChild.classList.toggle(
          "active",
          i === this.index
        );
    });
  },
});

function menuShowHide(show = null) {
  const anchorsFade = document.querySelectorAll(".anchors ul li");

  if (show == "hide") {
    anchorsFade.forEach((page, index) => {
      if (
        (page.style.animation != "" && window.location.hash === "#start") ||
        (window.location.hash == "" && page.style.animationName == "menuFadeIn")
      ) {
        page.style.animation = "";
        if (!page.style.animation) {
          page.style.opacity = "1";
          page.style.animation = `menuFadeOut 1s ease forwards ${
            index / (anchorsFade.length - 1) + 0.1
          }s`;
        }
      }
    });
  }
  if (show == "show") {
    anchorsFade.forEach((page, index) => {
      document.getElementsByClassName("anchors")[0].style.display = "block";
      if (
        (page.style.animationName === "menuFadeOut" &&
          window.location.hash !== "#start") ||
        window.location.hash != ""
      ) {
        page.style.animation = "";
      }
      if (!page.style.animation) {
        page.style.opacity = "0";
        page.style.animation = `menuFadeIn 0.5s ease forwards ${
          index / (anchorsFade.length - 1) + settings.animation.navLinkFade
        }s`;
      }
    });
  }
}

// Function for resizing and page scroll control
function menuCheck(hash = null, scrollFinish = null) {
  const logoImage = document
    .getElementsByClassName("logo")[0]
    .getElementsByTagName("img")[0];
  const imageSize = logoImage.clientWidth;

  logoImage.style.transform = "";
  logoImage.style.transformOrigin = "";
  const anchor = document.getElementsByClassName("anchors")[0];
  const dots = document.getElementsByClassName("dots")[0];

  // Show color dots for #personalize
  dots.style.display =
    window.location.hash === "#personalize" ? "block" : "none";

  if (scrollFinish === true) {
    if (window.location.hash === "#start" || window.location.hash == "") {
      menuShowHide("hide");
    } else if (
      document.body.clientWidth >= settings.responsive.phone &&
      window.location.hash !== "#start"
    ) {
      menuShowHide("show");
    } else {
    }
  }
}

  // Set value from window load.
  const setDataTypeOnImage = document.querySelector(
    "section[name=Personalize] img"
  );
  if (window.innerWidth <= 1024) {
    setDataTypeOnImage.dataset.type = "mobile";
  } else {
    setDataTypeOnImage.dataset.type = "desktop";
  }

// Remove sidebar on desktop view if its the first(#start) page.
window.addEventListener("resize", function (event) {
  if (window.location.hash === "#start" || window.location.hash == "") {
  } else if (
    document.body.clientWidth >= settings.responsive.phone &&
    window.location.hash !== "#start"
  ) {
    document.getElementsByClassName("anchors")[0].style.display = "block";
  } else if (
    document.body.clientWidth <= settings.responsive.phone &&
    window.location.hash !== "#start"
  ) {
    document.getElementsByClassName("anchors")[0].style.display = "none";
  } else if (window.location.hash !== "#start" || window.location.hash != "") {
  } else {
  }

  // Dots on car
  const setDataTypeOnImage = document.querySelector(
    "section[name=Personalize] img"
  );
  if (window.innerWidth <= 1024) {
    setDataTypeOnImage.dataset.type = "mobile";
  } else {
    setDataTypeOnImage.dataset.type = "desktop";
  }
});

// Show correct image when in #personalize when dots are clicked.
const dots = document.querySelectorAll(".dot");
dots.forEach((dot) => {
  dot.addEventListener(touchEvent, (e) => {
    const color = e.target.getAttribute("id");
    const imageParent = document.querySelector(".personalize");
    const image = imageParent.getElementsByTagName("img")[0];
    const dataTypeDesktop = document.querySelector(
      ".personalize picture source"
    );
    const dataType = document.querySelector(".personalize picture img").dataset
      .type;
    if (dataType === "mobile") {
      image.src = `/images/mobile_colors_${color}.png`;
    } else {
      dataTypeDesktop.srcset = `/images/colors_${color}.jpg`;
      image.src = `/images/colors_${color}.jpg`;
    }
  });
});

// Menu click function

const nav = () => {
  const hamburger = document.querySelector(".hamburger-menu"),
  mobileNav = document.querySelector(".mobile-nav"),
  navLinks = document.querySelectorAll(".mobile-nav li, .change-language"),
  mobileNavActive = document.querySelector(".mobile-nav-active"),
  logo = document.querySelector(".logo img"),
  menuClicked = document.querySelectorAll(".anchors ul li a");

  menuClicked.forEach((link) => {
    link.addEventListener(touchEvent, (e) => {
      e.preventDefault();

      const anchor = e.target.getAttribute("href").toLowerCase();
      pageable.scrollToAnchor(`${anchor}`);
    });
  });

  // HAMBURGER-MENU FUNCTION
  hamburger.addEventListener(touchEvent, () => {

    hamburger.classList.toggle("toggle");
    mobileNav.classList.toggle("mobile-nav-active");
    
    // Toggle mobile-link on/off
    navLinks.forEach((link, index) => { 
      if (!link.style.animation) {
        link.style.animation = `navLinkFadeIn 1s ease forwards ${
          index / navLinks.length + settings.animation.navLinkFade
        }s`;
      }
      link.addEventListener(touchEvent, (e) => {
        
        e.preventDefault();
        pageable.scrollToAnchor(
          `${link.firstElementChild.getAttribute("href").toLowerCase()}`
        );
        hamburger.classList.toggle("toggle");
        mobileNav.classList.remove("mobile-nav-active");
      
      });

      navLinks.forEach(link => {
        link.addEventListener("click", () => {
            burger.classList.toggle("toggle");
        })
      });
      hamburger.removeEventListener(touchEvent, hamburger);
    });

    logo.src = hamburger.classList.contains("toggle") ? settings.logo.menuOpen : settings.logo.menuClosed;

    // navLinks.forEach((link) => {
    //   link.addEventListener(touchEvent, (e) => {
    //     navLinks.forEach((link, index) => {
    //       if (!link.style.animation) {
    //         link.style.animation = `navLinkFadeIn 1s ease forwards ${
    //           index / navLinks.length + settings.animation.navLinkFade
    //         }s`;
    //       }
    //     });

    //     e.preventDefault();
    //     hamburger.classList.toggle("toggle");
    //     mobileNav.classList.remove("mobile-nav-active");
    //     pageable.scrollToAnchor(
    //       `${link.firstElementChild.getAttribute("href").toLowerCase()}`
    //     );
    //   });
    // });
  });
};

nav();



//Sidescroll on flying section.

const sideScrollBtn = document.querySelector("#side-scroll-btn");
const sideScroll = document.querySelector("#side-scroll");
sideScrollBtn.addEventListener(touchEvent, (event) => {
  sideScroll.classList = sideScroll.classList.contains("side-scrolled")
    ? [""]
    : ["side-scrolled"];
  sideScrollBtn.classList = sideScrollBtn.classList.contains("rotated")
    ? [""]
    : ["rotated"];
});

// Engine start animation
const startButton = document.querySelector(".startButton"),
  loadEngine = document.querySelectorAll("#Lager_1-2 .cls-1");
let startButtonState = false;
startButton.style.opacity = 1;
let opacity = startButton.style.opacity;
opacity = parseFloat(opacity).toFixed(2);
startButton.addEventListener(touchEvent, (e) => {
  const changeText = setInterval(() => {
    opacity = parseFloat(opacity).toFixed(2);
    if (startButtonState == false) {
      opacity = opacity - 0.05;
      startButtonState = opacity === 0.0 ? true : false;
      startButton.style.opacity = opacity;
    }
    if (startButtonState == true) {
      if (opacity === 0) {
        startButton.textContent = "ENGINE STARTED";
      }
      opacity = parseFloat(opacity) + 0.1;
      startButton.style.opacity = opacity;
      if (opacity === 1) {
        clearInterval(changeText);
      }
    }
  }, 50);

  changeText;

  // Reverse the Engine start array. Or else it will go counterclockwise.
  function reverse(input) {
    var ret = [];
    for (var i = input.length - 1; i >= 0; i--) {
      ret.push(input[i]);
    }
    return ret;
  }
  const startEngine = reverse(loadEngine);
  startEngine.forEach((key, index) => {
    key.style.animation = `svgFill 0s ease forwards ${
      index / loadEngine.length + 0.4
    }s`;
  });
});

// Show page of clicked item at #conceptKey
const conceptDot = document.querySelectorAll(".keyDots div");
const conceptPages = document.querySelectorAll(".conceptPage");
const screenPages = document.querySelector(".screen");
const leftArrow = document.querySelector(".leftArrow");
const rightArrow = document.querySelector(".rightArrow");
conceptDot.forEach((page) => {
  page.addEventListener(touchEvent, (e) => {
    const arrowClicked = e.target.classList[0];
    const activePage = document.querySelector(".conceptActive");
    activePage.style.display = "none";
    activePage.classList.remove("conceptActive");

    // Show arrows
    if (
      [...activePage.parentNode.children].indexOf(activePage.nextElementSibling)
    )
      if (arrowClicked === "rightArrow") {
        activePage.nextElementSibling.style.display = "grid";
        activePage.nextElementSibling.classList.add("conceptActive");
        if (
          [...activePage.parentNode.children].indexOf(
            activePage.nextElementSibling
          ) === conceptPages.length
        ) {
          e.target.textContent = "";
          leftArrow.textContent = "BACK";
        } else {
          leftArrow.textContent = "BACK";
          e.target.textContent = "NEXT";
        }
      }
    if (arrowClicked === "leftArrow") {
      activePage.previousElementSibling.style.display = "grid";
      activePage.previousElementSibling.classList.add("conceptActive");
      if (
        [...activePage.parentNode.children].indexOf(
          activePage.previousElementSibling
        ) ===
        conceptPages.length / conceptPages.length
      ) {
        e.target.textContent = "";
        rightArrow.textContent = "NEXT";
      } else {
        rightArrow.textContent = "NEXT";
        e.target.textContent = "BACK";
      }
    }
  });
});

// Lock / unlock the page at #conceptKey
const locked = document.querySelector(".locked"),
  unlocked = document.querySelector(".unlocked"),
  lockSession = document.querySelector(".lockSession"),
  lockSessionText = document.querySelector(".unlockLine p"),
  pageTwoLockStatus = document.querySelector(".pageTwoLockStatus");

lockSession.addEventListener(touchEvent, (e) => {
  const clickedItem = e.target.closest("div");
  const childrens = e.target.closest(".lockSession").children;

  for (const children of childrens) {
    if (children.getAttribute("class") !== "unlockLine") {
      children.classList.toggle("activated");
      if (children.classList.contains("activated", "unlocked")) {
        lockSessionText.textContent = "DOORS UNLOCKED";
        pageTwoLockStatus.textContent = "Unlocked";
      } else {
        lockSessionText.textContent = "DOORS LOCKED";
        pageTwoLockStatus.textContent = "Locked";
      }
    }
  }
});

//change opacity on the technical overview section
const technicalOverlay = document.querySelector("#show-inside");
const technicalImg = document.querySelector("#technical-top");
const technicalBottomImg = document.querySelector("#technical-bottom");
technicalOverlay.addEventListener("mouseenter", () => {
  technicalImg.style.opacity = 0.2;
});

technicalOverlay.addEventListener("mouseleave", () => {
  technicalImg.style.opacity = 1;
});

//fix pages section on mobile

if (window.innerWidth <= 1024) {
  // Technical
  technicalImg.src = "/images/specs-rotated.jpg";
  technicalBottomImg.src = "/images/specs-bottom-rotated.jpg";
  technicalOverlay.addEventListener("touchstart", () => {
    technicalImg.style.opacity = 0.2;
  });
  technicalOverlay.addEventListener("touchend", () => {
    technicalImg.style.opacity = 1;
  });
}