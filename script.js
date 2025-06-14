// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load existing tasks from localStorage
  loadTasks();

  // Add task on button click
  addButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }
    addTask(taskText); // Add and save
    taskInput.value = ""; // Clear input
  });

  // Add task on pressing Enter key
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const taskText = taskInput.value.trim();
      if (taskText === "") {
        alert("Please enter a task.");
        return;
      }
      addTask(taskText);
      taskInput.value = "";
    }
  });

  // Function to create and display a task
  function addTask(taskText, save = true) {
    const li = document.createElement("li");
    li.textContent = taskText;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";

    // Remove task when the button is clicked
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      removeFromLocalStorage(taskText);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    if (save) {
      saveToLocalStorage(taskText);
    }
  }

  // Save a task to localStorage
  function saveToLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Remove a task from localStorage
  function removeFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks = tasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Load tasks from localStorage on page load
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false));
  }
});
