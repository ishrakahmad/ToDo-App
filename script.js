const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");

function updateCounter() {
    const total =
        document.querySelectorAll("#taskList li").length;

    const completed =
        document.querySelectorAll("#taskList li.completed").length;

    taskCounter.textContent =
        `Total: ${total} | Completed: ${completed}`;
}

function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
    updateCounter();
}

function addEvents(task) {

    task.addEventListener("click", function () {
        task.classList.toggle("completed");
        saveTasks();
    });

    const editBtn = task.querySelector(".editBtn");

    editBtn.addEventListener("click", function (event) {
        event.stopPropagation();

        const span = task.querySelector("span");

        const newTask =
            prompt("Edit your task:", span.textContent);

        if (newTask !== null && newTask.trim() !== "") {
            span.textContent = newTask;
            saveTasks();
        }
    });

    const deleteBtn = task.querySelector(".deleteBtn");

    deleteBtn.addEventListener("click", function (event) {
        event.stopPropagation();

        task.remove();
        saveTasks();
    });
}

function loadTasks() {
    taskList.innerHTML =
        localStorage.getItem("tasks") || "";

    const tasks =
        document.querySelectorAll("#taskList li");

    tasks.forEach(task => {
        addEvents(task);
    });

    updateCounter();
}

function addTask() {

    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <span>${task}</span>

        <div class="task-buttons">
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        </div>
    `;

    taskList.appendChild(li);

    addEvents(li);

    saveTasks();

    taskInput.value = "";
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

loadTasks();