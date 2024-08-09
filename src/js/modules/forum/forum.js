import firebase from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
const forumCardWrapper = document.querySelectorAll('.forum__card-wrapper');

export default class forumCard {
  constructor() {
    this.db = firebase.getFirestore();
  }
  async loadCards() {
    const forumPhoto = query(
      collection(this.db, 'forum'),
      where('title', '!=', null)
    );

    const querySnapshot = await getDocs(forumPhoto);
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const { text, title, img } = product;
      let template = `
            <div class="forum__card">
                <div class="forum__card-top">
                    <div class="forum__card-img">
                      <picture>
                        <source srcset="${img.webP}" type="image/webp">
                        <img src="${img.default}" alt="flowers" />
                      </picture>     
                    </div>
                </div>
                <div class="forum__card-bottom">
                    <h4 class="forum__card-title">${title}</h4>
                    <p class="forum__card-text">${text}</p>
                </div>
            </div>`;
            forumCardWrapper.forEach((slide) => {
        slide.insertAdjacentHTML('beforeend', template);
      });
    });
  }
}