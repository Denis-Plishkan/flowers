function menuSwitch() {
  const categoryMenuButton = document.getElementById('categoryMenuButton');
  const categoryMenu = document.getElementById('categoryMenu');
  const menuClose = document.querySelector('.bottom-header__burger-box');
  const mobileMenuClose = document.querySelector('.mobile-menu__close');
  
  categoryMenuButton.addEventListener('click', () => {
    categoryMenu.classList.add('_active');
    menuClose.style.display = 'none';
  });
  mobileMenuClose.addEventListener('click', () => {
    categoryMenu.classList.remove('_active');
    menuClose.style.display = 'block';
  });
  

}

menuSwitch();
