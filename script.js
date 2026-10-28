document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addBtn = document.getElementById("add-btn");
    const taskList = document.getElementById("task-list");
    const completedCountNum = document.getElementById("completed-count");
    const uncompletedCountNum = document.getElementById("uncompleted-count");

    let tasks = [
        { text: "wash dishes", completed: false },
        { text: "edit resume", completed: true },
        { text: "finish Codedex course", completed: false }
    ];

   
    renderTasks();

    
    addBtn.addEventListener("click", () => {
        const text = taskInput.value.trim();
        if (text !== "") {
            tasks.push({ text: text, completed: false });
            taskInput.value = "";
            renderTasks();
        }
    });

    
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addBtn.click();
        }
    });

    function renderTasks() {
        taskList.innerHTML = "";
        let completedCount = 0;
        let uncompletedCount = 0;

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = `task-item ${task.completed ? "completed" : ""}`;

          
            const taskLeft = document.createElement("div");
            taskLeft.className = "task-left";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", () => {
                tasks[index].completed = checkbox.checked;
                renderTasks();
            });

            const span = document.createElement("span");
            span.className = "task-text";
            span.textContent = task.text;

            taskLeft.appendChild(checkbox);
            taskLeft.appendChild(span);

            
            const taskActions = document.createElement("div");
            taskActions.className = "task-actions";

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => {
                tasks.splice(index, 1);
                renderTasks();
            });

            const editBtn = document.createElement("button");
            editBtn.className = "edit-btn";
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", () => {
                const newText = prompt("task change", task.text);
                if (newText !== null && newText.trim() !== "") {
                    tasks[index].text = newText.trim();
                    renderTasks();
                }
            });

            taskActions.appendChild(deleteBtn);
            taskActions.appendChild(editBtn);

            li.appendChild(taskLeft);
            li.appendChild(taskActions);
            taskList.appendChild(li);

            
            if (task.completed) {
                completedCount++;
            } else {
                uncompletedCount++;
            }
        });

       
        completedCountNum.textContent = completedCount;
        uncompletedCountNum.textContent = uncompletedCount;
    }
});
