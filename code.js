var input = document.getElementById("input");

if (input) {
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log(input.value);
      var allInputs = JSON.parse(localStorage.getItem("allInputs")) || [];
      allInputs.push(input.value);
      localStorage.setItem("allInputs", JSON.stringify(allInputs));
      document.getElementById("output").innerHTML =
        localStorage.getItem("allInputs");
    }
  });
}
