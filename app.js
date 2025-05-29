const slideData = [
  { image: 'images/logan-weaver-lgnwvr--8RlkUaTFGI-unsplash.jpg', title: 'Strive' },
  { image: 'images/josh-duke-nPT1SULE1D8-unsplash.jpg', title: 'Endure' },
  { image: 'images/joshua-diaz-u2uEGjeHM78-unsplash.jpg', title: 'Conquer' },
  { image: 'images/alireza-skndari-xsuPqW8LePc-unsplash.jpg', title: 'Believe' },
  { image: 'images/andre-tan-olUHAoDG55E-unsplash.jpg', title: 'Achieve' },
  { image: 'images/sunday-ii-sunday-hF-sCNuiarc-unsplash.jpg', title: 'Persevere' },
  { image: 'images/sunday-ii-sunday-z1uWXbhI1R0-unsplash.jpg', title: 'Excel' }
];

let currentIndex = 0;

function createSlides(container, data) {
  container.innerHTML = '';
  data.forEach(({ image, title }, index) => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.style.backgroundImage = `url('${image}')`;
    slide.setAttribute('role', 'tabpanel');
    slide.setAttribute('aria-selected', 'false');
    slide.setAttribute('tabindex', '0');
    slide.setAttribute('id', `slide-${index}`);
    slide.setAttribute('aria-label', title);

    slide.innerHTML = `<h3>${title}</h3>`;

    // При клике делаем слайд активным
    slide.addEventListener('click', () => {
      showSlide(index);
    });

    // При нажатии Enter или Пробела тоже делаем активным
    slide.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showSlide(index);
      }
    });

    container.appendChild(slide);
  });
}

function createPagination(paginationContainer, count, onSelect) {
  paginationContainer.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('button');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-selected', 'false');
    dot.setAttribute('aria-controls', `slide-${i}`);
    dot.addEventListener('click', () => onSelect(i));
    paginationContainer.appendChild(dot);
  }
  updatePagination(currentIndex);
}

function updatePagination(index) {
  const dots = document.querySelectorAll('.pagination button');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
    dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
  });
}

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    slide.setAttribute('aria-selected', i === index ? 'true' : 'false');
  });
  // Плавно скроллим к активному слайду
  slides[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });

  updatePagination(index);
  currentIndex = index;
}

function addNavListeners() {
  document.querySelector('.prev').addEventListener('click', () => {
    showSlide(currentIndex - 1);
  });

  document.querySelector('.next').addEventListener('click', () => {
    showSlide(currentIndex + 1);
  });
}

function addSwipeSupport(element, onSwipeLeft, onSwipeRight) {
  let touchStartX = null;

  element.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  element.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchStartX !== null) {
      const diff = touchEndX - touchStartX;
      if (diff > 50) {
        onSwipeRight();
      } else if (diff < -50) {
        onSwipeLeft();
      }
      touchStartX = null;
    }
  });
}

function addKeyboardListeners() {
  window.addEventListener('keydown', e => {
    switch (e.key) {
      case 'ArrowLeft':
        showSlide(currentIndex - 1);
        break;
      case 'ArrowRight':
        showSlide(currentIndex + 1);
        break;
      case 'Enter':
      case ' ':
        const activeSlide = document.querySelector('.slide.active');
        if (activeSlide) {
          activeSlide.focus();
        }
        break;
    }
  });
}

function initSlider() {
  const container = document.querySelector('.container');
  const paginationContainer = document.querySelector('.pagination');

  createSlides(container, slideData);
  createPagination(paginationContainer, slideData.length, showSlide);
  addNavListeners();
  addSwipeSupport(document.body, () => showSlide(currentIndex + 1), () => showSlide(currentIndex - 1));
  addKeyboardListeners();

  showSlide(currentIndex);
}

// Запуск
initSlider();