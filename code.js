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

    if (el.completed) {
      li1.style.textDecoration = "line-through";
      li1.style.color = "#777";
    }
    output.appendChild(li1);
    li1.appendChild(checkbox);

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", function () {
      tasks.splice(index, 1);
      setItems(tasks);
      getItems();
    });

    li1.addEventListener("mouseover", function () {
      deleteButton.style.display = "inline-block";
    });

    li1.addEventListener("mouseout", function () {
      deleteButton.style.display = "none";
    });
    li1.appendChild(deleteButton);

    output.appendChild(li1);
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
      event.target.parentNode.style.textDecoration = "line-through";
      event.target.parentNode.style.color = "#777";
    } else {
      event.target.classList.remove("checkbox-checked");
      event.target.parentNode.style.textDecoration = "none";
      event.target.parentNode.style.color = "black";
    }
    updateItemLeft();
    setItems(tasks);
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

  filteredTasks.map((el, index) => {
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

active[0].addEventListener("click", function () {
  isCompleted(false);
});

done[0].addEventListener("click", function () {
  isCompleted(true);
});

output.addEventListener("dblclick", function (event) {
  if (event.target.tagName === "LI") {
    var checkbox = event.target.querySelector("input[type='checkbox']");
    checkbox.style.visibility = "hidden";

    event.target.setAttribute("contenteditable", "true");
    event.target.focus();

    event.target.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        event.target.removeAttribute("contenteditable");
        checkbox.style.visibility = "visible";

        var index = Array.from(event.target.parentNode.children).indexOf(
          event.target
        );
        tasks[index].text = event.target.textContent;
        setItems(tasks);
        getItems();
      }
    });

    event.target.addEventListener("blur", function () {
      event.target.removeAttribute("contenteditable");
      checkbox.style.visibility = "visible";

      var index = Array.from(event.target.parentNode.children).indexOf(
        event.target
      );
      tasks[index].text = event.target.textContent;
      setItems(tasks);
      getItems();
    });
  }
});
