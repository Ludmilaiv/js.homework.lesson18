"use strict";

document.addEventListener("DOMContentLoaded", () => {
 
  const glo = document.querySelector("#glo");
  let left = 0;
  let top = 0;
  let deltaX = 1;
  let deltaY = 1;
  let pause = false;

  function animate() {
    if (left + deltaX < 0 || left + deltaX > 500) {
      deltaX *= -1;
    }
    if (top + deltaY < 0 || top + deltaY > 400) {
      deltaY *= -1;
    }
    left += deltaX;
    top += deltaY;
    glo.style.left = left + "px";
    glo.style.top = top + "px";
    if (!pause) {
      requestAnimationFrame(animate);
    }
  }

  animate();

  const doPause = function(){
    if (!pause) {
      pause = true;
      this.style.color = "red"
    } else {
      pause = false;
      this.style.color = ""
      animate();
    }
  }

  document.querySelector("#pause").addEventListener("click",doPause)

  document.querySelector("#restart").addEventListener("click",function() {
    left = 0;
    top = 0;
    if (pause) {
      doPause.call(document.querySelector("#pause"));
    }
    glo.style.left = left + "px";
    glo.style.top = top + "px";
  })

})