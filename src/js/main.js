import app from './app';
import certificateSwiper from './modules/swiper';
import stockSwiper from './modules/swiper';
import seasonSwiper from './modules/swiper';
import presentSwiper from './modules/swiper';
import forumSwiper from './modules/swiper';
import productLike from "./modules/like/like";
import productsStock from './modules/products/stockProduct';
import productsSeason from './modules/products/seasonProduct';
import productsPresent from './modules/products/presentProduct';
import forumCard from './modules/forum/forum';
import basket from './modules/basket';

async function go() {

  const stockProduct = new productsStock();
  const seasonProduct = new productsSeason();
  const presentProduct = new productsPresent();
  const productForum = new forumCard();
 
  await stockProduct.loadCards();
  await seasonProduct.loadCards();
  await presentProduct.loadCards();
  await productForum.loadCards();
  
  let basketEl = await basket();
  let likeProduct = await productLike();

}

go();

