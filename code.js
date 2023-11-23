var input = document.getElementById("input");
var output = document.getElementById("output");
var tasks = [];
var setItems = function (x) {
  localStorage.setItem("tasks", JSON.stringify(x));
};
var getItems = function () {
  tasks = JSON.parse(localStorage.getItem("tasks"));
};

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const task = {
      id: new Date().getTime(),
      name: input.value,
    };
    tasks.push(task);
    input.value = "";
    setItems(tasks);
    getItems();
  }
});

// function renderTasks() {tasks.map(el => )}
