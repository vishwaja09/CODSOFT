const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function updateTaskList() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="task-title">${task}</span>
      <div class="task-actions">
        <button class="editTask" data-index="${index}">Edit</button>
        <button class="deleteTask" data-index="${index}">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  const deleteButtons = document.querySelectorAll('.deleteTask');
  deleteButtons.forEach(button => {
    button.addEventListener('click', event => {
      const index = event.target.getAttribute('data-index');
      tasks.splice(index, 1);
      updateTaskList();
      saveTasksToLocalStorage();
    });
  });

  const editButtons = document.querySelectorAll('.editTask');
  editButtons.forEach(button => {
    button.addEventListener('click', event => {
      const index = event.target.getAttribute('data-index');
      const taskText = tasks[index];
      taskInput.value = taskText;
      addTaskButton.textContent = 'Update Task';
      addTaskButton.dataset.editIndex = index;
    });
  });
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskButton.addEventListener('click', () => {
  const task = taskInput.value.trim();
  const editIndex = addTaskButton.dataset.editIndex;

  if (task !== '') {
    if (editIndex) {
      tasks[editIndex] = task;
      addTaskButton.textContent = 'Add Task';
      delete addTaskButton.dataset.editIndex;
    } else {
      tasks.push(task);
    }

    taskInput.value = '';
    updateTaskList();
    saveTasksToLocalStorage();
  }
});

updateTaskList();
