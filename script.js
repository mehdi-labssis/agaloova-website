const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.navbar nav');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');

    if (nav.classList.contains('active')) {
        menuBtn.innerHTML = '✕';
    } else {
        menuBtn.innerHTML = '☰';
    }
});
/* =========================================
   AGALOOVA — GLOBAL IMAGE LIGHTBOX
   Works with:
   - Normal <img> images
   - CSS background-image
   - Images added later
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const lightbox = document.createElement("div");
    lightbox.className = "global-lightbox";

    lightbox.innerHTML = `
        <button class="global-lightbox-close" aria-label="Close">×</button>
        <img class="global-lightbox-image" src="" alt="">
    `;

    document.body.appendChild(lightbox);

    const fullImage = lightbox.querySelector(".global-lightbox-image");
    const closeButton = lightbox.querySelector(".global-lightbox-close");


    function openImage(src) {
        if (!src) return;

        fullImage.src = src;
        lightbox.classList.add("active");
        document.body.classList.add("lightbox-open");
    }


    function closeImage() {
        lightbox.classList.remove("active");
        document.body.classList.remove("lightbox-open");

        setTimeout(() => {
            fullImage.src = "";
        }, 250);
    }


    document.addEventListener("click", (event) => {

        if (event.target.closest(".global-lightbox")) {
            return;
        }

        const clickedImage = event.target.closest("img");

        if (clickedImage) {
            event.preventDefault();
            event.stopPropagation();

            openImage(
                clickedImage.currentSrc || clickedImage.src
            );

            return;
        }

        let element = event.target;

        while (
            element &&
            element !== document.body &&
            element !== document.documentElement
        ) {

            const styles = window.getComputedStyle(element);
            const backgroundImage = styles.backgroundImage;

            if (
                backgroundImage &&
                backgroundImage !== "none" &&
                backgroundImage.includes("url(")
            ) {

                const match = backgroundImage.match(
                    /url\(["']?(.*?)["']?\)/
                );

                if (match && match[1]) {
                    event.preventDefault();
                    event.stopPropagation();

                    openImage(match[1]);
                    return;
                }
            }

            element = element.parentElement;
        }

    }, true);


    closeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        closeImage();
    });


    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeImage();
        }
    });


    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            lightbox.classList.contains("active")
        ) {
            closeImage();
        }
    });

});