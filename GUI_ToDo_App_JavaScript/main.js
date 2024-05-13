const taskText = document.querySelector(".taskText");
const taskAppendButton = document.querySelector("button");
const taskList = document.querySelector(".taskList");

taskAppendButton.addEventListener("click", () => {
    if (taskText.value === "") {
        return;
    }
    const taskContent = document.createElement("p");
    taskContent.textContent = taskText.value;
    taskList.appendChild(taskContent);
    
    const taskCompleteButton = document.createElement("button");
    taskContent.appendChild(taskCompleteButton);
    taskCompleteButton.textContent = "完了";

    taskCompleteButton.addEventListener("click", () => {
        taskContent.remove();
    });
});

taskText.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
        return;
    }
    if (taskText.value === "") {
        return;
    }
    const taskContent = document.createElement("p");
    taskContent.textContent = taskText.value;
    taskList.appendChild(taskContent);
    
    const taskCompleteButton = document.createElement("button");
    taskContent.appendChild(taskCompleteButton);
    taskCompleteButton.textContent = "完了";

    taskCompleteButton.addEventListener("click", () => {
        taskContent.remove();
    });
})