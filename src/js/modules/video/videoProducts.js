
import firebase from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const videoCardWrapper = document.querySelectorAll('.video__card-wrapper');

export default class VideoCard {
  constructor() {
    this.db = firebase.getFirestore();
    this.currentlyOpenVideo = null;
    this.previewContent = null;
  }

  async loadCards() {
    const filterVideo = query(
      collection(this.db, 'video'),
      where('name', '!=', null)
    );

    const querySnapshot = await getDocs(filterVideo);
    const videoCardsWrapperArray = Array.from(videoCardWrapper);

    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const { data, link, img, name } = product;
      let template = `
        <div class="video__card" data-link="${link}">
          <div class="video__card-img">
            <picture>
              <source srcset="${img.webP}" type="image/webp">
              <img src="${img.default}" alt="video" />
            </picture>
            <div class="video__card-play">
              <svg ><use xlink:href="./images/Sprite.svg#review-play"></use></svg>    
            </div>
          </div>
          <p class="video__card-data">${data}</p>
          <h4 class="video__card-name">Видео отзыв <br /> ${name}</h4>
        </div>`;

      videoCardsWrapperArray.forEach((slide) => {
        slide.insertAdjacentHTML('beforeend', template);
      });
    });

    const videoCards = document.querySelectorAll('.video__card');
    videoCards.forEach((videoCard) => {
      videoCard.addEventListener('click', () => {
        const cardLink = videoCard.getAttribute('data-link');
        const youTubeLink = cardLink.split('/');
        const youTubeId = youTubeLink[youTubeLink.length - 1];

        const youTubeIdSplit = youTubeId.split('=');
        const youTubeIdLink = youTubeIdSplit[youTubeIdSplit.length - 1];
        const videoLink = `https://www.youtube.com/embed/${youTubeIdLink}`;

        const cardContent = videoCard.querySelector('.video__card-img');

        if (this.currentlyOpenVideo !== null) {
          const otherVideoIframe = this.currentlyOpenVideo.querySelector('iframe');
          if (otherVideoIframe) {
            otherVideoIframe.src = '';
          }
          this.currentlyOpenVideo.querySelector('.video__card-img').innerHTML = this.previewContent;
        }

        this.previewContent = cardContent.innerHTML;

        cardContent.innerHTML = `<iframe 
          width="303" 
          height="322" 
          src="${videoLink}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>`;

        this.currentlyOpenVideo = videoCard;
      });
    });
  }
}