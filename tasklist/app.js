// declare UI variables
const form = document.querySelector('#task-form'),
    taskInput = document.querySelector('#task'),
    filter = document.querySelector('#filter'),
    taskList = document.querySelector('.collection'),
    cleatButton = document.querySelector('.clear-tasks');

// initialize event listeners
startallEventListeners();

// write function for list initializing list item
function startallEventListeners() {
    // add task event
    form.addEventListener('submit', addTaskitem);
}

// function for adding task item
function addTaskitem(e) {
    console.log(e.target);
    //prevent form default behaviour;
    e.preventDefault();
}