const taskText = document.querySelector("#taskText");
const taskAppendButton = document.querySelector("button");
const taskList = document.querySelector("ul");
const form = document.querySelector("form");

let db;

const openRequest = window.indexedDB.open("todo_db", 1);

openRequest.addEventListener("error", () => 
    console.error("Database failed to open"),
);

openRequest.addEventListener("success", () => {
    console.log("Database opened successfully");

    db = openRequest.result;
    displayData();
});

openRequest.addEventListener("upgradeneeded", (e) => {
    db = e.target.result;
    const objectStore = db.createObjectStore("todo_os", {
        keyPath: "id",
        autoIncrement: true,
    });

    objectStore.createIndex("taskContent", "taskContent", { unique: false });
    console.log("Database setup complete");
});

form.addEventListener("submit", addData);

function addData(e) {
    if (taskText.value === "") {
        return;
    }
    e.preventDefault();
    const newItem = { taskContent: taskText.value };
    const transaction = db.transaction(["todo_os"], "readwrite");
    const objectStore = transaction.objectStore("todo_os");
    const addRequest = objectStore.add(newItem);

    addRequest.addEventListener("success", () => {
        taskText.value = "";
    });

    transaction.addEventListener("complete", () => {
        console.log("Transaction completed: database modification finished.");
        displayData();
    });

    transaction.addEventListener("error", () => 
        console.log("Transaction not opened due to error")
    );
}

function displayData() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    const objectStore = 
    db.transaction("todo_os").objectStore("todo_os");
    objectStore.openCursor().addEventListener("success", (e) => {
        const cursor = e.target.result;

        if (cursor) {
            const listItem = document.createElement("li");
            const taskContent = document.createElement("p");
            
            listItem.appendChild(taskContent);
            taskList.appendChild(listItem);

            taskContent.textContent = cursor.value.taskContent
            listItem.setAttribute("data-note-id", cursor.value.id);

            const completeBtn = document.createElement("button");
            listItem.appendChild(completeBtn);
            completeBtn.textContent = "完了";

            completeBtn.addEventListener("click", completeItem);
            cursor.continue();
            
        } else {
            if (!taskList.firstChild) {
                const listItem = document.createElement("li");
                listItem.textContent = "No task.";
                taskList.appendChild(listItem);
            }

            console.log("tasks all displayed");
        }
    });
}

function completeItem(e) {
    const noteId = Number(e.target.parentNode.getAttribute("data-note-id"));
    const transaction = db.transaction(["todo_os"], "readwrite");
    const objectStore = transaction.objectStore("todo_os");
    const completeRequest = objectStore.delete(noteId);

    transaction.addEventListener("complete", () => {
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        console.log(`Task ${noteId} deleted.`);

        if (!taskList.firstChild) {
            const listItem = document.createElement("li");
            listItem.textContent = "No task.";
            taskList.appendChild(listItem);
        }
    });
}

/*

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

*/