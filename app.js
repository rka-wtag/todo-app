import { todoInputBox$, todoList$, todoSubmitButton$ } from "./domElements.js";

let todos = [];

const onCreateInputField = (todo) => {
  const inputElement = document.createElement("input");
  inputElement.classList.add("text");
  inputElement.type = "text";
  inputElement.value = todo.text;
  inputElement.setAttribute("readonly", "readonly");
  inputElement.setAttribute("readonly", "readonly");

  return inputElement;
};

const handleDelete = (todo) => {
  todos = todos.filter((todoElement) => todoElement.id !== todo.id);
  renderTodos();
};

const handleEdit = (inputElement, editButton) => {
  if (editButton.innerText === "Edit") {
    editButton.innerText = "Update";
    inputElement.removeAttribute("readonly");
  } else {
    editButton.innerText = "Edit";
    inputElement.setAttribute("readonly", "readonly");
  }
};

const onCreateDeleteButton = (todo) => {
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("todo-delete-button");
  deleteButton.innerText = "Delete";

  deleteButton.addEventListener("click", () => {
    handleDelete(todo);
  });
  return deleteButton;
};

const onCreateEditButton = (inputElement) => {
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

const onCreateCheckbox = (todo, inputElement) => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.done;

  checkbox.addEventListener("click", () => {
    handleDone(todo, inputElement);
  });

  return checkbox;
};

const onCreateElement = (todo) => {
  const todoElement = document.createElement("li");
  const inputElement = onCreateInputField(todo);
  const todoDeleteButton$ = onCreateDeleteButton(todo);
  const todoEditButton$ = onCreateEditButton(inputElement);
  const checkbox = onCreateCheckbox(todo, inputElement);
  inputElement.classList.toggle("completed", todo.done);
  todoElement.appendChild(checkbox);
  todoElement.appendChild(inputElement);
  todoElement.appendChild(todoDeleteButton$);
  todoElement.appendChild(todoEditButton$);
  return todoElement;
};

const handleAddTodo = (e) => {
  e.preventDefault();

  if (!todoInputBox$.value) {
    alert("Please fill out the task");
    return;
  }

  const todoObj = {
    id: Date.now(),
    text: todoInputBox$.value,
    done: false,
  };

  todos.push(todoObj);
  todoInputBox$.value = "";

  renderTodos();
};

const renderTodos = () => {
  todoList$.innerHTML = null;
  todos.forEach((todo) => {
    todoList$.appendChild(onCreateElement(todo));
  });
};

todoSubmitButton$.addEventListener("click", handleAddTodo);
