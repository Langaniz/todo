const form = document.querySelector(".todo_form");
const input = document.querySelector(".todo_input");
const todo_container = document.querySelector(".todo_container");
let deleteBtn;
let checkboxes;
let editBtns;
let saveBtns;



const baslangic = () => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if(!todos){
        localStorage.setItem("todos", JSON.stringify([]));
    }else{
        todos.forEach(todo => {
            addHTML(todo);
        });
        deleteBtn = document.querySelectorAll(".todo_delete");
        checkboxes = document.querySelectorAll(".todo_cb");
        editBtns = document.querySelectorAll(".todo_edit");
        saveBtns = document.querySelectorAll(".todo_save");
    }
}


const addTodo = () => {

    const İnpValue = input.value;

    const todo = {
        text : İnpValue,
        durum : false,
    };

    const todos =JSON.parse(localStorage.getItem("todos"));
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));

    addHTML(todo);
}

const deleteTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    const text = todo.firstChild.children[1].textContent;

    let todos =JSON.parse(localStorage.getItem("todos"));
    todos = todos.filter(td => td.text !=text);
    localStorage.setItem("todos", JSON.stringify(todos));
    
    todo.remove();
}

const completeTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    const text = todo.firstChild.children[1].textContent;

    let todos =JSON.parse(localStorage.getItem("todos"));
    todos.forEach(td => {
        if(td.text === text) td.durum = !td.durum;
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

const saveTodo = (e) => {
    let newText = document.querySelector(".newText").value;
    let lastText = document.querySelector(".todo_text");
    lastText = newText;
    
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos = [{
        text : lastText,
        durum : false,
    }];
    localStorage.setItem("todos", JSON.stringify(todos));

    location.reload();
}

const editTodo = (e) => {
    const saveBtn = document.createElement("button");
    saveBtn.classList.add("todo_save");
    saveBtn.type="submit";
    saveBtn.textContent = "Save";

    const todoRight = e.target.parentElement;
    const todoLeft = e.target.parentElement.previousSibling;

    const newText = document.createElement("input");
    newText.classList.add("newText");

    let todo1 = e.target.parentElement.firstChild;
    let todo2 = e.target.parentElement.lastChild;
    
    let todo3 = e.target.parentElement.previousSibling.firstChild;
    let todo4 = e.target.parentElement.previousSibling.lastChild;
    
    todo1.remove();
    todo2.remove();
    todo3.remove();
    todo4.remove();

    newText.value = todo4.textContent;

    todoLeft.appendChild(newText);
    todoRight.appendChild(saveBtn);
}

const addHTML = (todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    
    const todoLeft = document.createElement("div");
    todoLeft.classList.add("todo_left");

    const todoCb = document.createElement("input");
    todoCb.type="checkbox";
    todoCb.checked = todo.durum;
    todoCb.classList.add("todo_cb");

    const todoText = document.createElement("span");
    todoText.classList.add("todo_text");
    todoText.textContent = todo.text;

    todoLeft.appendChild(todoCb);
    todoLeft.appendChild(todoText);

    const todoRight = document.createElement("div");
    todoRight.classList.add("todo_right");
    
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("todo_delete");
    deleteBtn.textContent = "Delete";

    const editBtn = document.createElement("button");
    editBtn.classList.add("todo_edit");
    editBtn.textContent = "Edit";
    
    todoRight.appendChild(deleteBtn);
    todoRight.appendChild(editBtn);

    todoDiv.appendChild(todoLeft);
    todoDiv.appendChild(todoRight);

    todo_container.append(todoDiv);
}


baslangic();

form.addEventListener("submit", addTodo);
todo_container.addEventListener("click", function (e) {
    if (e.target.classList.contains("todo_delete")) {
        deleteTodo(e);
    } else if (e.target.classList.contains("todo_cb")) {
        completeTodo(e);
    } else if (e.target.classList.contains("todo_edit")) {
        editTodo(e);
    } else if (e.target.classList.contains("todo_save")) {
        saveTodo(e);
    }
});
