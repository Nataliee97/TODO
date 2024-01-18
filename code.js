var input = document.getElementById("input");
var output = document.querySelector("ul");
var itemLeft = document.getElementById("itemLeft");
var all = document.getElementsByClassName("all");
var active = document.getElementsByClassName("active");
var done = document.getElementsByClassName("completed");
var clear = document.getElementsByClassName("clear");
var tasks = [];
var setItems = function (x) {
  localStorage.setItem("tasks", JSON.stringify(x));
};
const toDoListTemplate = document.querySelector(".toDoList");
const liTemplate = toDoListTemplate.content.querySelector("li");

var getItems = function () {
  output.innerHTML = "";
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((el, index) => {
    const listItem = liTemplate.cloneNode(true);
    const taskName = listItem.querySelector(".taskName");
    const checkbox = listItem.querySelector('input[type="checkbox"]');
    const deleteButton = listItem.querySelector(".deleteButton");

    taskName.textContent = el.text;
    checkbox.checked = el.completed || false;

    if (el.completed) {
      taskName.style.textDecoration = "line-through";
      taskName.style.color = "#777";
    } else {
      taskName.style.textDecoration = "none";
      taskName.style.color = "#000";
    }

    checkbox.addEventListener("change", function () {
      el.completed = checkbox.checked;
      setItems(tasks);
      getItems();
    });

    listItem.addEventListener("mouseover", function () {
      deleteButton.style.display = "inline-block";
    });

    listItem.addEventListener("mouseout", function () {
      deleteButton.style.display = "none";
    });

    deleteButton.addEventListener("click", function () {
      tasks.splice(index, 1);
      setItems(tasks);
      getItems();
    });

    output.appendChild(listItem);
  });

  updateItemLeft();
};

var updateItemLeft = function () {
  var incompleteTasks = tasks.filter((task) => !task.completed);
  itemLeft.textContent = incompleteTasks.length + " items left";
};

if (localStorage.tasks) {
  window.onload = getItems;
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

all[0].addEventListener("click", function () {
  getItems();
});

clear[0].addEventListener("click", function () {
  tasks = tasks.filter((task) => !task.completed);
  setItems(tasks);
  getItems();
});

var isCompleted = function (showCompleted) {
  output.innerHTML = "";
  var filteredTasks = showCompleted
    ? tasks.filter((task) => task.completed)
    : tasks.filter((task) => !task.completed);

  filteredTasks.forEach((el, index) => {
    const listItem = liTemplate.cloneNode(true);
    const taskName = listItem.querySelector(".taskName");
    const checkbox = listItem.querySelector('input[type="checkbox"]');
    const deleteButton = listItem.querySelector(".deleteButton");

    taskName.textContent = el.text;
    checkbox.checked = el.completed || false;

    if (el.completed) {
      taskName.style.textDecoration = "line-through";
      taskName.style.color = "#777";
    } else {
      taskName.style.textDecoration = "none";
      taskName.style.color = "#000";
    }

    checkbox.addEventListener("change", function () {
      el.completed = checkbox.checked;
      setItems(tasks);
      isCompleted(showCompleted);
    });

    listItem.addEventListener("mouseover", function () {
      deleteButton.style.display = "inline-block";
    });

    listItem.addEventListener("mouseout", function () {
      deleteButton.style.display = "none";
    });

    deleteButton.addEventListener("click", function () {
      tasks.splice(index, 1);
      setItems(tasks);
      isCompleted(showCompleted);
    });

    output.appendChild(listItem);
  });

  updateItemLeft();
};

active[0].addEventListener("click", function () {
  isCompleted(false);
});

done[0].addEventListener("click", function () {
  isCompleted(true);
});

var editTask = function (index) {
  const listItem = output.children[index];
  const taskName = listItem.querySelector(".taskName");
  const checkbox = listItem.querySelector('input[type="checkbox"]');

  taskName.contentEditable = true;
  checkbox.style.display = "none";

  taskName.addEventListener("blur", function () {
    taskName.contentEditable = false;
    checkbox.style.display = "inline-block";

    tasks[index].text = taskName.textContent;
    setItems(tasks);
    getItems();
  });

  taskName.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      taskName.blur();
    }
  });
};
output.addEventListener("dblclick", function (event) {
  if (event.target.classList.contains("taskName")) {
    const index = Array.from(output.children).indexOf(event.target.parentNode);
    editTask(index);
  }
});
