// UI selector object
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const addBtn = document.querySelector('.btn');
const filter = document.querySelector('#filter');
const clearTask = document.querySelector('.clear-tasks');
const tasks = document.querySelector('.collection');
// listen for events that happens on the page 
const loadAllEvents = function () {
    // DOM Content Loaded
    document.addEventListener('DOMContentLoaded', showTasksInLS);
    form.addEventListener('submit', addTask);

    tasks.addEventListener('click', deleteTask);

    clearTask.addEventListener('click', clearAllTask);

    filter.addEventListener('keyup', filterTask)

}();
//DOM CONTENT LOADED
function showTasksInLS() {
    let alltasks;
    if (localStorage.getItem('tasks') === null) {
        alltasks = []
    } else {
        alltasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // Loop through and create DOM element
    alltasks.forEach(task => {
        // create an HTML element and append add it to the page
        const li = document.createElement('li');
        li.className = `collection-item`;
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = `delete-item secondary-content`;
        link.innerHTML = `<i class="fa fa-remove"></i>`;

        li.appendChild(link);

        tasks.appendChild(li);
    });
}
// functions of what happens when an event happens
function addTask(e) {
    if (taskInput.value === '') {
        alert(`Please enter a task`);
    } else {
        // create an HTML element and append add it to the page
        const li = document.createElement('li');
        li.className = `collection-item`;
        li.appendChild(document.createTextNode(taskInput.value));
        const link = document.createElement('a');
        link.className = `delete-item secondary-content`;
        link.innerHTML = `<i class="fa fa-remove"></i>`;
        li.appendChild(link);
        // insert it into DOM
        tasks.insertAdjacentElement('beforeend', li);
        // They can be achieved by appending child
        // tasks.appendChild(li);

        // Store in Local Storage
        storeinLocalStorage(taskInput.value);

        // clear fields
        taskInput.value = '';
    }
    e.preventDefault();
}

function storeinLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function deleteTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();

        deleteTaskfromLS(e.target.parentElement.parentElement);
    }
    e.preventDefault();
}

function clearAllTask() {
    tasks.innerHTML = '';
}

function filterTask(e) {
    const text = e.target.value.toLowerCase();
    const collectionList = Array.from(document.querySelectorAll('.collection-item'));
    collectionList.forEach(item => {
        const task = item.textContent;
        if (task.toLowerCase().indexOf(text) != -1) {
            item.style.display = `block`;
        } else {
            item.style.display = `none`;
        }
    })

}