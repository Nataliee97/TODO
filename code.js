let input = document.getElementById("input");

function save() {
  var newData = input.value;

  if (localStorage.getItem("data") == null) {
    localStorage.setItem("data", "[]");
  }

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed!");
    }
  });

  var oldData = JSON.parse(localStorage.getItem("data"));
  oldData.push(newData);

  localStorage.setItem("data", JSON.stringify(oldData));
}

function view() {
  if (localStorage.getItem("data") != null) {
    document.getElementById("output").innerHTML = JSON.parse(
      localStorage.getItem("data")
    );
  }
}
