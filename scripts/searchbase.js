// Автоматически собираем названия птиц из birdData
const birdDatabase = Object.values(birdData).map(bird => bird.title);

const birdSearchInput = document.querySelector('.searcher .input');
const birdSuggestionsBox = document.querySelector('.suggestions');

if (birdSearchInput && birdSuggestionsBox) {
    birdSearchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();

        if (query.length === 0) {
            birdSuggestionsBox.style.display = 'none';
            birdSuggestionsBox.innerHTML = '';
            return;
        }

        const matches = birdDatabase.filter(item => item.toLowerCase().includes(query));

        // Сортируем: сначала те, что начинаются с query, потом остальные
        matches.sort((a, b) => {
            const aStarts = a.toLowerCase().startsWith(query);
            const bStarts = b.toLowerCase().startsWith(query);

            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;
            return 0;
        });

        if (matches.length > 0) {
            birdSuggestionsBox.innerHTML = matches.map(item => {
                const index = item.toLowerCase().indexOf(query);
                const before = item.substring(0, index);
                const match = item.substring(index, index + query.length);
                const after = item.substring(index + query.length);

                // Находим ID птицы по названию
                const birdId = Object.keys(birdData).find(id => birdData[id].title === item);

                return `<li class="suggestion-item" data-value="${item}" data-id="${birdId}">
                            ${before}<span class="highlight">${match}</span>${after}
                        </li>`;
            }).join('');

            birdSuggestionsBox.style.display = 'block';

            document.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', function() {
                    const value = this.getAttribute('data-value');
                    const birdId = this.getAttribute('data-id');

                    birdSearchInput.value = value;
                    birdSuggestionsBox.style.display = 'none';

                    console.log('Selected:', value, 'ID:', birdId);

                    // Переход на секцию news
                    const sections = document.querySelectorAll('.section');
                    const header = document.querySelector('.header');

                    sections.forEach(section => {
                        section.style.display = 'none';
                        section.classList.remove('active');
                    });

                    const newsSection = document.getElementById('news-section');
                    if (newsSection) {
                        newsSection.style.display = 'block';
                        setTimeout(() => {
                            newsSection.classList.add('active');
                        }, 10);
                    }

                    // Меняем фон
                    document.body.style.backgroundImage = "url('images/backorange.png')";
                    if (header) {
                        header.style.backgroundImage = "conic-gradient(from 225deg, #FF998ACC, #FF9A7D4D, #FF9A848C)";
                    }

                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            });
        } else {
            birdSuggestionsBox.style.display = 'none';
            birdSuggestionsBox.innerHTML = '';
        }
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.searcher')) {
            birdSuggestionsBox.style.display = 'none';
        }
    });
}