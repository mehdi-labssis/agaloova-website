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