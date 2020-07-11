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
    form.addEventListener('submit', addTaskItem);
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
        // add list item to the DOM
        taskList.appendChild(listEl);
        // clear task input
        taskInput.value = '';
    }
    //prevent form default behaviour;
    e.preventDefault();
}