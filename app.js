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
const handleEdit = (inputElement, editButton) => {
  if (inputElement.getAttribute("data-state") === "edit") {
    editButton.innerText = "Update";
    inputElement.removeAttribute("readonly");
    inputElement.setAttribute("data-state", "update");
    return;
  }
  editButton.innerText = "Edit";
  inputElement.setAttribute("readonly", "readonly");
  inputElement.setAttribute("data-state", "edit");
};
const createEditButton = (inputElement) => {
  const editButton = document.createElement("button");
  editButton.classList.add("todo-Edit-Button");
  editButton.innerText = "Edit";
  editButton.addEventListener("click", () => {
    handleEdit(inputElement, editButton);
  });

  return editButton;
};
const handleDone = (todo, inputElement) => {
  todo.done = !todo.done;
  inputElement.classList.toggle("completed", todo.done);
};

const handleCreateCheckbox = (todo, inputElement) => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.done;

  checkbox.addEventListener("click", () => {
    handleDone(todo, inputElement);
  });

  return checkbox;
};
const createElement = (todo) => {
  const todo$ = document.createElement("li");
  const inputElement = createInputField(todo);
  const todoDeleteButton$ = createDeleteButton(todo);
  const todoEditButton$ = createEditButton(inputElement);
  const checkbox = handleCreateCheckbox(todo, inputElement);
  inputElement.classList.toggle("completed", todo.done);
  todo$.appendChild(checkbox);
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
    done: false
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
