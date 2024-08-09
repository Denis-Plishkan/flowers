function order() {
    const orderButton = document.querySelector('.order__button');

        if (orderButton) {
          orderButton.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('basket');
            localStorage.removeItem('basket');
          });
        }

    const checkboxes = document.querySelectorAll('.order__form-left-button-wrapper');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('click', () => {
        checkbox.classList.toggle('active')
      })
    })

    const orderInputs = document.querySelectorAll('.order__form input');
    orderInputs.forEach(orderInput => {
      orderInput.addEventListener('focus', () => {
        orderInput.classList.add('active');
      })

      orderInput.addEventListener('blur', () => {
        orderInput.classList.remove('active');
      });
    })
  }

  order();