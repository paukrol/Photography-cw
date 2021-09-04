'use strict';

// Hidden / unhidden search icon
const search = document.querySelectorAll('.menu__item--search');

search.forEach((s) => {
  s.addEventListener('click', (e) => {
    e.currentTarget.classList.add('active');
    console.log(e.currentTarget);
  });
});

document.addEventListener('click', (e) => {
  search.forEach((s) => {
    if (e.target.closest('.menu__item--search')) return;
    s.classList.remove('active');
  });
});

document.addEventListener('keydown', (e) => {
  search.forEach((s) => {
    if (e.key === 'Escape') s.classList.remove('active');
  });
});

// /////////////////////////////////////////////////////////////
// // Slider header

// const headerSlides = document.querySelectorAll('.header__slide');
// const circlesHeaderWrapper = document.querySelector('.circles--header');
// let curSlide = 0;
// const maxSlide = headerSlides.length;

// const goToSlide = function (slide) {
//   headerSlides.forEach((el, i) => {
//     el.style.transform = `translateX(${(i - slide) * 100}%)`;
//   });
// };
// goToSlide(0);

// const createCircle = function () {
//   headerSlides.forEach((_, i) => {
//     circlesHeaderWrapper.insertAdjacentHTML(
//       'beforeend',
//       `<div class="circles__circle" data-circle="${i}"></div>`
//     );
//   });
// };
// createCircle();

// // Activate dot
// const activateDot = function (slide) {
//   document
//     .querySelectorAll('.circles__circle')
//     .forEach((dot) => dot.classList.remove('circles__circle--active'));

//   document
//     .querySelector(`.circles__circle[data-circle="${slide}"`)
//     .classList.add('circles__circle--active');
// };
// activateDot(0);

// // Next slide
// const nextSlide = function () {
//   if (curSlide === maxSlide - 1) {
//     curSlide = 0;
//   } else {
//     curSlide++;
//   }

//   goToSlide(curSlide);
//   activateDot(curSlide);
// };

// const slideAfter5Sec = setInterval(nextSlide, 5000);

// circlesHeaderWrapper.addEventListener('click', (e) => {
//   if (!e.target.classList.contains('circles__circle')) return;
//   clearInterval(slideAfter5Sec);

//   activateDot(e.target.dataset.circle);
//   goToSlide(e.target.dataset.circle);
// });

//////////////////////////////////////////////////////////////
// Gallery - image click
const galleryContainer = document.querySelectorAll('.gallery__wrapper');
const overlay = document.querySelector('.overlay');

galleryContainer.forEach((el) => {
  el.addEventListener('click', (e) => {
    if (!e.target.closest('.gallery__image')) return;

    overlay.classList.add('overlay--active');

    overlay.insertAdjacentHTML(
      'beforeend',
      `<div class="modal__image">
      <img class="modal__img"/>
    </div>`
    );

    document
      .querySelector('.modal__img')
      .setAttribute('src', e.target.getAttribute('src'));
  });
});

const removeModal = function () {
  if (!document.querySelector('.modal__image')) return;
  document.querySelector('.modal__image').remove();
  overlay.classList.remove('overlay--active');
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') removeModal();
});

overlay.addEventListener('click', () => removeModal());

///////////////////////////////////////////////////////
// Video

const play = document.querySelector('.video-container__icon');
const mainVideo = document.querySelector('.video-container__img');

const displayBlock = () => (play.style.display = 'block');
const displayNone = () => (play.style.display = 'none');

play.addEventListener('click', (e) => {
  const cls = play.classList[2];

  if (cls === 'fa-play') {
    e.target.classList.remove('fa-play');
    e.target.classList.add('fa-pause');
    mainVideo.play();
    e.target.style.display = 'none';
  } else {
    e.target.classList.remove('fa-pause');
    e.target.classList.add('fa-play');
    mainVideo.pause();
    e.target.style.display = 'block';
  }

  mainVideo
    .closest('.video-container__image')
    .addEventListener('mouseover', displayBlock);

  mainVideo
    .closest('.video-container__image')
    .addEventListener('mouseout', displayNone);
});

mainVideo.addEventListener('ended', () => {
  play.classList.remove('fa-pause');
  play.classList.add('fa-play');
  displayBlock();

  mainVideo
    .closest('.video-container__image')
    .removeEventListener('mouseover', displayBlock);

  mainVideo
    .closest('.video-container__image')
    .removeEventListener('mouseout', displayNone);
});

document.addEventListener('keydown', (e) => {
  e.preventDefault();
  if (e.key === ' ') {
    if (mainVideo.paused) {
      mainVideo.play();

      play.classList.remove('fa-play');
      play.classList.add('fa-pause');
      mainVideo.play();
      play.style.display = 'none';
    } else {
      mainVideo.pause();
      play.classList.remove('fa-pause');
      play.classList.add('fa-play');

      play.style.display = 'block';
    }
  }
});

////////////////////////////////////////////////////////////
// Sliders

const headerSlides = document.querySelectorAll('.header__slide');
const gallerySlides = document.querySelectorAll('.gallery__wrapper');

const circlesHeaderWrapper = document.querySelector('.circles--header');
const circlesGalleryWrapper = document.querySelector('.circles--gallery');

const circleHeaderClass = 'circles__circle--header';
const circleGalleryClass = 'circles__circle--gallery';

let curSlide = 0;
const maxSlide = headerSlides.length;

// Function
const goToSlide = function (slidesContainer, slide) {
  slidesContainer.forEach((el, i) => {
    el.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};

const createCircle = function (slidesContainer, dotsWrapper, cls) {
  slidesContainer.forEach((_, i) => {
    dotsWrapper.insertAdjacentHTML(
      'beforeend',
      `<div class="circles__circle ${cls}" data-circle="${i}"></div>`
    );
  });
};

const activateDot = function (dotsWrapper, type, slide) {
  dotsWrapper.forEach((dot) => dot.classList.remove('circles__circle--active'));

  document
    .querySelector(`.circles__circle--${type}[data-circle="${slide}"`)
    .classList.add('circles__circle--active');
};

// Header
const headerInit = function () {
  goToSlide(headerSlides, 0);
  createCircle(headerSlides, circlesHeaderWrapper, circleHeaderClass);

  const circleHeader = document.querySelectorAll('.circles__circle--header');

  activateDot(circleHeader, 'header', 0);

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(headerSlides, curSlide);
    activateDot(circleHeader, 'header', curSlide);
  };

  const slideAfter5Sec = setInterval(nextSlide, 5000);

  circlesHeaderWrapper.addEventListener('click', (e) => {
    if (!e.target.classList.contains(circleHeaderClass)) return;
    clearInterval(slideAfter5Sec);

    activateDot(circleHeader, 'header', e.target.dataset.circle);
    goToSlide(headerSlides, e.target.dataset.circle);
  });
};

headerInit();

// Gallery
const galleryInit = function () {
  goToSlide(gallerySlides, 0);
  createCircle(gallerySlides, circlesGalleryWrapper, circleGalleryClass);

  const circleGallery = document.querySelectorAll('.circles__circle--gallery');

  activateDot(circleGallery, 'gallery', 0);

  circlesGalleryWrapper.addEventListener('click', (e) => {
    if (!e.target.classList.contains(circleGalleryClass)) return;

    activateDot(circleGallery, 'gallery', e.target.dataset.circle);
    goToSlide(gallerySlides, e.target.dataset.circle);
  });
};

galleryInit();
