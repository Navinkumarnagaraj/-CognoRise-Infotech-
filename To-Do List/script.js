// variables
const addBtn = document.getElementById("add-btn");
const newTaskInput = document.querySelector(".wrapper-input");
const tasksContainer = document.getElementById("tasks");
const error = document.getElementById("error");

// Load tasks from localStorage
const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const taskHTML = `
            <div class="task" data-task-id="${task.id}">
                <span class="taskname">${task.name}</span>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;
        tasksContainer.insertAdjacentHTML("beforeend", taskHTML);
    });
};

// Save tasks to localStorage
const saveTasks = () => {
    const tasks = Array.from(document.querySelectorAll(".task")).map(taskElement => {
        return {
            id: taskElement.dataset.taskId,
            name: taskElement.querySelector(".taskname").innerText
        };
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Add task function
const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    const taskId = Date.now(); // Unique ID for each task
    const task = `
        <div class="task" data-task-id="${taskId}">
            <span class="taskname">${taskName}</span>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    `;

    tasksContainer.insertAdjacentHTML("beforeend", task);
    newTaskInput.value = "";
    saveTasks();
};

// Handle task actions
const handleTaskActions = (event) => {
    const target = event.target;
    const taskElement = target.closest('.task');

    if (target.classList.contains('delete')) {
        taskElement.remove();
        saveTasks();
    } else if (target.classList.contains('edit')) {
        newTaskInput.value = taskElement.querySelector('.taskname').innerText;
        taskElement.remove();
        saveTasks();
    }
};

// Add event listeners
addBtn.addEventListener("click", addTask);
tasksContainer.addEventListener("click", handleTaskActions);

// Initial load of tasks
loadTasks();
