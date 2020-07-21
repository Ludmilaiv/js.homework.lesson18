const toggleMenu = () => {
  const menu = document.querySelector("menu");
  const menuItems = menu.querySelectorAll("ul>li");

  const handlerMenu = () => {
    menu.classList.toggle("active-menu");
  }

  document.addEventListener("click", (event) => {
    let target = event.target;
    menuItems.forEach(elem => {
      if (target.parentElement == elem || target.classList.contains("close-btn")) {
        handlerMenu();
        return;
      }
    });
    target = target.closest(".menu");
    if (target) {
      handlerMenu();
    } else if (menu.classList.contains("active-menu")){
      target = event.target;
      target = target.closest("menu");
      if (!target) {
        handlerMenu();
      }
    }
    
  });

};

export default toggleMenu