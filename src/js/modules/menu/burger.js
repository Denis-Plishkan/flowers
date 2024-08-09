function burger() {
  const burgerButton = document.querySelector('.bottom-header__burger-box');
  const showMenu = document.querySelector('.bottom-header__nav-block');
  const body = document.querySelector("body");

  if (burgerButton) {
    burgerButton.addEventListener('click', () => {
      burgerButton.classList.toggle("_active");
      
      showMenu.classList.toggle('_active');
      body.classList.toggle("_lock");

    });
  }
  
}


burger();
