import firebase from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
const reviewsCardWrapper = document.querySelectorAll('.reviews__card-wrapper');

export default class reviewsCard {
  constructor() {
    this.db = firebase.getFirestore();
  }
  async loadCards() {
    const reviewsPhoto = query(
      collection(this.db, 'reviews'),
      where('name', '!=', null)
    );

    const querySnapshot = await getDocs(reviewsPhoto);
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const { text, data, img , name} = product;
      let template = `
      <div class="reviews__card">
      <div class="reviews__user-info">
        <div class="reviews__user-photo">
          <picture>
            <source srcset="${img.webP}" type="image/webp">
            <img src="${img.default}" alt="user" />
          </picture>        
        </div>
        <p class="reviews__user-name">${name}</p>
      </div>
      <p class="reviews__user-text">${text}</p>
        <div class="reviews__all-reviews">
          <p>Весь отзыв</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="12"
            viewBox="0 0 7 12"
            fill="none"
          >
            <path
              d="M1.00012 11L5.58496 6L1.00012 1"
              stroke="#BDBDBD"
              stroke-width="1.5"
            />
          </svg>
        </div>
      <div class="reviews__stars-data">
        <svg>
          <use xlink:href="./images/Sprite.svg#product-card-stars"></use>
        </svg>
        <p>${data}</p>
      </div>
    </div>`;
            reviewsCardWrapper.forEach((slide) => {
        slide.insertAdjacentHTML('beforeend', template);
      });
    });
  }
}


