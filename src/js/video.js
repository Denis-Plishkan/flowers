import app from './app';
import videoSwiper from './modules/swiper';
import videoCard from './modules/video/videoProducts';
import basket from './modules/basket';

let basketEl = basket();

const productVideo = new videoCard();

productVideo.loadCards();