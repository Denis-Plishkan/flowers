async function productLike() {
  const likeEl = document.querySelectorAll('.product-card__top-like_active');
  let numLike = 0;
  const headerLike = document.querySelector('.top-header__favorite-amount p');
  const bottomHeaderLike = document.querySelector('.bottom-header__favorite-amount p');
  const bottomHeaderLikeMobile = document.querySelector('.bottom-header__favorite-amount-mobile p');
  
  likeEl.forEach((like) => {
    like.addEventListener('click', (e) => {
        like.classList.toggle('active');
        if(like.classList.contains('active')) {
            numLike += 1;
            headerLike.textContent = numLike;
            bottomHeaderLike.textContent = numLike;
            bottomHeaderLikeMobile.textContent = numLike;
        } else {
            numLike -= 1;
            headerLike.textContent = numLike;
            bottomHeaderLike.textContent = numLike;
            bottomHeaderLikeMobile.textContent = numLike;
        }
        
    })
  })
}

export default productLike;
