const todoForm = document.getElementById("todoForm");
const titleElement = document.getElementById("title");
const descriptionElement = document.getElementById("description");
const btnReset = document.getElementById("reset-btn");
const btnAdd = document.getElementById("add-btn");
const tbody = document.getElementById("tbody");

function validationTodo(todo){
    if(!todo.title || !todo.description){
        alert("Please enter full field!");
        return false;
    }
    return true;
}

let todoSaved = JSON.parse(localStorage.getItem("todos") || "[]");
console.log(todoSaved);
todoForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const todo ={
        title: titleElement.value,
        description: descriptionElement.value,
    };
    if (!validationTodo(todo)) return;
    todoSaved.push(todo);
    handleViewTodo(todoSaved);
    resetForm();
});

function handleViewTodo(todos = []){
    tbody.innerText = "";
    todos.forEach((item) => {
        let trElement = document.createElement("tr");
        trElement.innerHTML = `
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.description}</td>
            <td>
                <button class="btn btn-warning">Update</button>
                <button class="btn btn-danger" onclick="removeTodo('${item.id}')">Remove</button>
            </td> 
            `;
        tbody.appendChild(trElement);
    });
}

function removeTodo(id){
    if (window.confirm("Are you sure?")){
    todoSaved = todoSaved.filter(item => item.id !== id);
    handleViewTodo(todoSaved);
    }
}

function resetForm(){
    todoForm.reset();
}

function removeAll(){
    todoSaved = [];
    handleViewTodo([]);
}

btnReset.addEventListener("click", resetForm);

handleViewTodo(todoSaved);
