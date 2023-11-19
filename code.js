var input = document.getElementById("input");
var output = document.getElementById("output");
var allInputs = JSON.parse(localStorage.getItem("allInputs")) || [];
var setInputs = localStorage.setItem("allInputs", JSON.stringify(allInputs));

if (input) {
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log(input.value);
      allInputs.push(input.value);
      input.value = "";
      setInputs;
      output.innerHTML = allInputs;
    }
  });
}
function view() {
  if (allInputs != null) {
    output.innerHTML = allInputs;
  }
}
