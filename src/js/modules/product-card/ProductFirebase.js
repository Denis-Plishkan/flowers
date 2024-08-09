import firebase from '../firebase';
import CreateGoods from './CreateGoods'
import FillData from './FillData'
import ProductSwiper from '../product-card/ProductSwiper';
import { collection, query, orderBy, where, getCountFromServer, startAfter, startAt,endAt, getDocs, or, and, limit } from "firebase/firestore";

export default class ProductFirebase{
    constructor(){
        this.url = new URL(window.location.href);
        this.id = this.url.searchParams.get('id');
        this.fillData = new FillData();
        this.createGoods = new CreateGoods();
        this.loadFiles();
    }
    async loadFiles(){
        const db = firebase.getFirestore();
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
            this.createGoods.createCards(doc.data(), '.first-slider__wrapper');
            this.createGoods.createCards(doc.data(), '.second-slider__wrapper');
            if(doc.id % 4 === 0){
                this.createGoods.createCards(doc.data(), '.third-slider__wrapper');
            }
            if(doc.id === this.id){
                this.fillData.fill(doc.data());
            }
        });
        const swipers = new ProductSwiper();
    }

}