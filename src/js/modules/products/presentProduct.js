import firebase from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const presentCardWrapper = document.querySelectorAll('.present__wrapper');

export default class productsStock {
  constructor() {
    this.db = firebase.getFirestore();
    this.smallWidth = false;
    this.bigWidth = false;
    this.productsArray = [];
  }

  async loadCards() {
    const filterPresent = query(
      collection(this.db, 'products'),
      where('present', '==', '')
    );

    const querySnapshot = await getDocs(filterPresent);
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      this.productsArray.push(product);
    });

    window.addEventListener('resize', () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 768 && !this.smallWidth) {
        this.smallWidth = true;
        this.bigWidth = false;
        this.renderProducts();
      } else if (screenWidth >= 768 && !this.bigWidth) {
        this.bigWidth = true;
        this.smallWidth = false;
        this.renderProducts();
      }
    });

    this.renderProducts();
  }

  renderProducts() {
    const screenWidth = window.innerWidth;
    const productArr =
      screenWidth < 768 ? this.productsArray.slice(0, 4) : this.productsArray;

    presentCardWrapper.forEach((slide) => {
      slide.innerHTML = '';
    });

    productArr.forEach((product) => {
      const { name, stars, price, img, id } = product;

      let star = '';
      for (let i = 0; i < stars; i++) {
        star += `<path d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z" fill="#F8E582"/>`;
      }

      let template = `
            <div data-id='${id}' class="product-card">
            <div class="product-card__top">
                <div class="product-card__img">
                  <picture>
                    <source srcset="${img.webP}" type="image/webp">
                    <img src="${img.default}" alt="flowers">
                  </picture>
                </div>
                <div class="product-card__top-like">
                  <svg ><use xlink:href="./images/Sprite.svg#product-card-like"></use></svg>
                    <div class="product-card__top-like_active">
                      <svg ><use xlink:href="./images/Sprite.svg#product-card-like_active"></use></svg>
                    </div>
                </div>
                <div class="product-card__top-sign">
                    TOP
                </div>
            </div>
            <div class="product-card__bottom">
                <div class="product-card__bottom-stars">
                `;
            for (let i = 0; i < stars; i++) {
              template += `
                    <img src="./images/main/stock/Star.svg" alt="star">`;
            }
            template += `
                </div>
                <div class="product-card__bottom-name-price">
                    <div class="product-card__bottom-name">
                        ${name}
                    </div>
                    <div class="product-card__bottom-prices">
                        <div class="product-card__bottom-price">${price} грн</div>
                    </div>
                </div>
                <div class="product-card__bottom-buttons">
                <a href="#" class="product-card__bottom-button-desktop">
                        Заказать
                        <img src="./images/main/stock/button-branch.png" alt="button-branch">
                    </a>
                <a href="#">
                    <div class="product-card__bottom-button-mobile">
                        <img src="./images/main/stock/button-mobile.png" alt="button-branch">
                    </div>
                </a>
                <a href="./product-card.html?id=${id}">
                    <div class="product-card__bottom-order">Быстрый заказ</div>
                </a>
                </div>
            </div>
        </div>`;

      presentCardWrapper.forEach((slide) => {
        slide.insertAdjacentHTML('beforeend', template);
      });
    });
  }
}
