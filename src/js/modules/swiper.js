import Swiper, { Navigation, Pagination, Autoplay, Scrollbar } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay, Scrollbar]);

function certificateSwiper() {
  let swiper = new Swiper('.certificateSwiper', {
    pagination: {
      el: '.certificate__swiper-pagination',
    },
  });
}
certificateSwiper();

function stockSwiper() {
  let swiper = new Swiper('.stock-swiper', {
    slidesPerView: 'auto',
    speed: 1100,
    pagination: {
      el: '.stock__swiper-pagination',
    },
    navigation: {
      nextEl: '.stock__swiper-button-next',
      prevEl: '.stock__swiper-button-prev',
    },
  });
}
stockSwiper();

function seasonSwiper() {
  let swiper = new Swiper('.season-swiper', {
    slidesPerView: 'auto',
    speed: 1100,
    pagination: {
      el: '.season__swiper-pagination',
    },
    navigation: {
      nextEl: '.season__swiper-button-next',
      prevEl: '.season__swiper-button-prev',
    },
  });
}
seasonSwiper();

function presentSwiper() {
  let swiper = new Swiper('.present-swiper', {
    slidesPerView: 'auto',
    speed: 1100,
    pagination: {
      el: '.present__swiper-pagination',
    },
    navigation: {
      nextEl: '.present__swiper-button-next',
      prevEl: '.present__swiper-button-prev',
    },
  });
}
presentSwiper();

function forumSwiper() {
  let swiper = new Swiper('.forum-swiper', {
    slidesPerView: 'auto',
    speed: 1100,
    pagination: {
      el: '.forum__swiper-pagination',
    },
  });
}
forumSwiper();

function previewsSwiper() {
  let swiper = new Swiper('.reviews__swiper', {
    slidesPerView: 'auto',
    speed: 1100,
    pagination: {
      el: '.reviews__swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },
    navigation: {
      nextEl: '.reviews__swiper-button-next',
      prevEl: '.reviews__swiper-button-prev',
    },
  });
}
previewsSwiper();

function photoSwiper() {
  let swiper = new Swiper('.photo__swiper', {
    slidesPerView: 'auto',
    speed: 1100,
    pagination: {
      el: '.photo__swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },
    navigation: {
      nextEl: '.photo__swiper-button-next',
      prevEl: '.photo__swiper-button-prev',
    },
  });
}
photoSwiper();

function videoSwiper() {
  let swiper = new Swiper('.video__swiper', {
    slidesPerView: 'auto',
    speed: 1100,
    pagination: {
      el: '.video__swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },
    navigation: {
      nextEl: '.video__swiper-button-next',
      prevEl: '.video__swiper-button-prev',
    },
  });
}
videoSwiper();

function newsSwiper() {
  let swiper = new Swiper('.news__swiper', {
    slidesPerView: 'auto',
    speed: 1100,
    pagination: {
      el: '.news__swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },
    navigation: {
      nextEl: '.news__swiper-button-next',
      prevEl: '.news__swiper-button-prev',
    },
  });
}
newsSwiper();
