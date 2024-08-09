import firebase from '../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  collectionData,
} from 'firebase/firestore';

const newsCardWrapper = document.querySelectorAll('.news__card-wrapper');


export default class newsCard {
  constructor() {
    this.db = firebase.getFirestore();
    this.itemsPerPage = 9;
    this.loadedItems = 0;
  }

  async getTotalItems() {
    const allNews = query(
      collection(this.db, 'news'),
      where('price', '==', null)
    );

    const querySnapshot = await getDocs(allNews);
    return querySnapshot.size;
  }

  async loadCards() {
    const totalItems = await this.getTotalItems();

    const remainingItems = totalItems - this.loadedItems;
    const itemsToLoad = Math.min(remainingItems, this.itemsPerPage);

    if (itemsToLoad <= 0) {
      return;
    }

    const filterNews = query(
      collection(this.db, 'news'),
      where('price', '==', null),
      limit(itemsToLoad)
    );

    const querySnapshot = await getDocs(filterNews);
    const productArr = [];

    querySnapshot.forEach((doc) => {
      const product = doc.data();
      productArr.push(product);

      const { text, title, img } = product;
      let template = `
            <div class="news__card">
             <div class="news__card-img">
                <picture>
                  <source srcset="${img.webP}" type="image/webp">
                  <img src="${img.default}" alt="user-photo">
                </picture>     
            </div>
            <h5 class="news__card-title">${title}</h5>
            <h4 class="news__card-text">${text}</h4>
        
              <p class="news__card-link">Читать далее...</p>
            
            </div>`;
      newsCardWrapper.forEach((slide) => {
        slide.insertAdjacentHTML('beforeend', template);
      });
    });

    this.loadedItems += productArr.length;

    const buttonText = document.querySelector('.news__button-text');
    if (buttonText) {
      buttonText.textContent = `Еще ${remainingItems - itemsToLoad} новостей`;
    }
  }

  init() {
    this.loadCards();

    const newsButton = document.querySelector('.news__button');
    if (newsButton) {
      newsButton.addEventListener('click', async (e) => {
        e.preventDefault();
        await this.loadCards();
      });
    }
  }
}

const myNewsCard = new newsCard();
myNewsCard.init();
