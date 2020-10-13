/**
 * Implements background parallax
 */
function parallaxScroller() {
    let bgStatic = document.querySelector(".container");
    bgStatic.classList.remove("static-background");
    bgStatic.classList.add("transparent");
    let dynamicBackground = document.querySelector(".background");
    dynamicBackground.classList.remove("hidden");
    document.addEventListener("scroll", (e) => {
        dynamicBackground.style.top = `${scrollY}px`; 

    });
}

/**
 * Implements Smooth Scrolling from menu
 */
function smoothScrollToAnchor() {
    let anchors = document.querySelectorAll("nav ul li");
    Array.from(anchors).map((val) => {
        let anchorLink = val.querySelector("a");
        val.textContent = anchorLink.text;
        val.targetAnchor = document.querySelector(anchorLink.getAttribute("href"));
        anchorLink.remove();
        val.addEventListener("click", (e) => {
            e.preventDefault();
            scrollTo({
                top: val.targetAnchor.offsetTop,
                behavior: "smooth"
            });
            history.pushState({}, val.textContent, `#${val.targetAnchor.id}`)
        });
        return val;
    })
}

/**
 * Implements scrollback button
 */
function scrollbackButton() {
    let arrow = document.querySelector(".scroll-up");
    arrow.addEventListener("click", (e) => {
        scrollTo({
            top: 0,
            behavior: "smooth"
        });
    })
    document.addEventListener("scroll", (e) => {
        arrow.style.top = `${scrollY}px`;
        if (scrollY > window.innerHeight / 2) {
            arrow.classList.remove("hidden");
        } else {
            arrow.classList.add("hidden");
        }
    })
}

function accoladeInspector() {
    let accolades = document.querySelectorAll(".accolade");
    let inspector = document.querySelector(".inspector");
    let inspectorImage = inspector.querySelector("#inspector-image");
    let inspectorText = inspector.querySelector("#inspector-text");
    Array.from(accolades).map((val) => {
        val.addEventListener("click", (e) => {
            inspector.style.top = `${scrollY}px`;
            inspector.classList.remove("hidden");
            document.body.classList.add("disable-scroll");
            inspectorImage.src = val.querySelector("img").src;
            inspectorText.innerText = val.querySelector("span").innerText;
        })
        return val;
    });

    document.querySelector(".close").addEventListener("click", (e) => {
        inspector.classList.add("hidden");
        document.body.classList.remove("disable-scroll");
    })
}

/**
 * Entry Point
 * @param {Event} e 
 */
function main(e) {
    parallaxScroller();
    smoothScrollToAnchor();
    scrollbackButton();
    accoladeInspector();
}

window.addEventListener("DOMContentLoaded", main);