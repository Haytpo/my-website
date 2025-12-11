const header = document.getElementById('header');
const headerOffset = 20; // Порог прокрутки в пикселях

window.addEventListener('scroll', function() {
    if (window.pageYOffset > headerOffset) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Плавная прокрутка к секциям (опционально)
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        const section = document.getElementById(target);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});