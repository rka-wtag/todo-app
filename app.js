const form = document.querySelector('#new-task-form');
const button = document.querySelector('#button');
const list =  document.querySelector('#task-list');
const field = form['new-task-input'];


const todoList = [];

createEditButton = () => {
    const editButton = document.createElement('button');
    editButton.classList.add = 'edit';
    editButton.innerText = 'Edit';

    //edit task handler
    editButton.addEventListener('click', (e) => {
        //logic
    })

    return editButton;
}

createDeleteButton = () => {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add = 'delete';
    deleteButton.innerText = 'Delete';

    //delete task handler
    deleteButton.addEventListener('click', (e) => {
        //logic
    })

    return deleteButton;
}


createTask = (localTodo) => {

    const divEl = document.createElement('div');
    divEl.classList.add = 'div-to-add';

    divEl.classList.add = "todoTasks"

    const inputEl = document.createElement('input');
    inputEl.classList.add("text");
    inputEl.type = "text";
    inputEl.value = localTodo.text;
    inputEl.setAttribute("readonly", "readonly")
    divEl.appendChild(inputEl);


    //Creating edit button for the task
    const editButton = createEditButton();
    divEl.appendChild(editButton);

    //Creating delete button for the task
    const deleteButton = createDeleteButton();
    divEl.appendChild(deleteButton);

    return divEl;

}

addTask = (e) => {
    e.preventDefault();
    
    if(!field.value){
        alert('Please fill out the task');
        return;
    }

    const localTodo = {
        id : Date.now(),
        text : field.value,
        status : false
    };

    todoList.push(localTodo);
    field.value = "";

    loadTask();
   
}

loadTask = () => {
    list.innerHTML = null;

    todoList.forEach(element => {
        const child = createTask(element);
        list.appendChild(child);
    }) 
}

button.addEventListener('click', addTask)
