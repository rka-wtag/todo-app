
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
    inputElement.setAttribute("readonly", "readonly");

    return inputElement;
}

const handleDeleteTodo = (todo) => {
    todoList$.innerHTML = null;
    todos = todos.filter(todoElement => todoElement.id !== todo.id);
    renderTodos();
}

const handleEditTodo = (todo, inputElement, todoEditButton$) => {
    if(todoEditButton$.innerText === 'Edit'){
        todoEditButton$.innerText = 'Update';
        inputElement.removeAttribute("readonly");
    }else{
        todoEditButton$.innerText = 'Edit';
        inputElement.setAttribute("readonly", "readonly");
    }

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

const createTodoEditButton = (todo, inputElement) => {
    const todoEditButton$ = document.createElement('button');
    todoEditButton$.classList.add('todo-Edit-Button');
    todoEditButton$.innerText = 'Edit';

    todoEditButton$.addEventListener('click', () => {
        handleEditTodo(todo, inputElement, todoEditButton$);
    })

    return todoEditButton$;
}

const createTodoElement = (todo) => {
    const todo$ = document.createElement('li');
    const inputElement = createInputElement(todo);
    const todoDeleteButton$ = createTodoDeleteButton(todo);
    const todoEditButton$ = createTodoEditButton(todo, inputElement);
    todo$.appendChild(inputElement);
    todo$.appendChild(todoDeleteButton$);
    todo$.appendChild(todoEditButton$);
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
