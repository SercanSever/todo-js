//Tüm Elementler

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const searchFilter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
  //Tüm event listenerlar
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  searchFilter.addEventListener("keydown", filterTodos);
  clearButton.addEventListener("click", clearAllTodos);
}

function addTodo(e) {
  const newTodo = todoInput.value.trim();
  if (newTodo === "") {
    showAlert("danger", "Boş Bırakılamaz..");
  } else {
    addTodoToUI(newTodo);
    showAlert("success", "Kayıt Başarılı");
    addTodoToStorage(newTodo);
  }

  e.preventDefault();
}

function addTodoToUI(newTodo) {
  //string değerini list item olarak ekleyecek.

  //ListItem oluşturulduç
  const listItem = document.createElement("li");
  listItem.className = "list-group-item d-flex justify-content-between";

  //Link oluşturuldu.
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class='fa fa-remove'></i>";

  // Text Node ekleme.
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  //TodoList'e listıtem ı ekleme
  todoList.appendChild(listItem);
  todoInput.value = "";
}

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;

  firstCardBody.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 2500);
}

function getTodosFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addTodoToStorage(newtodo) {
  let todos = getTodosFromStorage();

  todos.push(newtodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI() {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

function deleteTodo(e) {
  if (e.target.className == "fa fa-remove") {
    e.target.parentElement.parentElement.remove();

    deleteTodosFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "Başarılı bir şekilde silindi.");
  }
}

function deleteTodosFromStorage(deleteTodo) {
  let todos = getTodosFromStorage();
  todos.forEach(function (todo, index) {
    if (todo === deleteTodo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");

  listItems.forEach(function (listItems) {
    const text = listItems.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      listItems.setAttribute("style", "display: none !important");
    } else {
      listItems.setAttribute("style", "display: block");
    }
  });
}

function clearAllTodos(e) {
  if (confirm("Tümünü silmek istediğinize emin misinizi ?")) {
    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
  }
}
