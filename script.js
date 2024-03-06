const taskForm = document.getElementById("taskForm");
const openTaskFormBtn = document.getElementById("openTaskFormBtn");
const closeTaskFormBtn = document.getElementById("closeTaskFormBtn");

const submitTaskFormBtn = document.getElementById("submitTaskFormBtn");

const taskItems = document.getElementById("taskItems");

const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const timeInput = document.getElementById("time-input");
const descriptionInput = document.getElementById("description-input");

const infoTask = document.getElementById("infoTask");
const infoBtn = document.getElementById("infoBtn");
const closeInfoBtn = document.getElementById("closeInfoBtn");

const taskContainer = document.getElementById("taskContainer");
const taskDialog = document.getElementById("taskDialog");

let taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

openTaskFormBtn.addEventListener("click", () => {
    taskForm.classList.toggle("hidden");
    
    reset();
})

closeTaskFormBtn.addEventListener("click", () => {
    alertFunction();
})

submitTaskFormBtn.addEventListener("click", () => {
    addTask();
});

const reset = () => {
    titleInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
    descriptionInput.value = "";
}
const addTask = () => {

    const dataArrIndex = taskData.findIndex(task => task.id === currentTask.id);

    if(titleInput.value!=="" && dateInput.value!==""){
        const taskObject = {
            id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now}`,
            title: titleInput.value,
            date: dateInput.value,
            time: timeInput.value,
            description: descriptionInput.value

        }
        
        if(dataArrIndex === -1){
            taskData.push(taskObject);
        }else{taskData[dataArrIndex] = taskObject;
        }

        localStorage.setItem("data", JSON.stringify(taskData));

        
        taskForm.classList.toggle("hidden");

        displayTasks();
    }else{
        alert("First 2 fields are manditory")
    }
}

const displayTasks = () => {
    if(taskData.length > 0){
    taskItems.classList.remove("hidden");
    }

    taskItems.innerHTML = "";

    taskData.forEach(({id, title, date, time, description})=>{
        console.log(id, title, date, time, description);
        taskItems.innerHTML += `
    <div class="task" id="${id}">
    <div id="task-details">
    <input type="checkbox"> ${title} </input>
    <button id="infoBtn" onclick="showInfo(this)"><img src="./Assets/info.png"></button>
    </div>

    <div id="taskDate">
    ${date}
    </div>

    <div id="taskTime">
    ${time}
    </div>

    <div id="taskDescription" class="hidden" >
    ${description}
    </div>

    <div id="buttons">
    <button id="editBtn" onclick="editTask(this)"><img src="./Assets/edit-text.png"></button>
    <button id="deleteBtn" onclick="deleteTask(this)"><img src="./Assets/delete.png"></button>
    </div>

    </div>`;
    })
    
}

const alertFunction = () => {
    if(confirm("Are you sure?")){
        taskForm.classList.toggle("hidden");
    }
}

 const deleteTask = (buttonElement) => {
    console.log("delete clicked")
    buttonElement.parentElement.parentElement.remove();
    taskData.splice(taskData.findIndex(task => task.id === buttonElement.parentElement.parentElement.id), 1);
    
     localStorage.setItem("data", JSON.stringify(taskData));

    if(taskData.length === 0){
        taskItems.classList.add("hidden");
    }
}

const editTask = (buttonElement) => {
    console.log("edit clicked")
    const parentTaskDiv = buttonElement.parentElement.parentElement;
    currentTask = taskData[taskData.findIndex(task => task.id === parentTaskDiv.id)];

    taskForm.classList.toggle("hidden");

    titleInput.value = currentTask.title;
    dateInput.value = currentTask.date;
    timeInput.value = currentTask.time;
    descriptionInput.value = currentTask.description;

    submitTaskFormBtn.innerText = "Update Task";




}

const showInfo = (buttonElement) => {
    const parentTaskDiv = buttonElement.parentElement.parentElement;
    currentTask = taskData[taskData.findIndex(task => task.id === parentTaskDiv.id)];

    infoTask.innerHTML =`
    <h3>${currentTask.title}</h3>
    <p>${currentTask.date}</p>
    <p>${currentTask.time}</p>
    <p>${currentTask.description}</p>
    <button id="closeInfoBtn" onclick="closeInfo(this)">Close</button>
    </div>
    `;

    infoTask.classList.toggle("hidden");
    openTaskFormBtn.disabled = true;

}

const closeInfo = (buttonElement) => {
    infoTask.classList.toggle("hidden");
    openTaskFormBtn.disabled = false;

}

if(taskData.length){
    displayTasks();
}
