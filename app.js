// Collect base elements needed to the app
const taskInput = document.querySelector(".add-task__input");
const addButton = document.querySelector(".add-task__btn");
const tasksIncompleted = document.querySelector(".tasks__list-incompleted");
const tasksCompleted = document.querySelector(".tasks__list-completed");

// Add new Task task list item
const createNewTask = function(taskString) {
    // Create task element and its components
    const listItem = document.createElement("li");
    listItem.classList.add("tasks__item");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("task__check");
    
    const label = document.createElement("label");
    label.classList.add("task__label");
    label.innerText = taskString;

    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.classList.add("task__input");

    const editButton = document.createElement("button");
    editButton.classList.add("task__btn");
    editButton.innerText = "Edit";
    editButton.classList.add("task__btn-edit");
    
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("task__btn");
    deleteButton.classList.add("task__btn-delete");

    const deleteButtonImg = document.createElement("img");
    deleteButtonImg.classList.add("btn-delete__img");
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.alt = "Tilted upwards pointer with 'x' symbol inside, levelling off and pointing to the concerned task when hovered";
    deleteButton.appendChild(deleteButtonImg);
    
    //gather task components (into list__item).
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(textInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

const addTask = function() {
    //Create a new list item with the text from the .add-task__input:  
    
    // check whether add-task__input is empt and prevent creation of empty tasks.
    if (!taskInput.value) return;

    const listItem = createNewTask(taskInput.value);

    //Append listItem to tasksIncompleted
    tasksIncompleted.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

//Edit an existing task.
const editTask = function() {
    const listItem = this.parentNode;

    const textInput = listItem.querySelector(".task__input");
    const label = listItem.querySelector(".task__label");
    const editBtn = listItem.querySelector(".task__btn-edit");
   
    //check if class .tasks__item-edited is present on the parent elem
    const containsClass = listItem.classList.contains("tasks__item-edited");
    //Change edit to save when you are in edit mode.
    if (containsClass) {
        label.innerText = textInput.value;
        editBtn.innerText = "Edit";
    } else {
        textInput.value = label.innerText;
        editBtn.innerText = "Save";
    }
    //toggle .tasks__item-edited on the parent.
    listItem.classList.toggle("tasks__item-edited");
};

//Delete task
const deleteTask = function() {
    /* console.log("Delete Task..."); */
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
}

//Mark task completed
const taskCompleted = function() {
    //Append the task list item to the .tasks__list-completed
    const listItem = this.parentNode;
    tasksCompleted.appendChild(listItem);
    bindTaskEvents(listItem, taskIncompleted);
}

const taskIncompleted = function() {
    //When the checkbox is unchecked
    //Append the task list item to the .tasks__list-incompleted
    const listItem=this.parentNode;
    tasksIncompleted.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem,checkBoxEventHandler) {
    //select ListItems children
    const checkBox = taskListItem.querySelector(".task__check");
    const editButton = taskListItem.querySelector(".task__btn-edit");
    const deleteButton = taskListItem.querySelector(".task__btn-delete");

    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over tasksIncompleted ul list items
for (let i = 0; i < tasksIncompleted.children.length; i++) {
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(tasksIncompleted.children[i], taskCompleted);
}

//cycle over tasksCompleted ul list items
for (let i = 0; i < tasksCompleted.children.length; i++) {
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(tasksCompleted.children[i], taskIncompleted);
}
