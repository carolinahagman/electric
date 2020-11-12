const anchors = document.querySelector(".anchors");
// console.log(anchors);
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
