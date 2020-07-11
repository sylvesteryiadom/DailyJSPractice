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
    // add task event
    form.addEventListener('submit', addTaskItem);
    // delete task item
    taskList.addEventListener('click', deleteListItem);
    // clear all task
    clearButton.addEventListener('click', clearTasks);
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
        // clear task input
        taskInput.value = '';
    }
    //prevent form default behaviour;
    e.preventDefault();
}

// delete task function
function deleteListItem(e) {
    // check if target contains what we want to delete
    if (e.target.parentElement.classList.contains('delete-item')) {
        // move up in the DOM to delete entire li element
        e.target.parentElement.parentElement.remove();
    }
}

// clear all task
function clearTasks() {
    // taskList.innerHTML = '';
    // https: //jsperf.com/innerhtml-vs-removechild/47
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}