"use strict";

let touchEvent = "ontouchstart" in window ? "touchstart" : "click";

// SCROLL TO TOP
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

let settings = {
  firstMenu: true,
  mobileMenu: true,
};

const anchorsFadeIn = document.querySelectorAll(".anchors ul li");

// Gather all pages to create a dynamic menu.
let queryPages = document.querySelectorAll("[data-anchor]");
let pages = [];
queryPages.forEach((page) => {
  pages.push(page.getAttribute("name"));
});

let menu = document.createElement("div");
var ul = document.createElement("ul");
menu.classList.add("anchors");
pages.forEach((page) => {
  let li = document.createElement("li");
  let a = document.createElement("a");
  let href = page.split(" ").join("");

  a.textContent = page;
  a.setAttribute("href", "#" + href);
  li.append(a);
  ul.append(li);
});

let mobileMenu = ul.cloneNode(true);
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
changeLanguageSpan.innerHTML = "SV";
changeLanguageSpan.className = "inactive-language";
changeLanguageP.innerHTML = "EN | ";
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
    anchorsFade.forEach((x, index) => {
      if (
        (x.style.animation != "" && window.location.hash === "#start") ||
        (window.location.hash == "" && x.style.animationName == "menuFadeIn")
      ) {
        x.style.animation = "";
        if (!x.style.animation) {
          x.style.opacity = "1";
          x.style.animation = `menuFadeOut 1s ease forwards ${
            index / (anchorsFade.length - 1) + 0.1
          }s`;
        }
      }
    });
  }
  if (show == "show") {
    anchorsFade.forEach((x, index) => {
      document.getElementsByClassName("anchors")[0].style.display = "block";
      if (
        (x.style.animationName === "menuFadeOut" &&
          window.location.hash !== "#start") ||
        window.location.hash != ""
      ) {
        x.style.animation = "";
      }
      if (!x.style.animation) {
        x.style.opacity = "0";
        x.style.animation = `menuFadeIn 0.5s ease forwards ${
          index / (anchorsFade.length - 1) + 0.4
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
    document.body.clientWidth >= 900 &&
    window.location.hash !== "#start"
  ) {
      menuShowHide("show");
    } else {
    }
  }
}

// Remove sidebar on desktop view if its the first(#start) page.
window.addEventListener("resize", function (event) {
  if (window.location.hash === "#start" || window.location.hash == "") {
  } else if (
    document.body.clientWidth >= 900 &&
    window.location.hash !== "#start"
  ) {
    document.getElementsByClassName("anchors")[0].style.display = "block";
  } else if (
    document.body.clientWidth <= 900 &&
    window.location.hash !== "#start"
  ) {
    document.getElementsByClassName("anchors")[0].style.display = "none";
  } else if (window.location.hash !== "#start" || window.location.hash != "") {
  } else {
  }
});

// Show correct image when in #personalize when dots are clicked.
const dots = document.querySelectorAll(".dot");
dots.forEach((dot) => {
  dot.addEventListener(touchEvent, (e) => {
    const color = e.target.getAttribute("id");
    const imageParent = document.querySelector(".personalize");
    const image = imageParent.getElementsByTagName("img")[0];
    image.src = `/images/colors_${color}.jpg`;
  });
});

// Menu click function

const nav = () => {
  const hamburger = document.querySelector(".hamburger-menu"),
    mobileNav = document.querySelector(".mobile-nav"),
    navLinks = document.querySelectorAll(".mobile-nav li, .change-language"),
    mobileNavActive = document.getElementsByClassName(".mobile-nav-active"),
    logo = document.querySelector(".logo"),
    menuClicked = document.querySelectorAll(".anchors ul li");

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
          index / navLinks.length + 0.4
        }s`;
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener(touchEvent, (e) => {
        navLinks.forEach((link, index) => {
          if (!link.style.animation) {
            link.style.animation = `navLinkFadeIn 1s ease forwards ${
              index / navLinks.length + 0.4
            }s`;
          } 
        });

        e.preventDefault();

        hamburger.classList.toggle("toggle");
        mobileNav.classList.remove("mobile-nav-active");
        pageable.scrollToAnchor(
          `${link.firstElementChild.getAttribute("href").toLowerCase()}`
        );
      });
    });
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

// Engine start 
const startButton = document.querySelector(".startButton"),
  loadEngine = document.querySelectorAll("#Lager_1-2 .cls-1");
let startButtonState = false;
startButton.style.opacity = 1;
let opacity = startButton.style.opacity;
opacity = parseFloat(opacity).toFixed(2);
startButton.addEventListener(touchEvent, (e) => {
  let changeText = setInterval(() => {
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

  function reverse(input) {
    var ret = [];
    for (var i = input.length - 1; i >= 0; i--) {
      ret.push(input[i]);
    }
    return ret;
  }
  let startEngine = reverse(loadEngine);
  startEngine.forEach((k, i) => {
    k.style.animation = `svgFill 0s ease forwards ${
      i / loadEngine.length + 0.4
    }s`;
  });
});

// Show page of clicked item at #conceptKey
const conceptDot = document.querySelectorAll(".keyDot");
conceptDot.forEach((page) => {
  page.addEventListener(touchEvent, (e) => {
    let a = document.querySelector(`.${page.getAttribute("id")}`);
    let ab = a.parentNode.querySelectorAll(".conceptPage");
    [...ab].forEach((k) => {
      k.style.display = "none";
    });
    a.style.display = a.getAttribute('display');
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

  for (let children of childrens) {
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

//fix the technical overview section on mobile

if (window.innerWidth < 1024) {
  technicalImg.src = "/images/specs-rotated.jpg";
  technicalBottomImg.src = "/images/specs-bottom-rotated.jpg";
  technicalOverlay.addEventListener("touchstart", () => {
    technicalImg.style.opacity = 0.2;
  });
  technicalOverlay.addEventListener("touchend", () => {
    technicalImg.style.opacity = 1;
  });
}
