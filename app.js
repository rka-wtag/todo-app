import { todoInputBox$, todoList$, todoSubmitButton$ } from "./domElements.js";

let todos = [];

const createInputField = (todo) => {
  const inputElement = document.createElement("input");
  inputElement.classList.add("text");
  inputElement.type = "text";
  inputElement.value = todo.text;
  inputElement.setAttribute("readonly", "readonly");
  inputElement.setAttribute("data-state", "edit");

  return inputElement;
};

const handleDelete = (todo) => {
  todos = todos.filter((todoElement) => todoElement.id !== todo.id);
  renderTodos();
};

const createDeleteButton = (todo) => {
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("todo-delete-button");
  deleteButton.innerText = "Delete";

  deleteButton.addEventListener("click", () => {
    handleDelete(todo);
  });

  return deleteButton;
};

const createElement = (todo) => {
  const todo$ = document.createElement("li");
  const inputElement = createInputField(todo);
  const todoDeleteButton$ = createDeleteButton(todo);
  const todoEditButton$ = createEditButton(inputElement);
  todo$.appendChild(inputElement);
  todo$.appendChild(todoDeleteButton$);
  todo$.appendChild(todoEditButton$);

  return todo$;
};

const handleAddTodo = (e) => {
  e.preventDefault();

  if (!todoInputBox$.value) {
    alert("Please fill out the task");
    return;
  }
  e.preventDefault();

  if (!todoInputBox$.value) {
    alert("Please fill out the task");
    return;
  }

  const todo = {
    id: Date.now(),
    text: todoInputBox$.value,
  };
  const todo = {
    id: Date.now(),
    text: todoInputBox$.value,
  };

  todos.push(todo);
  todoInputBox$.value = "";
  renderTodos();
};

const renderTodos = () => {
  todoList$.innerHTML = null;
  todos.forEach((todo) => {
    todoList$.appendChild(createElement(todo));
  });
};

todoSubmitButton$.addEventListener("click", handleAddTodo);
