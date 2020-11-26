
function animationsPerLocations(){
    if(window.location.hash === "#technicaloverview"){
        const technicalFadeIn = document.querySelectorAll(".technical-text p");
        technicalFadeIn.forEach((p, index) => {
            if(!p.style.animation){
            p.style.animation = `fadeIn 0.5s ease forwards ${
                index / (technicalFadeIn.length - 1) + settings.animation.navLinkFade
            }s`;
            }
        });
    }
    if(window.location.hash === "#interior"){
      const interiorFadeIn = document.querySelectorAll("p.interior-text");
      interiorFadeIn.forEach((p, index) => {
        console.log(p, index);
        if(!p.style.animation){
        p.style.animation = `fadeIn 1.5s ease forwards ${settings.animation.oneSecond}s`;
        }
      });
    }      
}


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