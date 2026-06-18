const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", function () {

    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        ${task}
        <button class="deleteBtn">Delete</button>
    `;

    taskList.appendChild(li);
    
    li.addEventListener("click", function () {
        li.classList.toggle("completed");
    });

    taskInput.value = "";

    const deleteBtn = li.querySelector(".deleteBtn");

    deleteBtn.addEventListener("click", function () {
        li.remove();
    });

});