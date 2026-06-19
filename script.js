const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");
const category = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const searchInput = document.getElementById("searchInput");

loadTasks();

function saveTasks() {
    localStorage.setItem(
        "tasks",
        taskList.innerHTML
    );
}

function loadTasks() {
    taskList.innerHTML =
        localStorage.getItem("tasks") || "";

        attachEvents();
        updateCounter();
        updateProgress();
        checkOverdue();

}


function checkOverdue() {

    const tasks =
        document.querySelectorAll("#taskList li");

    tasks.forEach(li => {

        const match =
            li.innerText.match(
                /Due:\s*(.*)/
            );

        if (!match) return;

        const due = match[1];

        if (due === "None") return;

        const today =
            new Date()
            .toISOString()
            .split("T")[0];

        if (due < today) {
            li.classList.add("overdue");
        }
    });
}

function attachEvents() {

    const tasks =
        document.querySelectorAll("#taskList li");

    tasks.forEach(li => {

        li.addEventListener(
            "click",
            function () {
                li.classList.toggle("completed");

                saveTasks();
                updateCounter();
                updateProgress();
            }
        );

        const deleteBtn =
            li.querySelector(".deleteBtn");

        if (deleteBtn) {
            deleteBtn.onclick = function (e) {
                e.stopPropagation();

                li.remove();

                saveTasks();
                updateCounter();
                updateProgress();
            };
        }

        const editBtn =
            li.querySelector(".editBtn");

        if (editBtn) {

            editBtn.onclick = function (e) {
                e.stopPropagation();

                const text =
                    prompt(
                        "Edit Task:",
                        li.querySelector(
                            ".taskText"
                        ).innerText
                    );

                if (text) {
                    li.querySelector(
                        ".taskText"
                    ).innerText = text;

                    saveTasks();
                }
            };
        }

    });
}

addBtn.addEventListener(
    "click",
    function () {

        const task =
            taskInput.value.trim();

        if (task === "") {
            alert("Enter a task!");
            return;
        }

        const li =
            document.createElement("li");

        li.classList.add(
            priority.value.toLowerCase()
        );

        const created =
            new Date()
            .toLocaleString();

        li.innerHTML = `
        <div>

            <strong class="taskText">
                ${task}
            </strong>

            <br>

            <small>
                Priority:
                ${priority.value}
            </small> 

            <br>

            <small>
                Category:
              ${category.value}
            </small>
            

            <br>

            <small>
                Created:
                ${created}
            </small>

            <br>

            <small>
                Due:
                ${dueDate.value || "None"}
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

        taskInput.value = "";
        dueDate.value = "";
        priority.value = "Medium";
        category.value = "Study";

        saveTasks();
        attachEvents();
        updateCounter();
        updateProgress();
    }
);

taskInput.addEventListener(
    "keydown",
    function (e) {

        if (e.key === "Enter") {
            addBtn.click();
        }
    }
);

function updateCounter() {

    const total =
        document.querySelectorAll(
            "#taskList li"
        ).length;

    const completed =
        document.querySelectorAll(
            ".completed"
        ).length;

    counter.innerText =
        `Total: ${total} | Completed: ${completed}`;
}

function updateProgress() {

    const total =
        document.querySelectorAll(
            "#taskList li"
        ).length;

    const completed =
        document.querySelectorAll(
            ".completed"
        ).length;

    let percent = 0;

    if (total > 0) {
        percent =
            (completed / total) * 100;
    }

    document.getElementById(
        "progressBar"
    ).style.width =
        percent + "%";

    document.getElementById(
        "progressText"
    ).innerText =
        Math.round(percent) +
        "% Completed";
}

searchInput.addEventListener(
    "keyup",
    function () {

        const text =
            searchInput.value.toLowerCase();

        document
            .querySelectorAll(
                "#taskList li"
            )
            .forEach(li => {

                li.style.display =
                    li.innerText
                        .toLowerCase()
                        .includes(text)
                        ? "flex"
                        : "none";
            });
    }
);

document.getElementById(
    "darkBtn"
).onclick = function () {
    document.body.classList.toggle(
        "dark"
    );
};

document.getElementById(
    "clearBtn"
).onclick = function () {

    if (
        confirm(
            "Delete all tasks?"
        )
    ) {

        taskList.innerHTML = "";

        saveTasks();
        updateCounter();
        updateProgress();
    }
};

document.getElementById(
    "allBtn"
).onclick = function () {

    document
        .querySelectorAll(
            "#taskList li"
        )
        .forEach(li => {
            li.style.display = "flex";
        });
};

document.getElementById(
    "activeBtn"
).onclick = function () {

    document
        .querySelectorAll(
            "#taskList li"
        )
        .forEach(li => {

            li.style.display =
                li.classList.contains(
                    "completed"
                )
                    ? "none"
                    : "flex";
        });
};

document.getElementById(
    "completedBtn"
).onclick = function () {

    document
        .querySelectorAll(
            "#taskList li"
        )
        .forEach(li => {

            li.style.display =
                li.classList.contains(
                    "completed"
                )
                    ? "flex"
                    : "none";
        });
};

document.getElementById(
    "sortPriorityBtn"
).onclick = function () {

    const tasks =
        Array.from(taskList.children);

    const order = {
        High: 1,
        Medium: 2,
        Low: 3
    };

    tasks.sort((a, b) => {

        const p1 =
            a.innerText
                .match(
                    /Priority:\s*(High|Medium|Low)/
                )[1];

        const p2 =
            b.innerText
                .match(
                    /Priority:\s*(High|Medium|Low)/
                )[1];

        return order[p1] -
               order[p2];
    });

    taskList.innerHTML = "";

    tasks.forEach(task => {
        taskList.appendChild(task);
    });

    saveTasks();
};

document.getElementById(
    "sortDateBtn"
).onclick = function () {

    const tasks =
        Array.from(taskList.children);

    tasks.sort((a, b) => {

        const d1 =
            a.innerText
                .match(
                    /Due:\s*(.*)/
                )[1];

        const d2 =
            b.innerText
                .match(
                    /Due:\s*(.*)/
                )[1];

        if (d1 === "None")
            return 1;

        if (d2 === "None")
            return -1;

        return new Date(d1) -
               new Date(d2);
    });

    taskList.innerHTML = "";

    tasks.forEach(task => {
        taskList.appendChild(task);
    });

    saveTasks();
};