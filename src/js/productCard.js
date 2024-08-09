
import app from './app';
import ProductFirebase from './modules/product-card/ProductFirebase';
import JustValidate from 'just-validate';
import basket from './modules/basket';
import productLike from "./modules/like/like";


import Cleave from 'cleave.js';
import 'cleave.js/dist/addons/cleave-phone.us'; 


var cleave = new Cleave('.fast-order__input', {
    blocks: [2, 3, 2, 2],
    numericOnly: true
});

class ProductCard{
    constructor(){
        this.tabsBtn = document.querySelector('.tabs__line');
        this.tabsBlock = document.querySelector('.tabs');
        this.counterArrowLeft = document.querySelector('.counter__arrow-left');
        this.counterArrowRight = document.querySelector('.counter__arrow-right');
        this.like = document.querySelector('.main-image__like');
        this.input = document.querySelector('.fast-order__input');
        this.moreImages = document.querySelectorAll('.inform__more-image');
        this.mainPicture = document.querySelector('.main-image__picture');
        this.validate = new JustValidate(document.querySelector('.fast-order'));
        this.phoneInput = document.querySelector('.fast-order__input');
        this.firebase = new ProductFirebase();
        this.tabs();
        this.counter();
        this.clickLike();
        this.focus();
        this.zoom();
        this.fastOrderVal();
    }
    fastOrderVal(){
        const rule = [
            {
                rule: 'required',
                errorMessage: 'Введите номер телефона'
            },
            {
                rule: 'customRegexp',
                value: /(^[0-9]{2}\s[0-9]{3}\s[0-9]{2}\s[0-9]{2}$)/,
                errorMessage: 'Номер не валидный',
            },
        ];
        const setting = {
            errorsContainer: '.fast-order__error',
            errorLabelCssClass: ['invalid'],
            errorFieldCssClass: ['error-focus'],
        }
        this.validate.addField(this.phoneInput, rule, setting);

        this.validate.onSuccess( event => {
            alert('Ваш заказ принят) мы скоро с вами свяжемся');
            this.phoneInput.value = '';
        });
    }
    clickLike(){
        this.like.addEventListener('click', () => {
            this.like.classList.toggle('main-image__like_active')
        })
    }
    tabs(){
        this.tabsBtn.addEventListener('click', (e) => {
            if(e.target.classList.contains('tabs__btn-delivery')){
                this.tabsBlock.classList.add('tabs_delivery');
                this.tabsBlock.classList.remove('tabs_description');
                this.tabsBlock.classList.remove('tabs_reviews');
            }else if(e.target.classList.contains('tabs__btn-description')){
                this.tabsBlock.classList.add('tabs_description');
                this.tabsBlock.classList.remove('tabs_delivery');
                this.tabsBlock.classList.remove('tabs_reviews');
            }else if(e.target.classList.contains('tabs__btn-reviews')){
                this.tabsBlock.classList.add('tabs_reviews');
                this.tabsBlock.classList.remove('tabs_delivery');
                this.tabsBlock.classList.remove('tabs_description');
            }
        });
    }
    zoom(){
        this.mainPicture.addEventListener("click", () => {
            this.mainPicture.classList.toggle('main-image__picture_zoom');
        })
    }
    focus(){
        const inputLine = document.querySelector('.fast-order__input-line')
        this.input.addEventListener('focus', () => {
            inputLine.classList.add('fast-order__input-line_focus');
        })
        document.addEventListener('click', (e) => {
            if(!e.target.classList.contains('fast-order__input')){
                inputLine.classList.remove('fast-order__input-line_focus');
            }
        })
    }
    counter(){
        const input = document.querySelector('.counter__number');
        input.value = 1;
        this.counterArrowLeft.addEventListener('click', () => {
            count(1);
        });
        this.counterArrowRight.addEventListener('click', () => {
            count(2);
        });
        input.addEventListener('change', () => {
            count(0);
        })


        function count(condition){
            const input = document.querySelector('.counter__number')
            const num =  +input.value;

            if(num === 0){
                input.value = 1;
            }else if(num % 1 !== 0){
                input.value = Math.floor(num);
            }else if(condition === 1 && num > 1){
                input.value = num - 1;
            }else if (num >= 99){
                alert('Максимальный заказ через сайт 99 букетов, если вам нужно больше обратитесь пожалуйста к администрации сайта');
                input.value = 99;
            } else if(condition === 2){
                input.value = num + 1;
            }else if(num < 1){
                alert('Вы не можете заказать менее одного букета');
                input.value = 1;
            }
            priceCalculator(input.value)
        }
        function priceCalculator(num){
            const price = document.getElementById('price');
            const newPrice = +price.dataset.price * +num;
            price.textContent = newPrice;
        }
        count(0);
    }
}

const productClass = new ProductCard();

let basketEl = basket();
