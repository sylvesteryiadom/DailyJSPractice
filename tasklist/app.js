// declare UI variables
const form = document.querySelector('#task-form'),
    taskInput = document.querySelector('#task'),
    filter = document.querySelector('#filter'),
    taskList = document.querySelector('.collection'),
    clearButton = document.querySelector('.clear-tasks');

// initialize event listeners
startallEventListeners();

// write function for list initializing list item
function startallEventListeners() {
    // load items when DOM loads
    document.addEventListener('DOMContentLoaded', loadAllTask);
    // add task event
    form.addEventListener('submit', addTaskItem);
    // delete task item
    taskList.addEventListener('click', deleteListItem);
    // clear all task
    clearButton.addEventListener('click', clearTasks);
    // filter task
    filter.addEventListener('keyup', filterText);
}
// DOM CONTENT LOADED
function loadAllTask() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // loop available task to create UI task using what is available in LS;
    tasks.forEach(function (task) {
        // create list item
        const listEl = document.createElement('li');
        // Add text Node
        listEl.appendChild(document.createTextNode(task));
        // add a class name to the list item
        listEl.className = `collection-item`;
        // add the 'x' mark to it, which is a link/a tag el
        const linkEl = document.createElement('a');
        linkEl.className = `delete-item secondary-content`;
        // add innerHTML remove icon
        linkEl.innerHTML = `<i class="fa fa-remove"></i>`;
        // append link element to list item/el
        listEl.appendChild(linkEl);
        // add list item to the DOM , we append so additional task are added below it
        taskList.appendChild(listEl);
    })

}
// function for adding task item
function addTaskItem(e) {
    if (taskInput.value === '') {
        alert(`Please enter a task`);
    } else { // dynamically insert a task item from scratch
        // create list item
        const listEl = document.createElement('li');
        // Add text Node
        listEl.appendChild(document.createTextNode(taskInput.value));
        // add a class name to the list item
        listEl.className = `collection-item`;
        // add the 'x' mark to it, which is a link/a tag el
        const linkEl = document.createElement('a');
        linkEl.className = `delete-item secondary-content`;
        // add innerHTML remove icon
        linkEl.innerHTML = `<i class="fa fa-remove"></i>`;
        // append link element to list item/el
        listEl.appendChild(linkEl);
        // add list item to the DOM , we append so additional task are added below it
        taskList.appendChild(listEl);

        // add item to localStorage
        storeItemInLocalStorage(taskInput.value);
        // clear task input
        taskInput.value = '';
    }
    //prevent form default behaviour;
    e.preventDefault();
}

// Store item in local Storage
/** LS storages items as JSON array as a string*/
function storeItemInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };
    // push unto what we already have in LS
    tasks.push(task);
    // set items back to LS as a JSON string
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// delete task function
function deleteListItem(e) {
    // check if target contains what we want to delete
    if (e.target.parentElement.classList.contains('delete-item')) {
        // move up in the DOM to delete entire li element
        e.target.parentElement.parentElement.remove();

        // delete task from LS
        deleteTaskfromLS(e.target.parentElement.parentElement);
    }
}

// delete task from LS
function deleteTaskfromLS(taskItem) {
    // check to see if there is an item in LS
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };
    // Loop through whats there and delete one that matches what is passed in.
    tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
            // we can splice it because it an array
            tasks.splice(index, 1);
        };
    });
    // since we altered LS, lets set it back
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// clear all task
function clearTasks() {
    // taskList.innerHTML = '';
    // https: //jsperf.com/innerhtml-vs-removechild/47
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear all task from LS
    clearTaskfromLS();
}

// clear task from LS;
function clearTaskfromLS() {
    localStorage.clear();
}

function filterText(e) {
    // capture incoming text
    const text = e.target.value.toLowerCase();
    // select all existing list items and loop through each and compare
    const listItems = document.querySelectorAll('.collection-item');
    // loop through each task item
    Array.from(listItems).forEach(function (task) {
        // convert each task item to lowercase to match incoming text
        const item = task.firstChild.textContent.toLowerCase();
        if (item.indexOf(text) != -1) { // =-1 means its not there.
            task.style.display = 'block'; // display item that matches
        } else {
            task.style.display = 'none'; // do not display task that does not match
        };
    })
}