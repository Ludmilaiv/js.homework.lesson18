const scrolling = () => {
  const menuItems = document.querySelectorAll("menu>ul>li>a");
  const downBtn = document.querySelector("main>a[href=\"#service-block\"]");

  const smoothScroll = (section, speed) => {
    if (document.documentElement.scrollTop !== section.offsetTop) {
      if (speed > Math.abs(section.offsetTop - document.documentElement.scrollTop)) {
        speed = section.offsetTop - document.documentElement.scrollTop;
      }
      if (document.documentElement.scrollHeight - document.documentElement.scrollTop == 
        document.documentElement.clientHeight) {
          return;
        }
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