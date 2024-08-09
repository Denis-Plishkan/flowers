async function basket() {
  const productCards = document.querySelectorAll('.product-card');
  const basketNumEls = document.querySelectorAll('.basket-amount p');
  const basketWrapper = document.querySelector('.basket__wrapper');
  const basketWrapperRight = document.querySelector('.basket__wrapper-right');
  const basketWrapperText = document.querySelector('.basket__wrapper-text');
  const basketWrapperTextMobile = document.querySelector(
    '.basket__wrapper-text-mobile'
  );
  const basketMessage = document.querySelector('.basket__message');

  let basketNum = 0;
  let parsedBasket = [];
  let counterNum = null;

  function renderBasket() {
    const storedBasket = localStorage.getItem('basket');
    parsedBasket = storedBasket ? JSON.parse(storedBasket) : [];

    if (parsedBasket.length > 0) {
      if (basketMessage && basketWrapperRight && basketWrapperText) {
        basketMessage.style.display = 'none';
        basketWrapperRight.style.display = 'block';

        if (window.innerWidth < 1651) {
          basketWrapperTextMobile.style.display = 'block';
        }

        if (window.innerWidth > 1024) {
          basketWrapperText.style.display = 'flex';
        } else {
          basketWrapperText.style.display = 'none';
        }
      }

      parsedBasket.forEach((item) => {
        renderOrder(item);

        let template = `
          <div class="basket__wrapper-left">   
          <div class="basket__wrapper-card basket__card">
            <div class="basket__card-img">
              <img src="${item.imgSrc}" />
            </div>
            <div class="basket__card-center-wrapper">
              <div class="basket__card-name">
                <p>${item.productName}</p>
              </div>
              <div class="basket__card-price">
                <p class="basket__card-new-price">${item.newPrice} ₴</p>
                <p class="basket__card-old-price">${
                  item.oldPrice !== null ? item.oldPrice + ' ₴' : ''
                }</p>
              </div>
              <div class="basket__card-num-wrapper">
                <div class="basket__card-arrow-left">
                  <svg ><use xlink:href="./images/Sprite.svg#basket-arrow-left"></use></svg>
                </div>
                <div class="basket__card-num">
                  <p>${item.quantNum}</p>
                </div>
                <div class="basket__card-arrow-right">
                  <svg ><use xlink:href="./images/Sprite.svg#basket-arrow-right"></use></svg>
                </div>
              </div>
            </div>
            <div class="basket__card-all-price-wrapper">
            <div class="basket__card-all-price">
              <p>${item.newPrice * item.quantNum} <span>₴</span></p>
            </div>
            <div class="basket__card-del-wrapper">
              <div class="basket__card-del">
                <svg ><use xlink:href="./images/Sprite.svg#basket-card-del"></use></svg>
              </div>
              <div class="product-card__top-like basket__like">
                <svg ><use xlink:href="./images/Sprite.svg#basket-like"></use></svg>
                <div class="product-card__top-like_active basket__like_active">
                  <svg ><use xlink:href="./images/Sprite.svg#basket-like-active"></use></svg>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
          `;

        if (basketWrapper) {
          basketWrapper.insertAdjacentHTML('beforeend', template);
        }
      });
    } else {
      sessionStorage.removeItem('basket');
      localStorage.removeItem('basket');
    }
  }

  function quantProduct() {
    const buttonWrapper = document.querySelector('.basket__wrapper');
    if (buttonWrapper) {
      buttonWrapper.addEventListener('click', (e) => {
        const clickEl = e.target.parentNode;
        const basketCard = clickEl.closest('.basket__wrapper-card');

        if (basketCard) {
          const productId = basketCard.querySelector(
            '.basket__card-img img'
          ).src;
          const currentItem = parsedBasket.find(
            (item) => item.imgSrc === productId
          );

          if (currentItem) {
            if (clickEl.classList.contains('basket__card-arrow-left')) {
              currentItem.quantNum = Math.max(1, currentItem.quantNum - 1);
            } else if (clickEl.classList.contains('basket__card-arrow-right')) {
              if (currentItem.quantNum < 99) {
                currentItem.quantNum += 1;
              }
            }

            const quantNumberEl = basketCard.querySelector(
              '.basket__card-num p'
            );
            const allPriceEl = basketCard.querySelector(
              '.basket__card-all-price p'
            );

            if (quantNumberEl && allPriceEl) {
              quantNumberEl.textContent = currentItem.quantNum;
              allPriceEl.textContent =
                currentItem.newPrice * currentItem.quantNum + ' ₴';
              renderOrder(currentItem);
            }

            updateLocalStorage();
            sessionStorage.setItem('basket', JSON.stringify(parsedBasket));
          }
        }
      });
    }
  }

  function renderOrder(item) {
    const allPrice = document.querySelector('.basket__wrapper-right-price');
    const allStock = document.getElementById('allStock');
    const allCost = document.getElementById('allCost');

    let totalPrice = 0;
    let totalStock = 0;
    let totalCost = 0;

    if (allPrice) {
      parsedBasket.forEach((item) => {
        if (item.oldPrice) {
          totalPrice += item.oldPrice * item.quantNum;
        } else {
          totalPrice += item.newPrice * item.quantNum;
        }
      });

      allPrice.textContent = totalPrice + ' ₴';
    }

    if (allStock) {
      parsedBasket.forEach((item) => {
        if (item.oldPrice) {
          totalStock +=
            item.oldPrice * item.quantNum - item.newPrice * item.quantNum;
        } else {
          totalStock += 0;
        }
      });

      allStock.textContent = totalStock + ' ₴';
    }

    if (allCost) {
      totalCost += totalPrice - totalStock;
      allCost.textContent = totalCost + ' ₴';
    }
  }

  function updateLocalStorage() {
    localStorage.setItem('basket', JSON.stringify(parsedBasket));
    sessionStorage.setItem('basket', JSON.stringify(parsedBasket));
  }

  function updateStateBasketNum() {
    const storedBasket = sessionStorage.getItem('basket');
    if (storedBasket) {
      parsedBasket = JSON.parse(storedBasket);
      basketNumEls.forEach((basketNumEl) => {
        basketNum = parsedBasket.length;
        basketNumEl.textContent = basketNum;
      });
    }
  }

  updateStateBasketNum();

  function clearBasket() {
    const basketItems = document.querySelectorAll('.basket__card');

    basketItems.forEach((item) => {
      item.remove();
    });
  }

  function handleProductClick(
    productEl,
    nameSelector,
    priceSelector,
    oldPriceSelector,
    imgSelector,
    counterNum
  ) {
    const newBasketItem = {
      imgSrc: productEl.querySelector(imgSelector).src,
      productName: productEl.querySelector(nameSelector).textContent,
      newPrice: counterNum
        ? parseFloat(
            productEl
              .querySelector(priceSelector)
              .textContent.replace('грн', '')
          ) / counterNum
        : parseFloat(
            productEl
              .querySelector(priceSelector)
              .textContent.replace('грн', '')
          ),
      oldPrice: (() => {
        const oldPriceElement = productEl.querySelector(oldPriceSelector);
        return oldPriceElement
          ? parseFloat(oldPriceElement.textContent.replace('грн', ''))
          : null;
      })(),
      quantNum: counterNum ? counterNum : 1,
    };

    const existingItemIndex = parsedBasket.findIndex(
      (item) => item.productName.replace(/\s/g, "") === newBasketItem.productName.replace(/\s/g, "")
    );
    console.log(existingItemIndex);

    if (existingItemIndex !== -1) {
      if (parsedBasket[existingItemIndex].quantNum < 99) {
        parsedBasket[existingItemIndex].quantNum += 1;
      }
    } else {
      parsedBasket.push(newBasketItem);
    }

    sessionStorage.setItem('basket', JSON.stringify(parsedBasket));
    updateLocalStorage();
    updateStateBasketNum();
    clearBasket();
    renderBasket();
    delProduct();
  }

  const productButton = document.querySelector('.btn-row__btn');

  if (productButton) {
    productButton.addEventListener('click', (e) => {
      e.preventDefault();

      counterNum = parseInt(
        document.querySelector('.counter__number').value,
        10
      );

      const productEl = e.target.parentNode.parentNode.parentNode;
      handleProductClick(
        productEl,
        '.inform__info-flowers',
        '#price',
        '#old-price',
        '.inform__image img',
        counterNum
      );
    });
  }

  productCards.forEach((productCard) => {
    const button = productCard.querySelector(
      '.product-card__bottom-button-desktop'
    );

    const buttonMobile = productCard.querySelector(
      '.product-card__bottom-button-mobile'
    );

    button.addEventListener('click', (e) => {
      e.preventDefault();
      const productEl = e.target.parentNode.parentNode.parentNode;
      handleProductClick(
        productEl,
        '.product-card__bottom-name',
        '.product-card__bottom-price',
        '.product-card__bottom-old-price',
        '.product-card__img img'
      );
    });

    buttonMobile.addEventListener('click', (e) => {
      e.preventDefault();
      const productEl = e.target.parentNode.parentNode.parentNode.parentNode;
      handleProductClick(
        productEl,
        '.product-card__bottom-name',
        '.product-card__bottom-price',
        '.product-card__bottom-old-price',
        '.product-card__img img'
      );
    });
  });

  function delProduct() {
    const delButtons = document.querySelectorAll('.basket__card-del');

    delButtons.forEach((delButton) => {
      delButton.addEventListener('click', (e) => {
        const delEl = e.target.closest('.basket__wrapper-card');

        if (delEl) {
          const delImg = delEl.querySelector('.basket__card-img img').src;

          const delIndex = parsedBasket.findIndex(
            (item) => item.imgSrc === delImg
          );

          if (delIndex !== -1) {
            parsedBasket.splice(delIndex, 1);

            delEl.remove();
            updateLocalStorage();
            updateStateBasketNum();
            renderOrder();
            testProduct();
          }
        }
      });
    });
  }

  const orderWrapper = document.querySelector('.order__you-order-wrapper');

  function order() {
    const productNameContainer = document.querySelectorAll('.basket__card');

    if (productNameContainer) {
      parsedBasket.forEach((item) => {
        let orderTemplate = `
          <div class="order__you-order">
            <p class="order__you-product">${item.productName}</p>
            <p class="order__you-num">${item.quantNum}</p>
            <p class="order__you-price order__num">${
              item.newPrice * item.quantNum
            } ₴</p>
          </div>
        `;
        if (orderWrapper) {
          orderWrapper.insertAdjacentHTML('beforeend', orderTemplate);
        }
      });

      const orderPrice = document.querySelector('.order__sum-price');
      const orderYouPrices = document.querySelectorAll('.order__you-price');
      const allOrderPrice = document.querySelector('.order__our-price');
      const orderDeliveryPriceEl = document.querySelector(
        '.order__delivery-price'
      );
      const orderFotoPriceEl = document.querySelector('.order__foto-price');

      if (orderDeliveryPriceEl && orderFotoPriceEl) {
        const orderDeliveryPrice = +orderDeliveryPriceEl.textContent.replace(
          '₴',
          ''
        );
        const orderFotoPrice = +orderFotoPriceEl.textContent.replace('₴', '');
        const orderForms = document.querySelectorAll(
          '.order__form-left-button-wrapper'
        );

        orderForms.forEach((orderForm) => {
          orderForm.addEventListener('click', () => {
            const span = orderForm.querySelector('span[id="orderPrice"]');
            let extractedValue = 0;

            if (span) {
              const text = span.textContent;
              const textWithoutSpaces = text.replace(/\s+/g, '');
              const match = textWithoutSpaces.match(/\+(\d+)\s*грн/);

              if (match && match[1]) {
                extractedValue = +match[1];
              }
            }

            if (orderForm.classList.contains('active')) {
              allOrderPrice.textContent =
                +allOrderPrice.textContent.replace('₴', '') +
                extractedValue +
                '₴';
            } else {
              allOrderPrice.textContent =
                +allOrderPrice.textContent.replace('₴', '') -
                extractedValue +
                '₴';
            }
          });
        });

        let countYouPrice = 0;
        orderYouPrices.forEach((orderYouPrice) => {
          const orderPriceNum = +orderYouPrice.textContent.replace('₴', '');

          countYouPrice += orderPriceNum;
        });
        orderPrice.textContent = countYouPrice + '₴';
        allOrderPrice.textContent =
          countYouPrice + orderDeliveryPrice + orderFotoPrice + '₴';
      }
    }
  }

  function testProduct() {
    if (parsedBasket.length === 0) {
      if (parsedBasket && basketWrapperRight) {
        basketWrapperRight.style.display = 'none';
        basketWrapperText.style.display = 'none';
        basketWrapperTextMobile.style.display = 'none';
        basketMessage.style.display = 'block';
      }
    }
  }

  quantProduct();
  renderOrder();
  renderBasket();
  delProduct();
  order();
  testProduct();
}

export default basket;
