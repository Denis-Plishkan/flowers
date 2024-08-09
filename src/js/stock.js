import app from './app';
import Menu from './modules/stock/left-menu';
import basket from './modules/basket';
import productLike from "./modules/like/like";

class Stock {
  constructor() {
    this.menuLeft = document.querySelector('.left-menu');
    this.itemsFiler = document.querySelectorAll('.left-menu__item');
    this.itemsSortAdaptive = document.querySelectorAll('.sort-adaptive__main');
    this.leftMenuBtn = document.querySelector('.button-for-left-menu');
    this.exitApativeLeftMenu = document.querySelector(
      '.left-menu__adaptive-back'
    );
    this.menu = new Menu();
    this.adaptiveFilter();
    this.tabsFilter();
    this.tabsSortAdaptive();
  }
  async adaptiveFilter() {
    this.leftMenuBtn.addEventListener('click', () => {
      this.menuLeft.classList.add('left-menu_active');
      document.body.style.overflow = 'hidden';
    });
    this.exitApativeLeftMenu.addEventListener('click', () => {
      this.menuLeft.classList.remove('left-menu_active');

      document.body.style.overflow = 'auto';
    });
  }
  async tabsFilter() {
    function removeActive(el) {
      document.querySelectorAll('.left-menu__title_active').forEach((item) => {
        const title = item.querySelector('.left-menu__title');
        if (el !== title) {
          item.classList.remove('left-menu__title_active');
        }
      });
    }
    this.itemsFiler.forEach((item) => {
      const title = item.querySelector('.left-menu__title');
      title.addEventListener('click', (e) => {
        removeActive(e.target);
        item.classList.toggle('left-menu__title_active');
      });
    });
  }

  async tabsSortAdaptive() {
    const menu = this.menu;
    const menuLeft = this.menuLeft;
    this.itemsSortAdaptive.forEach((item) => {
      item
        .querySelector('.sort-adaptive__btn')
        .addEventListener('click', () => {
          menuLeft.classList.add('left-menu_sort-active');
          item.classList.add('sort-adaptive__main_active');
          item.querySelectorAll('.sort-adaptive__point').forEach((point) => {
            point.addEventListener('click', () => {
              item.querySelector('.sort-adaptive__info').innerHTML =
                point.textContent;
              remove(item);
              menu.update();
            });
          });
        });
      window.addEventListener('click', (e) => {
        if (!document.querySelector('.sort-adaptive').contains(e.target)) {
          remove(item);
        }
      });
    });
    function remove(item) {
      menuLeft.classList.remove('left-menu_sort-active');
      item.classList.remove('sort-adaptive__main_active');
    }
  }
}

const catalog = new Stock();

setTimeout(() => {
  basket();
  productLike();
}, 1000);

