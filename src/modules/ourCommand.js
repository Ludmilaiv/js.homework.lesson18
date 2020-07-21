const ourCommand = () => {
  const command = document.getElementById("command");

  command.addEventListener("mouseover", (event) => {
    const target = event.target;
    const oldImage = target.getAttribute("src");
    if(target.classList.contains("command__photo")) {
      target.setAttribute("src", target.dataset.img);
      target.addEventListener("mouseout", function  func() {
        target.setAttribute("src", oldImage);
        target.removeEventListener("mouseout", func);
      });
    }
  });
};

export default ourCommand;