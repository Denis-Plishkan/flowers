import firebase from '../firebase';
import { collection, query, orderBy, where, getCountFromServer, startAfter, startAt,endAt, getDocs, or, and, limit } from "firebase/firestore";
import Pagination from '../pagination';
import CatalogProduct from './CatalogProduct';

export default class loadFirebase{
    constructor(){
        this.catalogProduct = new CatalogProduct();
        this.productCardWrapper = document.querySelector('.cards__items');
        this.pagination = new Pagination();
        document.addEventListener('paginationEvent', (e) => {
            this.pages(e.detail.page)
        });
    }
    async filters(info){
        console.log(info)
        const testArr = []
        for(const key in info){
            if(key !== 'sort' && key !== 'whom' && key !== 'occasion' && key !== 'color'){
                testArr.push(info[key]);
            }
        }
        const resTest = testArr.every(item => item == '')
        console.log(resTest)
        const db = firebase.getFirestore();
        this.colect = collection(db, "products");
        this.sort = [];

        const allGoods = [ 'Букеты', 'Цветочные арки', 'Корзины с цветами','Горшечные растения', 'Цветочные букеты для невесты', 'Гирлянды из цветов', 'Цветочные короны'];
        if(resTest){
            this.filter = [
                where("sale", "in", [10,19]),
            ];
        }else{
            this.filter = [
                or(
                    where("bouquets", "in", info.bouquets),
                    where("roses", "in", info.roses),
                    where("in-box", "in", info.inBox),
                    where("compositions", "in", info.compositions),
                    where("gift", "in", info.gift),
                    where("gift-basket", "in", info.giftBasket),
                    where("for-bride", "in", info.forBride),
                    where("delicious", "in", info.delicious),
                ),
                where("sale", "in", [10,19]),
            ];
        }


        if(info.whom[0] != ''){
            this.filter.push(where("whom", "==", info.whom[0]))}
        if(info.color[0] != ''){
            this.filter.push(where("color", "==", info.color[0]))}
        if(info.occasion[0] != ''){
            this.filter.push(where("occasion", "==", info.occasion[0]))}


        if(info.sort[0] === 'Цена(вверх)'){
            this.sort = ['price']
        }else if(info.sort[0] === 'Цена(вниз)'){
            this.sort = ['price', 'desc'];
        }else if(info.sort[0] === 'Популярность'){
            this.sort = ['popular'];
        }else{
            this.sort = ['price']
        }

        const mainQuery = query(
                this.colect,
                and(...this.filter),
                orderBy(...this.sort),
                limit(12),
        );
        this.loadGoods(mainQuery, true, true);

        this.infoQuery = query(
            this.colect,
            and(...this.filter),
            orderBy(...this.sort),
        );
    }

    async getInfo(startOne){
        this.quantityNow = document.querySelectorAll('.product-card').length;
        this.checkEmpyGoods();

        const snapshotTwo = await getCountFromServer(this.infoQuery);
        this.quantityAll = snapshotTwo.data().count;

        const querySnapshot = await getDocs(this.infoQuery);
        this.lastVisible = querySnapshot.docs

        if(this.quantityPages < 1 || this.quantityLeft === 0){
            this.quantityPages = 1
        }
        this.quantityPages = Math.ceil(this.quantityAll / ((this.quantityNow >= 12) ? this.quantityNow : 12 ));
        this.pagination.quantityPages(this.quantityPages);
        if(startOne){
            this.pagination.currentPages(1);
        }

        this.currentPage = this.pagination.getPage()

        this.quantityLeft = this.quantityAll - ((this.currentPage * 12) - 12) - this.quantityNow;

        if(this.quantityLeft >= 3){
            this.quantityAddMore = 3;
        }else if(this.quantityLeft > 0){
            this.quantityAddMore = this.quantityLeft;
        }else if(this.quantityLeft <= 0){
            this.quantityAddMore = 0;
        }
        
        this.loadMoreBtn();
    }

    checkEmpyGoods(){
        if(this.quantityNow < 1){
            this.productCardWrapper.classList.add('cards__items_empy');
        }else{
            this.productCardWrapper.classList.remove('cards__items_empy');
        }
    }

    pages(page){
        this.start = this.lastVisible[(page * 12) - 12]
        this.loadPage = query(
            this.colect,
            and(...this.filter),
            orderBy(...this.sort),
            startAt(this.start),
            limit(12),
        );
        this.loadGoods(this.loadPage, true);
    }

    loadMore(){

        let limitCard = 3
        if(this.quantityLeft < 3){
            limitCard = this.quantityLeft
        } 
        
        this.loadMoreQuery = query(
            this.colect,
            and(...this.filter),
            orderBy(...this.sort),
            startAt(this.lastVisible[this.quantityNow + ((12 * this.currentPage) - 12)]),
            limit(limitCard),
        );
        this.loadGoods(this.loadMoreQuery, false);
    }

     loadMoreBtn(){

        document.querySelector('.cards__button-info').textContent = this.quantityAddMore;
        
        if(this.quantityAll > 12 && this.quantityLeft > 0){
            document.querySelector('.cards__btn').style.display = 'block'
        }else{
            document.querySelector('.cards__btn').style.display = 'none'
        }
    }

    async loadGoods(mainQuery, deletFil = true, startOne = false){
        if(deletFil){
            this.productCardWrapper.innerHTML = '';
        }
        try{
            const querySnapshot = await getDocs(mainQuery);
            querySnapshot.forEach((doc) => {
                this.catalogProduct.loadCards(doc.data())
            });
        }catch(error){
            const errorText = 'Too many disjunctions after normalization';
            if(error.message.includes(errorText)){
                alert(`Выбранно слишком много категорий, уберите пожалуйста выберите меньше категории`)
            }else{
                console.log(error)
            }
        }
        this.getInfo(startOne);
    }
}
