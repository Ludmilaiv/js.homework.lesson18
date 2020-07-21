const calculatVerification = () => {
  const calc = document.getElementById("calc");
  
  calc.addEventListener("input", (event) => {
    const target = event.target;
    if (target.matches("input.calc-item")) {
      const value = target.value
      target.value = value.replace(/\D/,"");
    }
  })

};

export default calculatVerification;