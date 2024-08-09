import loadFirebase from './firebase';
import Dropdown from '../dropdown';

export default class Menu{
    constructor(){
        this.firebase = new loadFirebase();
        this.dropdownPerson = new Dropdown('.drop-person');
        this.dropdownColor = new Dropdown('.drop-color');
        this.dropdownReason = new Dropdown('.drop-reason');
        this.dropdownSort = new Dropdown('.drop-sort');
        this.sortLine = document.querySelectorAll('.sort li');
        this.allCategory = document.querySelectorAll('.left-menu__item')
        this.mainItem = document.querySelectorAll('.left-menu__point');
        this.adaptiveSort = document.querySelectorAll('.sort-adaptive__main');
        this.deletFilterBtn = document.querySelectorAll('.delete-filters');
        this.loadMore = document.querySelector('.cards__btn');
        this.category = {
            bouquets: [''],
            roses: [''],
            inBox: [''],
            compositions: [''],
            gift: [''],
            giftBasket: [''],
            forBride: [''],
            delicious: [''],
            color: [''],
            whom: [''],
            occasion: [''],
            sort: [''],
        }
        this.getUrl();

        this.addListener();

        this.update();
    }

    setUrl(){
        const url = new URL(window.location.href);
        for(const key in this.category){
            url.searchParams.set(key, this.category[key])
        }
        window.history.replaceState({}, '', url);
    }

    getUrl(){
        const url = new URL(window.location.href);
        if(url.searchParams.size != 0){
            this.allCategory.forEach(el => {
                const li = el.querySelectorAll('.left-menu__point');
                const id = el.id;
                const res = url.searchParams.get(el.id).split(',');
                if(res.length > 0 ){
                    li.forEach(el => {
                        const input = el.querySelector('input')
                        const elem = el.querySelector('label').textContent
                        if(res.includes(elem)){
                            input.checked = true
                        }
                    })
                }
            });
            const personUrl = url.searchParams.get('whom');
            const colorUrl = url.searchParams.get('color');
            const reasonUrl = url.searchParams.get('occasion');
            const sortUrl = url.searchParams.get('sort');

            if(personUrl != ''){
                this.dropdownPerson.changeValue(personUrl);
            }
            if(colorUrl != ''){
                this.dropdownColor.changeValue(colorUrl);
            }
            if(reasonUrl != ''){
                this.dropdownReason.changeValue(reasonUrl);
            }
            if(sortUrl != ''){
                this.dropdownSort.changeValue(sortUrl);
            }
        }
    };

    delFilters(){
        console.log('clean filters')
        document.querySelectorAll('.sort-adaptive__info').forEach(item => {
            item.innerHTML = ''
        });

        this.mainItem.forEach(item => {
            item.querySelector('input').checked = false
        });
        this.dropdownPerson.changeValue('Выбрать');
        this.dropdownColor.changeValue('Выбрать');
        this.dropdownReason.changeValue('Выбрать');
        this.dropdownSort.changeValue('Популярность');
        this.update(true);
    }

    addListener(){
        this.deletFilterBtn.forEach(item => {
            item.addEventListener('click', () => {
                this.delFilters();
            });
        })
        
        this.mainItem.forEach(item => {
            item.querySelector('input').addEventListener('change', () => {
                this.update(true);
            })
        })
        this.sortLine.forEach(item => {
            item.addEventListener('click', () => {
                this.update();
            })
        })
        this.loadMore.addEventListener('click', () => {
            this.firebase.loadMore()
        })
    }
    update(delFilters = false){
        if(delFilters){
            for(const key in this.category){
                this.category[key] = [''];
            }
        }

        const everDrop = (drop, num) => {
            if(drop !== 'Выбрать'){
                this.data(num, drop)
            }else{
                this.data(num, '')
            }
        }
        if(window.innerWidth > 768){
            everDrop(this.dropdownPerson.state(), 9);
            everDrop(this.dropdownColor.state(), 10);
            everDrop(this.dropdownReason.state(), 11);
        }else{
            this.adaptiveSort.forEach(item => {
                const nameItem = item.querySelector('.sort-adaptive__title').textContent;
                const namePoint = item.querySelector('.sort-adaptive__info').textContent;
    
                if(nameItem === 'Кому'){
                    everDrop(namePoint, 9);
                }else if(nameItem === 'По цвету'){
                    everDrop(namePoint, 10);
                }else if(nameItem === 'Повод'){
                    everDrop(namePoint, 11);
                }
            })
        };
        everDrop(this.dropdownSort.state(), 12);

        this.mainItem.forEach(item => {
            const input = item.querySelector('input');
            const lable = item.querySelector('label');
            const numCategory = +input.id.slice(6,7);
            if(input.checked === true){
                this.data(numCategory, lable.textContent)
            }
        });
        // console.log(this.category)
        this.firebase.filters(this.category);
        this.setUrl();
    }

    data(category, item){

        switch(category){
            case 1:
                this.category.bouquets.push(item)
                break;
            case 2:
                this.category.roses.push(item)
                break;
            case 3:
                this.category.inBox.push(item)
                break;
            case 4:
                this.category.compositions.push(item)
                break;
            case 5:
                this.category.gift.push(item)
                break;
            case 6:
                this.category.giftBasket.push(item)
                break;
            case 7:
                this.category.forBride.push(item)
                break;
            case 8:
                this.category.delicious.push(item)
                break;
            case 9:
                this.category.whom = [item];
                break;
            case 10:
                this.category.color = [item];
                break;
            case 11:
                this.category.occasion = [item];
                break;
            case 12:
                this.category.sort = [item];
                break;
        }
    }
}