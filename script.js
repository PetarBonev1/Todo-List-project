// Retrieve todo from local storage or initialize an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

// Select the filter buttons
const showAllBtn = document.getElementById("showAll");
const showCompletedBtn = document.getElementById("showCompleted");
const showPendingBtn = document.getElementById("showPending");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents default Enter key behavior
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  showAllBtn.addEventListener("click", () => filterTasks("all"));
  showCompletedBtn.addEventListener("click", () => filterTasks("completed"));
  showPendingBtn.addEventListener("click", () => filterTasks("pending"));
  displayTasks();
});

function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({ text: newTask, disabled: false });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
}

function displayTasks(filteredTasks = todo) {
  todoList.innerHTML = "";
  filteredTasks.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""}>
        <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}" onclick="editTask(${index})">${item.text}</p>
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () => toggleTask(index));
    todoList.appendChild(p);
  });
  todoCount.textContent = filteredTasks.length;
}

function editTask(index) {
  const todoItem = document.getElementById(todo-$,{index});
  const existingText = todo[index].text;
  const inputElement = document.createElement("input");

  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });
}

function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

function deleteAllTasks() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}

function filterTasks(filter) {
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  switch (filter) {
    case "completed":
      showCompletedBtn.classList.add("active");
      displayTasks(todo.filter(task => task.disabled));
      break;
    case "pending":
      showPendingBtn.classList.add("active");
      displayTasks(todo.filter(task => !task.disabled));
      break;
    default:
      showAllBtn.classList.add("active");
      displayTasks(todo);
  }
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}
