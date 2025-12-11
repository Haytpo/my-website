// ------------------------
function initSections() {
    const sections = document.querySelectorAll('.section');
    const buttons = document.querySelectorAll('.btn[data-target]');
    const header = document.querySelector('.header');

    const backgrounds = {
        'home-section': "url('images/backgreen.png')",
        'about-section': "url('images/backrose.png')",
        'contact-section': "url('images/backblue.png')",
        'news-section': "url('images/backorange.png')",
    };
    const headers = {
        'home-section': "conic-gradient(from 225deg, #11998ecc, #38ef7dcc, #589D8Ccc)",
        'about-section': "conic-gradient(from 225deg, #C7002FCC, #C900024D, #C800208C)",
        'contact-section': "conic-gradient(from 225deg, #00BCF1CC, #08B9FF4D, #00BBF88C)",
        'news-section': "conic-gradient(from 225deg, #FF998ACC, #FF9A7D4D, #FF9A848C)",
    };


    function showSection(targetId) {
        sections.forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        if (targetId === 'home-section') {
            targetSection.style.display = 'grid';
            targetSection.style.gridTemplateColumns = 'repeat(3, minmax(0, 1fr))';
        } else {
            targetSection.style.display = 'block';
        }

        setTimeout(() => {
            targetSection.classList.add('active');
        }, 10);

        if (backgrounds[targetId]) {
            document.body.style.backgroundImage = backgrounds[targetId];

        }
        if (header && headers[targetId]) {
            header.style.backgroundImage = headers[targetId];
        }
        if (backgrounds[targetId]) {
            document.body.style.backgroundImage = backgrounds[targetId];
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            showSection(targetId);
        });
    });

    showSection('home-section');
}
