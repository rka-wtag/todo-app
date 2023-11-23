
import {
    todoInputBox$,
    todoList$,
    todoSubmitButton$
} from "./domElements.js";


let todos = [];

const createInputElement = (todo) => {

    const inputElement = document.createElement('input');
    inputElement.classList.add("text");
    inputElement.type = "text";
    inputElement.value = todo.text;
    inputElement.setAttribute("readonly", "readonly")

    return inputElement;
}

const handleDeleteTodo = (todo) => {
    todoList$.innerHTML = null;
    console.log(todo);
    todos = todos.filter(todoElement => todoElement.id !== todo.id);
    renderTodos();
}

const createTodoDeleteButton = (todo) => {
    const todoDeleteButton = document.createElement('button');
    todoDeleteButton.classList.add('todo-delete-button');
    todoDeleteButton.innerText = 'Delete';

    todoDeleteButton.addEventListener('click', () => {
        handleDeleteTodo(todo);
    })
    return todoDeleteButton;
}

const createTodoElement = (todo) => {
    const todo$ = document.createElement('li');
    const inputElement = createInputElement(todo);
    const todoDeleteButton$ = createTodoDeleteButton(todo);
    todo$.appendChild(inputElement);
    todo$.appendChild(todoDeleteButton$);
    return todo$;
}

const handleAddTodo = (e) => {
    e.preventDefault();
    
    if(!todoInputBox$.value){
        alert('Please fill out the task');
        return;
    }

    const todoObj = {
        id : Date.now(),
        text : todoInputBox$.value,
    };

    todos.push(todoObj);
    todoInputBox$.value = "";

    renderTodos();
   
}

const renderTodos = () => {
    todoList$.innerHTML = null;

    todos.forEach(todo => {
        todoList$.appendChild(createTodoElement(todo));
    }) 
}

todoSubmitButton$.addEventListener('click', handleAddTodo)
