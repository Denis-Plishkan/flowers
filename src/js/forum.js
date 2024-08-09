import app from './app';
import basket from './modules/basket';

let basketEl = basket();

const titles = document.querySelectorAll('.accordion__title');
const contents = document.querySelectorAll('.accordion__content');

titles.forEach((item) =>
  item.addEventListener('click', () => {
    const arrow = item.querySelector('.accordion__title svg');
    const activeContent = document.querySelector('#' + item.dataset.tab);

    if (activeContent.classList.contains('active')) {
      arrow.classList.remove('open');
      activeContent.classList.remove('active');
      item.classList.remove('active');
      activeContent.style.maxHeight = 0;
    } else {
      contents.forEach((element) => {
        element.classList.remove('active');
        element.style.maxHeight = 0;
      });

      titles.forEach((element) => element.classList.remove('active'));

      arrow.classList.add('open');
      item.classList.add('active');
      activeContent.classList.add('active');
      activeContent.style.maxHeight = '100%';
    }
  })
);