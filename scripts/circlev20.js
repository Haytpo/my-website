const birdData = {
    1: {
        title: "Chinese Egret",
        subtitle: "Rare coastal wading bird",
        description: "The Chinese Egret is a threatened species of egret from eastern Asia. Standing about 68 cm tall, this elegant white bird is distinguished by its yellow bill and legs during breeding season. It feeds on fish, crustaceans, and mollusks in coastal wetlands and tidal flats. Conservation efforts are crucial as their population continues to decline due to habitat loss.",
        stats: {
            "Habitat": "Coastal wetlands",
            "Size": "65-68 cm",
            "Diet": "Fish & crustaceans",
            "Status": "Vulnerable"
        }
    },
    2: {
        title: "Lapwing",
        image: "images/lapwing.png",
        subtitle: "Crested, noisy ground bird",
        description: "The Northern Lapwing is known for its distinctive wispy crest and brilliant iridescent plumage. These vocal birds are famous for their acrobatic display flights and loud 'peewit' calls. They nest on the ground in farmland and wetlands, and are excellent at defending their territory against predators with dramatic swooping dives.",
        stats: {
            "Habitat": "Farmland & wetlands",
            "Size": "28-31 cm",
            "Diet": "Insects & worms",
            "Call": "Distinctive 'peewit'"
        }
    },
    3: {
        title: "Colibri (Hummingbird)",
        subtitle: "World's smallest bird",
        description: "Hummingbirds are nature's aerial acrobats, capable of hovering in place and even flying backwards. With wings beating up to 80 times per second, they can hover while feeding on nectar. Their incredibly fast metabolism requires them to eat every 10-15 minutes, consuming up to half their body weight in sugar daily.",
        stats: {
            "Habitat": "Gardens & forests",
            "Size": "7.5-13 cm",
            "Diet": "Nectar & insects",
            "Wingbeat": "50-80 per second"
        }
    },
    4: {
        title: "Crested Seriema",
        subtitle: "Long-legged ground bird",
        description: "The Red-legged Seriema is a large, mostly terrestrial bird found in grasslands of South America. Standing up to 90 cm tall, it has a distinctive crest of feathers on its head. These birds are known for their powerful kick, which they use to kill prey like snakes and lizards. They prefer to run rather than fly when escaping danger.",
        stats: {
            "Habitat": "South American grasslands",
            "Size": "75-90 cm",
            "Diet": "Snakes & small animals",
            "Speed": "Prefers running"
        }
    },
    5: {
        title: "Tree Swallow",
        subtitle: "Graceful blue and white flier",
        description: "Tree Swallows are iridescent blue-green above and white below, performing graceful aerial maneuvers while catching insects mid-flight. They nest in tree cavities or nest boxes near water. These social birds often gather in large flocks during migration, sometimes numbering in the thousands. They're beneficial for pest control, consuming vast quantities of flying insects.",
        stats: {
            "Habitat": "Near water & fields",
            "Size": "12-14 cm",
            "Diet": "Flying insects",
            "Migration": "Long-distance"
        }
    },
    6: {
        title: "Nightjar",
        subtitle: "Moth-catching night flyer",
        description: "Nightjars are nocturnal birds with cryptic plumage that provides excellent camouflage during the day. They have large eyes adapted for night vision and wide mouths surrounded by bristles that help them catch flying insects. Their call, a distinctive churring sound, can be heard at dusk. They nest directly on the ground, relying on camouflage for protection.",
        stats: {
            "Habitat": "Open woodlands",
            "Size": "24-28 cm",
            "Diet": "Moths & beetles",
            "Active": "Nocturnal"
        }
    },
    7: {
        title: "Black Vulture",
        subtitle: "Scavenger with superb eyesight",
        description: "Black Vultures are highly social birds that roost and feed in large groups. With exceptional eyesight, they can spot carrion from great heights. Unlike many vultures, they have a relatively weak sense of smell and often follow Turkey Vultures to food sources. These intelligent birds play a crucial role in ecosystems by cleaning up dead animals and preventing disease spread.",
        stats: {
            "Habitat": "Open areas",
            "Size": "56-74 cm",
            "Diet": "Carrion",
            "Social": "Highly gregarious"
        }
    },
    8: {
        title: "Greater Roadrunner",
        subtitle: "Iconic running desert bird",
        description: "The Greater Roadrunner is a fast-running ground cuckoo that can reach speeds of 26 mph (42 km/h). Native to southwestern United States and Mexico, this distinctive bird with its long tail and shaggy crest is adapted to desert life. It's an opportunistic predator, feeding on everything from insects to small snakes, and can even catch and eat rattlesnakes.",
        stats: {
            "Habitat": "Desert & scrubland",
            "Size": "50-62 cm",
            "Diet": "Snakes & lizards",
            "Speed": "Up to 42 km/h"
        }
    }
};

const wrapper = document.getElementById('wheelWrapper');
const wheel = document.getElementById('wheel');
const items = document.querySelectorAll('.item');
const infoContent = document.getElementById('infoContent');

let isDown = false;
let startX;
let scrollLeft;
let velocity = 0;
let lastScrollLeft = 0;
let animationId;
let snapTimeout;

// Mouse dragging
wrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
    cancelMomentum();
});

wrapper.addEventListener('mouseleave', () => {
    if (isDown) {
        isDown = false;
        applyMomentum();
    }
});

wrapper.addEventListener('mouseup', () => {
    if (isDown) {
        isDown = false;
        applyMomentum();
    }
});

wrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 2;
    const newScrollLeft = scrollLeft - walk;

    velocity = wrapper.scrollLeft - lastScrollLeft;
    lastScrollLeft = wrapper.scrollLeft;

    wrapper.scrollLeft = newScrollLeft;
});

// Touch support
let touchStartX = 0;
let touchStartScrollLeft = 0;
let isTouchScrolling = false;
let touchMoveCount = 0;


wrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX;
    touchStartScrollLeft = wrapper.scrollLeft;
    isTouchScrolling = false;
    touchMoveCount = 0;
    cancelMomentum();
});

wrapper.addEventListener('touchmove', (e) => {
    touchMoveCount++;
    isTouchScrolling = true;

    const touchX = e.touches[0].pageX;
    const walk = (touchStartX - touchX) * 1.5;

    velocity = wrapper.scrollLeft - lastScrollLeft;
    lastScrollLeft = wrapper.scrollLeft;

    wrapper.scrollLeft = touchStartScrollLeft + walk;
});

wrapper.addEventListener('touchend', () => {
    if (isTouchScrolling && touchMoveCount > 3) {
        applyMomentum();
    }
    isTouchScrolling = false;
});

// Momentum scrolling
function applyMomentum() {
    cancelMomentum();

    function momentum() {
        if (Math.abs(velocity) > 0.5) {
            wrapper.scrollLeft += velocity;
            velocity *= 0.95;
            animationId = requestAnimationFrame(momentum);
        } else {
            setTimeout(() => {
                snapToNearest();
            }, 200);
        }
    }

    momentum();
}

function cancelMomentum() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    velocity = 0;
}

// Snap to nearest
function snapToNearest() {
    const containerCenter = wrapper.offsetWidth / 2;
    let closest = null;
    let minDistance = Infinity;

    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const wrapperRect = wrapper.getBoundingClientRect();
        const itemCenter = rect.left - wrapperRect.left + rect.width / 2;
        const distance = Math.abs(itemCenter - containerCenter);

        if (distance < minDistance) {
            minDistance = distance;
            closest = item;
        }
    });

    if (closest) {
        const rect = closest.getBoundingClientRect();
        const wrapperRect = wrapper.getBoundingClientRect();
        const itemCenter = rect.left - wrapperRect.left + rect.width / 2;
        const scrollTo = wrapper.scrollLeft + itemCenter - containerCenter;

        wrapper.scrollTo({
            left: scrollTo,
            behavior: 'smooth'
        });
    }
}

// Update active item and info panel
let currentActiveBirdId = null;
wrapper.addEventListener('scroll', updateActive);

function updateActive() {
    const containerCenter = wrapper.offsetWidth / 2;
    let closestItem = null;
    let minDistance = Infinity;

    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const wrapperRect = wrapper.getBoundingClientRect();
        const itemCenterX = rect.left - wrapperRect.left + rect.width / 2;
        const distance = Math.abs(itemCenterX - containerCenter);

        if (distance < minDistance) {
            minDistance = distance;
            closestItem = item;
        }
    });

    if (!closestItem) return;

    items.forEach(item => {
        item.classList.remove('active', 'near', 'far');
    });

    closestItem.classList.add('active');

    const activeIndex = Array.from(items).indexOf(closestItem);

    if (activeIndex > 0) {
        items[activeIndex - 1].classList.add('near');
    }
    if (activeIndex < items.length - 1) {
        items[activeIndex + 1].classList.add('near');
    }

    items.forEach((item, i) => {
        if (i !== activeIndex && i !== activeIndex - 1 && i !== activeIndex + 1) {
            item.classList.add('far');
        }
    });

    // Update info panel only if bird changed
    const newBirdId = closestItem.getAttribute('data-id');
    if (currentActiveBirdId !== newBirdId) {
        currentActiveBirdId = newBirdId;
        updateInfoPanel(closestItem);
    }
}

// Navigation buttons
const btnLeft = document.querySelector('.btn-l');
const btnRight = document.querySelector('.btn-r');

if (btnLeft) {
    btnLeft.addEventListener('click', () => {
        navigateCarousel('prev');
    });
}

if (btnRight) {
    btnRight.addEventListener('click', () => {
        navigateCarousel('next');
    });
}

function navigateCarousel(direction) {
    const activeIndex = Array.from(items).findIndex(item => item.classList.contains('active'));
    let targetIndex;

    if (direction === 'prev') {
        targetIndex = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
    } else {
        targetIndex = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
    }

    const targetItem = items[targetIndex];
    const rect = targetItem.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    const itemCenter = rect.left - wrapperRect.left + rect.width / 2;
    const containerCenter = wrapper.offsetWidth / 2;
    const scrollTo = wrapper.scrollLeft + itemCenter - containerCenter;

    wrapper.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
    });

    // Scroll to info panel after animation
    setTimeout(() => {
        scrollToInfoPanel();
    }, 400);
}

function updateInfoPanel(item) {
    const birdId = item.getAttribute('data-id');
    const bird = birdData[birdId];

    if (!bird) return;

    // Trigger re-animation
    infoContent.style.animation = 'none';
    setTimeout(() => {
        infoContent.style.animation = 'fadeInUp 0.5s ease forwards';
    }, 10);

    // Update image with fallback
    const imageSrc = bird.image || item.querySelector('img').src;
    document.getElementById('infoBirdImage').src = imageSrc;

    document.getElementById('infoBirdTitle').textContent = bird.title;
    document.getElementById('infoBirdSubtitle').textContent = bird.subtitle;
    document.getElementById('infoBirdDescription').textContent = bird.description;

    // Update stats
    const statsContainer = document.getElementById('infoStats');
    statsContainer.innerHTML = '';

    Object.entries(bird.stats).forEach(([label, value]) => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        statItem.innerHTML = `
            <div class="stat-label">${label}</div>
            <div class="stat-value">${value}</div>
        `;
        statsContainer.appendChild(statItem);
    });
}

// Snap on scroll stop
wrapper.addEventListener('scroll', () => {
    clearTimeout(snapTimeout);
    snapTimeout = setTimeout(() => {
        if (!isDown && velocity === 0) {
            snapToNearest();
        }
    }, 150);
});

// Initialize
updateActive();

// Click to select
items.forEach(item => {
    item.addEventListener('click', (e) => {
        if (Math.abs(velocity) > 0.5) return;

        const rect = item.getBoundingClientRect();
        const wrapperRect = wrapper.getBoundingClientRect();
        const itemCenter = rect.left - wrapperRect.left + rect.width / 2;
        const containerCenter = wrapper.offsetWidth / 2;

        if (item.classList.contains('active')) {
            // If already active, scroll to show info panel
            scrollToInfoPanel();
            return;
        }

        const scrollTo = wrapper.scrollLeft + itemCenter - containerCenter;

        wrapper.scrollTo({
            left: scrollTo,
            behavior: 'smooth'
        });

        // Scroll to info panel after carousel animation
        setTimeout(() => {
            scrollToInfoPanel();
        }, 400);
    });
});
let scrolledOnce = false;

function scrollToInfoPanel() {
    if (scrolledOnce) return;
    scrolledOnce = true;

    const infoPanel = document.getElementById('infoPanel');
    const infoPanelRect = infoPanel.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const scrollAmount = infoPanelRect.bottom - windowHeight + 30;

    if (scrollAmount > 0) {
        window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
}
////////////////////////////////PANEL
// Функция для создания карточки
const panel3 = document.getElementById('panel3');
const toggleBtn3 = document.getElementById('toggleBtn3');
const cardMenu3 = document.getElementById('cardMenu3');
let isOpen3 = false;

// Переключение панели
toggleBtn3.addEventListener('click', () => {
    isOpen3 = !isOpen3;

    if (isOpen3) {
        panel3.classList.add('open3');
        toggleBtn3.classList.add('open3');
        toggleBtn3.innerHTML = '✕';
    } else {
        panel3.classList.remove('open3');
        toggleBtn3.classList.remove('open3');
        toggleBtn3.innerHTML = '☰';
    }
});

// Функция для создания карточки
const createCard3 = (id, headerText, descriptionText) => {
    const card = document.createElement('div');
    card.className = 'card3';
    card.id = id;

    card.innerHTML = `
                <div class="card-header3">
                    ${headerText}
                </div>
                <div class="card-description3">
                    <div class="card-description-content3">
                        ${descriptionText}
                    </div>
                </div>
            `;

    // Добавляем обработчик клика СРАЗУ при создании
    card.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active3');
    });

    return card;
};

// Создаём 20 карточек
for (let i = 1; i <= 20; i++) {
    const card = createCard3(
        `card3-${i}`,
        `Section № ${i}`,
        `Description ${i}. Heres can be pasted any info, whatever You need.`
    );
    cardMenu3.appendChild(card);
}