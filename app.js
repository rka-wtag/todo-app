
import {
    todoInputBox$,
    todoList$,
    todoSubmitButton$
} from "./domElements.js";


const todos = [];

const createInputElement = (todo) => {

    const inputElement = document.createElement('input');
    inputElement.classList.add("text");
    inputElement.type = "text";
    inputElement.value = todo.text;
    inputElement.setAttribute("readonly", "readonly")

    return inputElement;
}

const createTodoElement = (todo) => {
    const todo$ = document.createElement('li');
    const inputElement = createInputElement(todo);
    todo$.appendChild(inputElement);
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
