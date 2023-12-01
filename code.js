var input = document.getElementById("input");
var output = document.querySelector("ul");
var tasks = [];
var setItems = function (x) {
  localStorage.setItem("tasks", JSON.stringify(x));
};

var getItems = function () {
  output.innerHTML = "";
  tasks = JSON.parse(localStorage.getItem("tasks"));
  const list = tasks.map((el) => {
    var li1 = document.createElement("li");
    li1.textContent = el;
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    output.appendChild(li1);
    li1.appendChild(checkbox);
  });
};

if (localStorage.tasks) {
  window.onload = getItems();
}

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const task = input.value;
    tasks.push(task);
    input.value = "";
    setItems(tasks);
    getItems();
  }
});
