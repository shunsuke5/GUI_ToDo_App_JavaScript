const taskText = document.querySelector(".taskText")
const taskAppendButton = document.querySelector(".taskAppend");
let taskCompleteButton = document.createElement("button");

taskAppendButton.addEventListener("click", appendTask);

function appendTask() {
    let newTask = document.createElement("p");
    newTask.textContent = taskText.textContent;
    document.body.append("abc");
    document.body.append("button");
    taskCompleteButton.addEventListener("click", completeTask);
}

function completeTask() {

}