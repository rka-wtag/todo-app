import {
  searchInput$,
  todoInputBox$,
  todoList$,
  todoSubmitButton$,
} from "./domElements.js";

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
  searchInput$.value = "";
  todos = todos.filter((todoElement) => todoElement.id !== todo.id);
  renderTodos(todos);
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
const handleEdit = (inputElement, editButton, todo) => {
  if (inputElement.getAttribute("data-checkbox-state") === "completed") return;
  const modifiedTodo = todos.find((item) => item.id === todo.id);
  if (inputElement.getAttribute("data-state") === "edit") {
    inputElement.removeAttribute("readonly");
    editButton.innerText = "Update";
    inputElement.setAttribute("data-state", "update");
  } else {
    editButton.innerText = "Edit";
    inputElement.setAttribute("readonly", "readonly");
    inputElement.setAttribute("data-state", "edit");
    modifiedTodo.text = inputElement.value;
    renderTodos(todos);
    searchInput$.value = "";
  }
};

const createEditButton = (inputElement, todo) => {
  const editButton = document.createElement("button");
  editButton.classList.add("todo-Edit-Button");
  editButton.innerText = "Edit";

  editButton.addEventListener("click", () => {
    handleEdit(inputElement, editButton, todo);
  });

  return editButton;
};
const handleDone = (todo, inputElement) => {
  todo.done = !todo.done;
  inputElement.classList.toggle("completed", todo.done);
  if (todo.done) inputElement.setAttribute("data-checkbox-state", "completed");
  else inputElement.setAttribute("data-checkbox-state", "notCompleted");
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
const handleSearch = (e) => {
  let searchText = e.target.value.trim().toLowerCase();
  let filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchText)
  );
  renderTodos(filteredTodos);
};
const createElement = (todo) => {
  const todo$ = document.createElement("li");
  const inputElement = createInputField(todo);
  const todoDeleteButton$ = createDeleteButton(todo);
  const checkbox = handleCreateCheckbox(todo, inputElement);
  inputElement.classList.toggle("completed", todo.done);
  todo$.appendChild(checkbox);
  const todoEditButton$ = createEditButton(inputElement, todo);
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

  const todo = createTodo(todoInputBox$.value);

  todos.push(todo);
  todoInputBox$.value = "";
  renderTodos(todos);
};

const createTodo = (text) => {
  const todo = {
    id: Date.now(),
    text: text,
    done: false,
  };
  return todo;
};

const renderTodos = (todos) => {
  todoList$.innerHTML = null;
  let sortedTodos = todos.sort((t1, t2) => t1.id - t2.id);
  sortedTodos.forEach((todo) => {
    todoList$.appendChild(createElement(todo));
  });
};

searchInput$.addEventListener("input", handleSearch);
todoSubmitButton$.addEventListener("click", handleAddTodo);
