// Declare UI variables
taskInput = document.querySelector('#task');
form = document.querySelector('#task-form');
taskList = document.querySelector('.collection');
filter = document.querySelector('#filter');
clearBtn = document.querySelector('.clear-tasks');

// load event listener
loadAlleventListeners();

// event listener function
function loadAlleventListeners() {
    // add task event
    form.addEventListener('submit', addTask);
};

function addTask(e) {
    if (taskInput.value === '') {
        alert(`Enter a task`);
    }
    // Create task from scratch
    const li = document.createElement('li');
    // add classname
    li.className = `collection-item`;
    // add incoming text to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create link
    const link = document.createElement('a');
    link.className = `delete-item secondary-content`;
    // add icon HTML
    link.innerHTML = `<i class="fa fa-remove"></i>`;
    // append link to li
    li.appendChild(link);
    // add link to list items (DOM)
    taskList.appendChild(li);
    // clear input field afte adding item
    taskInput.value = '';

    e.preventDefault();
};