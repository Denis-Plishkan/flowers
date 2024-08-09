import Swiper, { Navigation, Pagination, Autoplay, Scrollbar } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay, Scrollbar]);

export default class ProductSwiper{
    constructor(){
        this.firstSlider = new Swiper('.first-slider__swiper', {
            modules: [Navigation],
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 20,
            loop: true,
            navigation: {
                nextEl: '.first-slider__btn-next',
                prevEl: '.first-slider__btn-prev',
            },
            breakpoints: {
                1420: {
                    slidesPerView: 4,
                },
            },
        });
        this.secondSlider = new Swiper('.second-slider__swiper', {
            modules: [Navigation],
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 20,
            loop: true,
            navigation: {
                nextEl: '.second-slider__btn-next',
                prevEl: '.second-slider__btn-prev',
            },
            breakpoints: {
                1420: {
                    slidesPerView: 4,
                },
            },
        });
        this.thirdSlider = new Swiper('.third-slider__swiper', {
            modules: [Pagination],
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 9,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
            },
        });
        this.fourthSlider = new Swiper('.inform__swiper', {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 4.5,
            breakpoints: {
                768: {
                    spaceBetween: 9,
                },
            },
        });
    }
}