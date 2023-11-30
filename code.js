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
    li1 = document.createElement("li");
    li1.textContent = el;
    output.appendChild(li1);
  });
};

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
