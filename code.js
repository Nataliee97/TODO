var input = document.getElementById("input");
var output = document.getElementById("output");
var allInputs = JSON.parse(localStorage.getItem("allInputs")) || [];

if (input) {
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      allInputs.push(input.value);
      input.value = "";
      localStorage.setItem("allInputs", JSON.stringify(allInputs));
      for (i = 0; i < allInputs.length; i++) {
        console.log(allInputs[i]); // wyświetla wszystkie
        output.innerHTML = allInputs[i]; // tylko ostatni
      }
    }
  });
}
