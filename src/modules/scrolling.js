const scrolling = () => {
  const menuItems = document.querySelectorAll("menu>ul>li>a");
  const downBtn = document.querySelector("main>a[href=\"#service-block\"]");

  const smoothScroll = (section, speed) => {
    if (document.documentElement.scrollTop < section.offsetTop) {
      scrollBy(0,speed);
      requestAnimationFrame(() => smoothScroll(section, speed));
    }
  }

  menuItems.forEach((elem, key) => {
    elem.addEventListener("click", event => {
      event.preventDefault();
      smoothScroll(document.querySelector(elem.getAttribute("href")), (key + 1) * 20);
    });
  });

  downBtn.addEventListener("click", event => {
    event.preventDefault();
    smoothScroll(document.querySelector(downBtn.getAttribute("href")), 20);
  });
  
}

export default scrolling;