var input = document.getElementById("input");

if (input) {
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log(input.value);
      var allInputs = JSON.parse(localStorage.getItem("allInputs")) || [];
      allInputs.push(input.value);
      input.value = "";
      localStorage.setItem("allInputs", JSON.stringify(allInputs));
      document.getElementById("output").innerHTML =
        localStorage.getItem("allInputs");
    }
  });
}
function view() {
  if (localStorage.getItem("data") != null) {
    document.getElementById("output").innerHTML = JSON.parse(
      localStorage.getItem("data")
    );
  }
}
