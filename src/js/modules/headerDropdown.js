function headerDropdown() {
  const dropdownHeaders = document.querySelectorAll('.top-header__drop-down');
  const dropdowns = document.querySelectorAll('.drop-down');

  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', () => {
      dropdowns.forEach(otherDropdown => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove('active');
        }
      });

      dropdown.classList.toggle('active');
    });
  });

  dropdownHeaders.forEach((dropdownHeader) => {
    dropdownHeader.addEventListener('click', (e) => {
      const list = e.target.closest('.drop-down__list-item');
      if (list) {
        const listItem = dropdownHeader.querySelector('.drop-down__selected-list-item');
        listItem.textContent = list.textContent;
      }
    });
  });
}

headerDropdown();

function searchDropdown() {
  const searchDropDown = document.querySelectorAll('.search-drop-down__header');

  searchDropDown.forEach((item) => {
    const menuSearch = item.querySelector('.search-dropdown');
    const menuArrow = item.querySelector('.search-drop-down__header-arrow');

    item.addEventListener('click', (e) => {
      e.stopPropagation();

      closeAllDropdowns();

      menuSearch.classList.add('active');
      if (menuArrow) {
        menuArrow.classList.add('active');
      }
    });
  });

  document.addEventListener('click', () => {
    closeAllDropdowns();
  });

  function closeAllDropdowns() {
    searchDropDown.forEach((item) => {
      const menuSearch = item.querySelector('.search-dropdown');
      const menuArrow = item.querySelector('.search-drop-down__header-arrow');

      menuSearch.classList.remove('active');
      if (menuArrow) {
        menuArrow.classList.remove('active');
      }
    });
  }
}

searchDropdown();

function headerDropdownMobile() {
  const dropdownItems = document.querySelectorAll(
    '.mobile-menu-dropdowns__item--witharrow'
  );
  let currentDropdown = null;

  dropdownItems.forEach((dropdownItem) => {
    const arrow = dropdownItem.querySelector('svg');
    const dropdown = dropdownItem.querySelector(
      '.mobile-menu-dropdowns__body-second'
    );

    dropdownItem.addEventListener('click', (e) => {
      e.preventDefault();

      if (currentDropdown && currentDropdown !== dropdown) {
        currentDropdown.classList.remove('active');
        currentDropdown
          .closest('.mobile-menu-dropdowns__item--witharrow')
          .querySelector('svg')
          .classList.remove('active');
      }

      if (dropdown) {
        dropdown.classList.toggle('active');
        arrow.classList.toggle('active');

        currentDropdown = dropdown;
      }
    });

    if (dropdown) {
      dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  });
}

headerDropdownMobile();

function headerCategoriesDropdown() {
  const dropdown = document.querySelector('.menu__item-type-categories');
  const arrow = document.querySelector('.pull-down__arrow');
  const secondMenuHovers = document.querySelectorAll('#menuHover');

  let prevMenuHover = null;
  let prevArrowSecondary = null;

  dropdown.addEventListener('click', (e) => {
    e.stopPropagation();
    const secondDropDown = document.querySelector('#header-second-dropdown');
    const informationArrow = document.querySelector('#information-arrow');
    
    if(secondDropDown.classList.contains('active')) {
      secondDropDown.classList.remove('active');
      informationArrow.classList.remove('active');
    }
    dropdown.classList.toggle('active');
    arrow.classList.toggle('active');
  });

  secondMenuHovers.forEach((secondMenuHover) => {
    secondMenuHover.addEventListener('click', (e) => {
      e.stopPropagation();

      if (prevArrowSecondary) {
        prevArrowSecondary.classList.remove('active');
      }

      if (prevMenuHover) {
        prevMenuHover.classList.remove('active');
      }

      let arrowSecondary = secondMenuHover.querySelector('#arrowSecondary');
      arrowSecondary.classList.add('active');

      secondMenuHover.classList.toggle('active');

      prevMenuHover = secondMenuHover;
      prevArrowSecondary = arrowSecondary;
    });
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      if (prevArrowSecondary) {
        prevArrowSecondary.classList.remove('active');
      }

      if (prevMenuHover) {
        prevMenuHover.classList.remove('active');
      }

      dropdown.classList.remove('active');
      arrow.classList.remove('active');
    }
  });
}

headerCategoriesDropdown();

function headerInformationDropdown() {
  const dropdownWrapper = document.querySelector('.menu__item-type-information');
  const dropdown = dropdownWrapper.querySelector('.pull-down__header');
  const dropdownList = dropdownWrapper.querySelector('.pull-down__list');
  const arrow = dropdownWrapper.querySelector('.pull-down__arrow');
  
  dropdown.addEventListener('click', (e) => {
    e.stopPropagation();
    const secondDropdown = document.querySelector('#second-header-dropdown');
    const categoriesArrow = document.querySelector('#categories-arrow');
    if (secondDropdown.classList.contains('active')) {
      secondDropdown.classList.remove('active');
      categoriesArrow.classList.remove('active');
    }
    dropdownList.classList.toggle('active');
    arrow.classList.toggle('active');
  });

  const closeDropdown = () => {
    dropdownList.classList.remove('active');
    arrow.classList.remove('active');
  };

  document.addEventListener('click', (e) => {
    const clickDropdown = dropdownWrapper.contains(e.target);
    if (!clickDropdown) {
      closeDropdown();
    }
  });

}

headerInformationDropdown();

function mobileCityDropdown() {
  const dropdown = document.querySelector('#mobileMenuCity');
  const list = document.querySelector('.mobile-menu__links-city');
  const cities = document.querySelectorAll('.mobile-menu__link-city');
  let text = document.querySelector('.mobile-menu-buttons__item-name');
  const dropdownInfoButton = document.querySelector('#mobileInfodropdown');
  const dropdownInfo = document.querySelector('.mobile-menu-dropdowns__infos');
  const arrow = document.querySelector('#mobileInfodropdown svg');
  
  dropdown.addEventListener('click', (e) => {
    list.classList.toggle('active');
  })

  cities.forEach(city => {
    city.addEventListener('click', (e) => {
      text.textContent = e.target.textContent;
    })
  })

  dropdownInfoButton.addEventListener('click', (e) => {
    e.preventDefault();
    dropdownInfo.classList.toggle('active');
    arrow.classList.toggle('active');
  })
}

mobileCityDropdown();