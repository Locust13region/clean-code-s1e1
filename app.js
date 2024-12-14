//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task");
const addButton = document.getElementById("add-button");
addButton.addEventListener("click",addTaskHandler);

//New task list item
function createNewTaskElement (taskString){
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");
  listItem.className = "task__row list__item"
  checkBox.type = "checkbox";
  checkBox.className = "item__checkbox"
  label.innerText = taskString;
  label.className = "item__label";
  editInput.type = "text";
  editInput.className = "item__input";
  editButton.innerText = "Edit";
  editButton.className = "btn item__edit";
  deleteButton.className = "btn";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "item__delete";
  deleteButton.appendChild(deleteButtonImg);
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

function addTaskHandler (){
  if (!taskInput.value || !taskInput.value.trim()) {
    taskInput.value = "";
    return
  } else {
    console.log("Add Task...");
    ajaxRequest();
    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
  }
}
function ajaxRequest (){
  console.log("AJAX Request");
}

function editTaskHandler (){
  console.log("Edit Task...");
  const listItem = this.closest(".list__item");
  const editInput = listItem.querySelector(".item__input");
  const label = listItem.querySelector(".item__label");
  const editBtn = listItem.querySelector(".item__edit");
  const containsClass = listItem.classList.contains("list__item_edit");
  if(containsClass){
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  }else{
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("list__item_edit");
};

function deleteTaskHandler (){
	console.log("Delete Task...");
  const listItem = this.closest(".list__item");
  const ul = listItem.closest("ul");
  ul.removeChild(listItem);
}

function taskCompleted (){
  console.log("Complete Task...");
  const listItem=this.closest(".list__item");;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete (){
  console.log("Incomplete Task...");
  const listItem=this.closest(".list__item");;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



function bindTaskEvents (taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  const checkBox = taskListItem.querySelector(".item__checkbox");
  const editButton = taskListItem.querySelector(".item__edit");
  const deleteButton = taskListItem.querySelector(".item__delete");
  editButton.onclick = editTaskHandler;
  deleteButton.onclick = deleteTaskHandler;
  checkBox.onchange = checkBoxEventHandler;
}

//for each incompleteTaskHolder ul list__item bind events
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
for (let i = 0; i < incompleteTaskHolder.children.length; i ++){
	bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//for each completedTasksHolder ul list__item bind events
const completedTasksHolder = document.getElementById("completed-tasks");
for (let i = 0; i < completedTasksHolder.children.length; i ++){
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
