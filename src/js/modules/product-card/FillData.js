export default class FillData{
    constructor(){
        this.onePicture = document.querySelector('.inform__image-one');
        this.title = document.querySelector('.inform__title');
        this.categoty = document.querySelector('.categoty');
        this.price = document.getElementById('price');
        this.oldPrice = document.getElementById('old-price');
        this.starsWrapper = document.querySelector('.inform__stars');
        this.infoFlower = document.querySelector('.inform__info-flowers');
        this.infoSize = document.querySelector('.inform__info-size');
        this.infoMaterian = document.querySelector('.inform__info-material');
        this.infoMore = document.querySelector('.inform__info-more');
        this.tabDelovery = document.querySelector('.tabs__info-delivery');
        this.tabDescription = document.querySelector('.tabs__info-description');
        this.tabReviews = document.querySelector('.tabs__info-reviewsv');
        this.reviewsQuatity = document.querySelector('.tabs__reviews-quantity');
        this.reviewContainer = document.querySelector('.reviews-container');
        this.infoOldPrice = document.querySelector('.inform__old-price');
        this.sale = document.querySelector('#sale');
        this.saleWrapper = document.querySelector('.main-image__sale');
        this.swiperWripper = document.querySelector('.inform__wrapper');
        this.categotyLink = document.querySelector('.inform__categoty');
        this.thisProductLink = document.querySelector('.links-row__this-item');
        this.nullOldPrice = document.getElementById('old-price-null');
    }
    fill(data){
        this.categotyLink.href = `./${data.categoryLink}`;
        this.thisProductLink.textContent = data.name;
        this.title.textContent = data.name;
        this.categoty.textContent = data.bouquets;
        this.price.dataset.price = data.price;
        this.price.textContent = data.price;
        this.oldPrice.textContent = data.oldPrice;
        this.infoFlower.textContent = data.name;
        this.infoSize.textContent = data.size;
        this.infoMaterian.textContent = data.material;
        this.infoMore.textContent = data.Additionally;
        this.tabDelovery.textContent = data.delivery;
        this.tabDescription.textContent = data.description;
        this.reviewsQuatity.textContent = data.reviews.length ?? 0
        this.stars(data.stars);
        this.addImages(data);
        this.reviews(data.reviews);
        if(data.oldPrice){
            this.infoOldPrice.style.display = 'block';
        }
        if(data.sale){
            this.saleWrapper.style.display = 'block';
            this.sale.textContent = data.sale;
        }
        if(!data.oldPrice){
            this.nullOldPrice.style.opacity = "0";
        }
    }
    addImages(data){
        const imgArr = [data.img, ...JSON.parse(data.moreImg)];
        imgArr.forEach((obj) => {
            this.swiperWripper.innerHTML += `
                <div class="swiper-slide">
                    <picture>
                        <source srcset="" type="image/webp">
                        <img width="300" height="300" src="${obj.webP}" alt="PNG Image">
                    </picture>
                </div>
            `;
        });
        this.changeImages();
    }
    changeImages(){
        const allSlides = this.swiperWripper.querySelectorAll('.swiper-slide');
        function change(slide){
            const condition = !slide.classList.contains('swiper-slide_active');
            if(condition){
                const mainImage = document.querySelector('.main-image__picture');
                const slidePicture = slide.querySelector('picture');
                mainImage.innerHTML = slidePicture.innerHTML;
                mainImage.classList.add('main-image__picture_animation');
                setTimeout(() => {
                    mainImage.classList.remove('main-image__picture_animation');
                },0)
            }
        }
        change(allSlides[0])

        function addActive(slide){
            allSlides.forEach(slide => {
                slide.classList.remove('swiper-slide_active');
            })
            slide.classList.add('swiper-slide_active');
        }

        allSlides.forEach(item => {
            item.addEventListener('click', () => {
                change(item);
                addActive(item);
            })
        })

    }
    reviews(data){
        for(let i = 0; i < data.length; i++){
            if(i < 10){
                const commitInfo = JSON.parse(data[i])
                let stars = ''
                for(let i = 0; i < commitInfo.stars; i++){
                    stars += '<img src="./images/main/stock/Star.svg" alt="star">';
                }

                this.reviewContainer.innerHTML += `
                    <div class="review">
                        <div class="review__picture">
                            <picture>
                                <source srcset="${commitInfo.img.webP}" type="image/webp">
                                <img src="${commitInfo.img.default}" alt="PNG Image">
                            </picture>
                        </div>
                        <div class="review__main">
                            <div class="review__top-info">
                                <span class="review__data">${commitInfo.data}</span>
                                <div class="review__stars">${stars}</div>
                            </div>
                            <div class="review__name">${commitInfo.name}</div>
                            <div class="review__text">${commitInfo.text}</div>
                        </div>
                    </div>
                `;
            }
        }
    }
    stars(quantitySrats){
        for(let i = 0 ;i < quantitySrats; i++){
            this.starsWrapper.innerHTML += `<img src="./images/main/stock/Star.svg" alt="star">`;
        }
    }

}