const header = document.getElementById('header');
const headerButtons = document.querySelector('.header-buttons');
const btnHideLeft = document.querySelector('.btn-hide-on-scroll');
const searcher = document.querySelector('.searcher');
const headerOffset = 8;

window.addEventListener('scroll', function() {
    if (window.pageYOffset > headerOffset) {
        header.classList.add('sticky');
        headerButtons.classList.add('sticky');
        searcher.classList.add('sticky');
        if (searchInput) {
            searchInput.classList.add('sticky');
        }
        btnHideLeft.classList.add('hidden');
    } else {
        header.classList.remove('sticky');
        headerButtons.classList.remove('sticky');
        searcher.classList.remove('sticky');
        if (searchInput) {
            searchInput.classList.remove('sticky');
        }
        btnHideLeft.classList.remove('hidden');
    }
});
//////////////SEARCHER///////////////////////

const searchInput = document.querySelector('.searcher .input');
const suggestionsList = document.querySelector('.searcher .suggestions');

searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() !== '') {
        // Если что-то введено — показываем подсказки
        suggestionsList.style.display = 'block';
    } else {
        // Если поле пустое — скрываем
        suggestionsList.style.display = 'none';
    }
});


