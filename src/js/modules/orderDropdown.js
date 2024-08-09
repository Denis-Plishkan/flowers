function dropdownHandler(
    dropdownSelector,
    labelSelector,
    menuSelector,
    itemSelector,
    labelTextSelector
  ) {
    const dropdowns = document.querySelectorAll(dropdownSelector);
  
    dropdowns.forEach((dropdown) => {
      const items = dropdown.querySelectorAll(itemSelector);
      const labelText = dropdown.querySelector(labelTextSelector);
      const label = dropdown.querySelector(labelSelector);
      const menu = dropdown.querySelector(menuSelector);
  
      label.addEventListener("click", () => {
        menu.classList.toggle("active");
        label.classList.toggle("active");
      });
  
      items.forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          if (labelText) {
            labelText.textContent = e.target.textContent;
            menu.classList.remove("active");
            label.classList.remove("active");
          }
        });
      });
    });
  }

  dropdownHandler(
    ".order__form-region",
    ".order-region__dropdown-label",
    ".order-region__dropdown-menu",
    ".order-region__dropdown-menu li",
    ".order-region__label-text"
  );

  dropdownHandler(
    ".order__form-time",
    ".order-time__dropdown-label",
    ".order-time__dropdown-menu",
    ".order-time__dropdown-menu li",
    ".order-time__label-text"
  );
