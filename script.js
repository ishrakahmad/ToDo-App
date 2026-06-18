const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
    taskList.innerHTML = localStorage.getItem("tasks") || "";

    const tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(task => {

        task.addEventListener("click", function () {
            this.classList.toggle("completed");
            saveTasks();
        });

        const deleteBtn = task.querySelector(".deleteBtn");

        deleteBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            task.remove();
            saveTasks();
        });
    });
}

addBtn.addEventListener("click", function () {

    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <span>${task}</span>
        <button class="deleteBtn">Delete</button>
    `;

    taskList.appendChild(li);

    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        saveTasks();
    });

    const deleteBtn = li.querySelector(".deleteBtn");

    deleteBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        li.remove();
        saveTasks();
    });

    saveTasks();
    taskInput.value = "";
});

loadTasks();