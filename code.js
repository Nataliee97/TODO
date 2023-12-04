var input = document.getElementById("input");
var output = document.querySelector("ul");
var itemLeft = document.getElementById("itemLeft");
var tasks = [];
var setItems = function (x) {
  localStorage.setItem("tasks", JSON.stringify(x));
};

var getItems = function () {
  output.innerHTML = "";
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.map((el, index) => {
    var li1 = document.createElement("li");
    li1.textContent = el.text;
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", "task_" + index);
    checkbox.checked = el.completed || false;
    output.appendChild(li1);
    li1.appendChild(checkbox);
  });

  updateItemLeft();
};

var updateItemLeft = function () {
  var incompleteTasks = tasks.filter((task) => !task.completed);
  itemLeft.textContent = incompleteTasks.length + " items left";
};

if (localStorage.tasks) {
  window.onload = getItems();
}

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const task = input.value;
    tasks.push({ text: task, completed: false });
    input.value = "";
    setItems(tasks);
    getItems();
  }
});

output.addEventListener("change", function (event) {
  if (event.target.type === "checkbox") {
    const index = parseInt(event.target.id.split("_")[1]);
    tasks[index].completed = event.target.checked;

    if (event.target.checked) {
      event.target.classList.add("checkbox-checked");
    } else {
      event.target.classList.remove("checkbox-checked");
    }
    updateItemLeft();
  }
});
