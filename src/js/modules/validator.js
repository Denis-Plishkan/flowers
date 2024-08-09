
function orderValidator() {
  const recipientName = document.getElementById('orderRecipientName');
  const recipientTel = document.getElementById('recipientPhone');
  const recipientAdress = document.getElementById('orderRecipientAdress');
  const senderName = document.getElementById('orderSenderName');
  const senderTel = document.getElementById('orderSenderTel');
  const senderMail = document.getElementById('orderSenderMail');
  const postCard = document.getElementById('orderPostcard');
  const coupon = document.getElementById('orderCoupon');
  const certificate = document.getElementById('orderCertificate');

  const buttonSubmit = document.querySelector('.order__button');

  const recipientNameText = document.getElementById('recipientNameText');
  const recipientTelText = document.getElementById('recipientPhoneText');
  const recipientAdressText = document.getElementById('recipientAdressText');

  const senderNameText = document.getElementById('senderNameText');
  const senderTelText = document.getElementById('senderTelText');
  const senderMailText = document.getElementById('senderMailText');

  const postCardText = document.getElementById('orderPostcardText');
  const textPostCardText = document.getElementById('textPostCardText');

  const couponText = document.getElementById('couponText');
  const certificateText = document.getElementById('certificateText');

  function isFormValid() {
    const inputs = [
      recipientName,
      recipientTel,
      recipientAdress,
      senderName,
      senderTel,
      senderMail,
      postCard,
      coupon,
      certificate,
    ];

    for (const input of inputs) {
      if (input.classList.contains('invalid') || input.value.trim() === '') {
        return false;
      }
    }

    return true;
  }

  const form = document.querySelector('.order__form');

  function onSubmitHandler(e) {
    if (!isFormValid()) {
      e.preventDefault();
    }
  }

  if (form) {
    form.addEventListener('submit', onSubmitHandler);
    updateButtonSubmit(); 
  }

  function updateButtonSubmit() {
    if (isFormValid()) {
      buttonSubmit.disabled = false;
      buttonSubmit.classList.remove('invalid');
      buttonSubmit.classList.add('valid');
    } else {
      buttonSubmit.disabled = true;
      buttonSubmit.classList.remove('valid');
      buttonSubmit.classList.add('invalid');
    }
  }

  function validateAdress(adress) {
    const adressValid = /^ул\.[\p{L}\s\d]{3,28}$/u;
    return adressValid.test(adress);
  }

  function validatePhoneNumber(phoneNumber) {
    const phoneValid = /^\+\d{12}$/;
    return phoneValid.test(phoneNumber);
  }

  function validateEmail(email) {
    const emailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailValid.test(email);
  }

  function validateCoupon(coupon) {
    const couponValid = /^\d{1,10}$/;
    return couponValid.test(coupon);
  }

  if (recipientName) {
    recipientName.addEventListener('input', () => {
      const name = recipientName.value.trim();
      if (name === '') {
        recipientName.classList.add('invalid');
        recipientNameText.textContent = 'Пожалуйста, введите ваше имя';
      } else if (name.length <= 2) {
        recipientName.classList.add('invalid');
        recipientNameText.textContent = 'Менее 2 букв';
      } else if (name.length > 20) {
        recipientName.classList.add('invalid');
        recipientNameText.textContent = 'Более 20 букв';
      } else {
        recipientName.classList.remove('invalid');
        recipientNameText.textContent = '';
      }
      updateButtonSubmit();
    });
  }

  if (senderName) {
        senderName.addEventListener('input', () => {
          const name = senderName.value.trim();
          if (name === '') {
            senderName.classList.add('invalid');
            senderNameText.textContent = 'Пожалуйста, введите ваше имя';
          } else if (name.length <= 2) {
            senderName.classList.add('invalid');
            senderNameText.textContent = 'Менее 2 букв';
          } else if (name.length > 20) {
            senderName.classList.add('invalid');
            senderNameText.textContent = 'Более 20 букв';
          } else {
            senderName.classList.remove('invalid');
            senderNameText.textContent = '';
          }
          updateButtonSubmit();
        });
      }
    
      if (recipientTel) {
        recipientTel.addEventListener('input', () => {
          const phone = recipientTel.value.trim();
          if (phone === '') {
            recipientTel.classList.add('invalid');
            recipientTelText.textContent = 'Пожалуйста, введите ваш номер';
          } else if (phone.length > 13) {
            recipientTel.classList.add('invalid');
            recipientTelText.textContent = 'Более 13 цифр';
          } else if (!validatePhoneNumber(phone)) {
            recipientTel.classList.add('invalid');
            recipientTelText.textContent =
              'Не верный формат. Используйте формат: +1234567890';
          } else {
            recipientTel.classList.remove('invalid');
            recipientTelText.textContent = '';
          }
          updateButtonSubmit();
        });
      }
    
      if (senderTel) {
        senderTel.addEventListener('input', () => {
          const phone = senderTel.value.trim();
          if (phone === '') {
            senderTel.classList.add('invalid');
            senderTelText.textContent = 'Пожалуйста, введите ваш номер';
          } else if (phone.length > 13) {
            senderTel.classList.add('invalid');
            senderTelText.textContent = 'Более 13 цифр';
          } else if (!validatePhoneNumber(phone)) {
            senderTel.classList.add('invalid');
            senderTelText.textContent =
              'Не верный формат. Используйте формат: +1234567890';
          } else {
            senderTel.classList.remove('invalid');
            senderTelText.textContent = '';
          }
          updateButtonSubmit();
        });
      }
    
      if (recipientAdress) {
        recipientAdress.addEventListener('input', () => {
          const adress = recipientAdress.value.trim();
          if (adress === '') {
            recipientAdress.classList.add('invalid');
            recipientAdressText.textContent = 'Пожалуйста, введите ваш адрес';
          } else if (adress.length > 50) {
            recipientAdress.classList.add('invalid');
            recipientAdressText.textContent = 'Более 50 символов';
          } else if (!validateAdress(adress)) {
            recipientAdress.classList.add('invalid');
            recipientAdressText.textContent =
              'Не верный формат. Используйте формат: ул.Название';
          } else {
            recipientAdress.classList.remove('invalid');
            recipientAdressText.textContent = '';
          }
          updateButtonSubmit();
        });
      }
    
      if (senderMail) {
        senderMail.addEventListener('input', () => {
          const email = senderMail.value.trim();
          if (email === '') {
            senderMail.classList.add('invalid');
            senderMailText.textContent = 'Пожалуйста, введите вашу почту';
          } else if (!validateEmail(email)) {
            senderMail.classList.add('invalid');
            senderMailText.textContent = 'Неверный формат';
          } else {
            senderMail.classList.remove('invalid');
            senderMailText.textContent = '';
          }
          updateButtonSubmit();
        });
      }
    
      if (postCardText) {
        postCardText.addEventListener('input', () => {
          const text = postCardText.value.trim();
          if (text === '') {
            postCardText.classList.add('invalid');
            textPostCardText.textContent = 'Пожалуйста, введите текст';
          } else if (text.length > 70) {
            postCardText.classList.add('invalid');
            textPostCardText.textContent = 'Более 70 символов';
          } else {
            postCardText.classList.remove('invalid');
            textPostCardText.textContent = '';
          }
          updateButtonSubmit();
        });
      }
    
      if (coupon) {
        coupon.addEventListener('input', () => {
          const text = coupon.value.trim();
          if (text === '') {
            coupon.classList.add('invalid');
            couponText.textContent = 'Пожалуйста, введите ваш купон';
          } else if (!validateCoupon(text)) {
            coupon.classList.add('invalid');
            couponText.textContent = 'Неверный формат купона: не более 10 цифр';
          } else {
            coupon.classList.remove('invalid');
            couponText.textContent = '';
          }
          updateButtonSubmit();
        });
      }
    
      if (certificate) {
        certificate.addEventListener('input', () => {
          const text = certificate.value.trim();
          if (text === '') {
            certificate.classList.add('invalid');
            certificateText.textContent = 'Пожалуйста, введите ваш сертификат';
          } else if (text.length > 20) {
            certificate.classList.add('invalid');
            certificateText.textContent = 'Больше 20 символов';
          } else {
            certificate.classList.remove('invalid');
            certificateText.textContent = '';
          }
          updateButtonSubmit();
        });
      }
}

orderValidator();

