function save() {
  var newData = document.getElementById("input").ariaValueMax;
  if (localStorage.getItem("data") == null) {
    localStorage.setItem("data", "[]");
  }

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
