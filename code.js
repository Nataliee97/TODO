var input = document.getElementById("input");

if (input) {
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log(input.value);
    }
  });
}
