// script.js

document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.name}</span>
                <div class="task-buttons">
                    <button class="complete-button">${task.completed ? 'Uncomplete' : 'Complete'}</button>
                    <button class="edit-button">Edit</button>
                    <button class="delete-button">Delete</button>
                </div>
            `;
            taskList.appendChild(li);

            // Event Listeners
            li.querySelector('.complete-button').addEventListener('click', () => {
                task.completed = !task.completed;
                updateTasks();
            });

            li.querySelector('.edit-button').addEventListener('click', () => {
                const newTaskName = prompt('Edit task', task.name);
                if (newTaskName) {
                    task.name = newTaskName;
                    updateTasks();
                }
            });

            li.querySelector('.delete-button').addEventListener('click', () => {
                tasks.splice(index, 1);
                updateTasks();
            });
        });
    };

    const updateTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    addTaskButton.addEventListener('click', () => {
        const taskName = taskInput.value.trim();
        if (taskName) {
            tasks.push({ name: taskName, completed: false });
            updateTasks();
            taskInput.value = '';
        }
    });

    renderTasks();
});
