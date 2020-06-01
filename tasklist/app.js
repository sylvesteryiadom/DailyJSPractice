// UI selector object
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const addBtn = document.querySelector('.btn');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');
const tasksList = document.querySelector('.collection');
// listen for events that happens on the page 

loadAllevents();

function loadAllevents() {
    // Display items in LS on DOM content loaded
    document.addEventListener('DOMContentLoaded', showTasks);

    form.addEventListener('submit', addTask);

    tasksList.addEventListener('click', deleteTask);

    clearBtn.addEventListener('click', clearAllTask);

    filter.addEventListener('keyup', filterTask);
};

function addTask(e) {
    if (taskInput.value === '') {
        console.log(`Enter a value`);
    } else {
        // create new element and append to UI
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        tasksList.appendChild(li);
        // add item to local storage
        storeItemInLocalStorage(taskInput.value);
        //clear Field
        taskInput.value = '';
    };
    e.preventDefault();
};

function storeItemInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // push unto arrays in local Storage
    tasks.push(task);
    // Set local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();

        //remove Item from LS
        deleteTaskfromLocalStorage(e.target.parentElement.parentElement);
    };
    e.preventDefault();
};

function deleteTaskfromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task, index) => {
        if (task === taskItem.textContent) {
            tasks.splice(index, 1);
        };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

function clearAllTask() {
    tasksList.innerHTML = '';
    // clear task from LS
    clearItemsfromLocalStorage();
};

function clearItemsfromLocalStorage() {
    localStorage.clear();
};

function filterTask(e) {
    const text = e.target.value.toLowerCase();
    const allListItems = Array.from(document.querySelectorAll('.collection-item'));
    allListItems.forEach(item => {
        if (item.textContent.toLowerCase().indexOf(text) != -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
};

function showTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // Loop through whats available and create task using whats already in there
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        tasksList.appendChild(li);
    });
};