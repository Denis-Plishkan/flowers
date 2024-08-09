import app from './app';
import photoSwiper from './modules/swiper';
import photoCard from './modules/photo/photoProduct';
import basket from './modules/basket';

let basketEl = basket();

const productPhoto = new photoCard();

productPhoto.loadCards();