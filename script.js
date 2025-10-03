document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    let tasks = [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((taskText, index) => {
            const li = document.createElement('li');
            li.classList.add('task-item'); 
            const span = document.createElement('span');
            span.textContent = taskText;
            li.appendChild(span);

  
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('remove-btn');

            removeBtn.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }

    /**
     * Add a task.
     * @param {string} [taskText] - Optional task text. If omitted, value is taken from the input.
     * @param {boolean} [save=true] - Whether to save the updated tasks array to Local Storage.
     */
    function addTask(taskText, save = true) {
        // Determine text source: argument or input field
        const text = (typeof taskText === 'string' ? taskText : taskInput.value).trim();


        if (text === '') {
            // Only show alert when user invoked add
            if (save) alert('Please enter a task!');
            return;
        }

        // Add to array
        tasks.push(text);

        // Save to Local Storage if requested
        if (save) saveTasks();

        // Re-render list to show the new task
        renderTasks();

        // Clear input only when user added via the input (not when loading)
        if (typeof taskText !== 'string') {
            taskInput.value = '';
        }
    }

    // Load tasks from Local Storage and populate the UI
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        storedTasks.forEach(task => addTask(task, false));
    }

    // Attach event listeners
    addButton.addEventListener('click', () => addTask()); // click to add
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') addTask(); // Enter to add
    });

    // Initialize app by loading saved tasks
    loadTasks();
});
