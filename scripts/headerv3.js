const header = document.getElementById('header');
const headerOffset = 0; // Сразу начинает работать

window.addEventListener('scroll', function() {
    if (window.pageYOffset > headerOffset) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});


