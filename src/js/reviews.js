import app from './app';
import previewsSwiper from './modules/swiper';
import reviewsCard from './modules/reviews/reviews';
import basket from './modules/basket';

let basketEl = basket();

const productReviews = new reviewsCard();

productReviews.loadCards();