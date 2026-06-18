const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const searchInput = document.getElementById("searchInput");
const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");
const darkBtn = document.getElementById("darkBtn");
const clearBtn = document.getElementById("clearBtn");
const emptyMessage = document.getElementById("emptyMessage");

function updateCounter() {
    const total =
        document.querySelectorAll("#taskList li").length;

    const completed =
        document.querySelectorAll("#taskList li.completed")
            .length;

    taskCounter.textContent =
        `Total: ${total} | Completed: ${completed}`;
}

function updateEmptyMessage() {
    const total =
        document.querySelectorAll("#taskList li").length;

    emptyMessage.style.display =
        total === 0 ? "block" : "none";
}

function saveTasks() {
    localStorage.setItem(
        "tasks",
        taskList.innerHTML
    );

    updateCounter();
    updateEmptyMessage();
}

function addEvents(task) {

    task.addEventListener("click", function () {
        task.classList.toggle("completed");
        saveTasks();
    });

    const editBtn =
        task.querySelector(".editBtn");

    const deleteBtn =
        task.querySelector(".deleteBtn");

    editBtn.addEventListener(
        "click",
        function (event) {
            event.stopPropagation();

            const title =
                task.querySelector("h3");

            const newTask =
                prompt(
                    "Edit task:",
                    title.textContent
                );

            if (
                newTask &&
                newTask.trim() !== ""
            ) {
                title.textContent = newTask;
                saveTasks();
            }
        }
    );

    deleteBtn.addEventListener(
        "click",
        function (event) {
            event.stopPropagation();

            task.remove();
            saveTasks();
        }
    );
}

function addTask() {

    const task =
        taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    const created =
        new Date().toLocaleString();

    const due =
        dueDate.value || "No due date";

    const li =
        document.createElement("li");

    li.innerHTML = `
        <div class="task-info">
            <h3>${task}</h3>
            <small>
                Created: ${created}
            </small>
            <small>
                Due: ${due}
            </small>
        </div>

        <div class="task-buttons">
            <button class="editBtn">
                Edit
            </button>

            <button class="deleteBtn">
                Delete
            </button>
        </div>
    `;

    taskList.appendChild(li);

    addEvents(li);

    saveTasks();

    taskInput.value = "";
    dueDate.value = "";
}

function loadTasks() {

    taskList.innerHTML =
        localStorage.getItem("tasks") || "";

    const tasks =
        document.querySelectorAll(
            "#taskList li"
        );

    tasks.forEach(task => {
        addEvents(task);
    });

    updateCounter();
    updateEmptyMessage();
}

addBtn.addEventListener(
    "click",
    addTask
);

taskInput.addEventListener(
    "keypress",
    function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    }
);

searchInput.addEventListener(
    "keyup",
    function () {

        const value =
            searchInput.value.toLowerCase();

        const tasks =
            document.querySelectorAll(
                "#taskList li"
            );

        tasks.forEach(task => {

            const text =
                task
                    .querySelector("h3")
                    .textContent
                    .toLowerCase();

            task.style.display =
                text.includes(value)
                    ? "flex"
                    : "none";
        });
    }
);

allBtn.addEventListener(
    "click",
    function () {
        document
            .querySelectorAll("#taskList li")
            .forEach(task => {
                task.style.display = "flex";
            });
    }
);

activeBtn.addEventListener(
    "click",
    function () {
        document
            .querySelectorAll("#taskList li")
            .forEach(task => {
                task.style.display =
                    task.classList.contains(
                        "completed"
                    )
                        ? "none"
                        : "flex";
            });
    }
);

completedBtn.addEventListener(
    "click",
    function () {
        document
            .querySelectorAll("#taskList li")
            .forEach(task => {
                task.style.display =
                    task.classList.contains(
                        "completed"
                    )
                        ? "flex"
                        : "none";
            });
    }
);

darkBtn.addEventListener(
    "click",
    function () {
        document.body.classList.toggle(
            "dark"
        );
    }
);

clearBtn.addEventListener(
    "click",
    function () {
        if (
            confirm(
                "Delete all tasks?"
            )
        ) {
            taskList.innerHTML = "";
            saveTasks();
        }
    }
);

loadTasks();