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


const bgConceptKey = document.getElementById('conceptKey').style.background;
// .style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0]
console.log(bgConceptKey);