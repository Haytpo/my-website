const toggleBtn = document.getElementById('toggleBtn');
const leftScroll = document.querySelector('.left-scroll');
const contactSection = document.getElementById('contact-section');
const cardMenu = document.getElementById('card-menu');

toggleBtn.addEventListener('click', function() {
    leftScroll.classList.toggle('collapsed');
    contactSection.classList.toggle('expanded');
    toggleBtn.classList.toggle('shifted');

    // Меняем иконку
    if (leftScroll.classList.contains('collapsed')) {
        toggleBtn.textContent = '☰';
        toggleBtn.title = 'open menu'; // ← переместили сюда
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('active');
        });
    } else {
        toggleBtn.textContent = '✕';
        toggleBtn.title = 'close menu';
    }
});

// Функция для создания карточки
const createCard = (id, headerText, descriptionText) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.id = id;

    card.innerHTML = `
        <div class="card-header">
            ${headerText}
        </div>
        <div class="card-description">
            <div class="card-description-content">
                ${descriptionText}
            </div>
        </div>
    `;

    // Добавляем обработчик клика СРАЗУ при создании
    card.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
    });

    return card;
};

// Создаём 20 карточек
for (let i = 1; i <= 100; i++) {
    const card = createCard(
        `card-${i}`,
        `Карточка ${i}`,
        `Описание для карточки номер ${i}`
    );
    cardMenu.appendChild(card);
}

// Изменяем описание 16-й карточки
document.getElementById('card-16')
    .querySelector('.card-description-content')
    .textContent = "Новое описание для карточки 16";

document.getElementById('card-6')
    .querySelector('.card-description-content')
    .textContent = "text  text texttext  text texttext  text texttext  text texttext  text texttext " +
    " text texttext  text texttext  text texttext  text texttext  text texttext  text texttext  text text";