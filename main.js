const taskText = document.querySelector(".taskText");
const taskAppendButton = document.querySelector(".taskAppend");
let taskContent;
let taskCompleteButton;

taskAppendButton.addEventListener("click", appendTask);

function appendTask() {
    taskContent = document.createElement("p");
    taskContent.textContent = taskText.value;
    document.body.append(taskContent);
    
    taskCompleteButton = document.createElement("button");
    taskCompleteButton.textContent = "完了";
    taskContent.appendChild(taskCompleteButton);
    taskCompleteButton.addEventListener("click", completeTask);
}

function completeTask() {
    // taskCompleteButton.parentNode.removeChild(taskCompleteButton)
}