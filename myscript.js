window.addEventListener("load", () => {
    const usersName = document.querySelector("#usersName");
    const form = document.querySelector("#form");

    usersName.addEventListener("change", (e) => {
        localStorage.setItem("user", e.target.value);
    })

    usersName.value = localStorage.getItem("user") || "";

    function getTodos(){
       return JSON.parse(localStorage.getItem("todos")) || []
    }


    form.addEventListener("submit", (e) => {
        todosItem = getTodos();
        e.preventDefault();

        let todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false
        }

        if(todo.content == "" || todo.category == "")return;

        todosItem.push(todo);
        localStorage.setItem("todos", JSON.stringify(todosItem));
        e.target.reset();
        showTodos(todosItem);
    })
})

function getTodos(){
    return JSON.parse(localStorage.getItem("todos")) || []
 }

window.addEventListener("DOMContentLoaded", () => {
    todosItem = getTodos();
    showTodos(todosItem)
})

function showTodos(todosItem){

    function removeTodo(todo){
        localStorage.setItem("todos", JSON.stringify(
            todosItem = todosItem.filter( item => item != todo)
        ))
        showTodos(todosItem)
    }
    
    function getTodos(){
        return JSON.parse(localStorage.getItem("todos")) || []
    }

    const todoList = document.querySelector("#todo-list");
    todoList.innerHTML = ``;
    todosItem.forEach(todo => {
        const todoItem = document.createElement("todoItem");
        todoItem.classList.add("todo-item");

        const label = document.createElement("label");
        const input = document.createElement("input");
        const span = document.createElement("span");

        const todoContent = document.createElement("div");
        todoContent.classList.add("todo-content");

        const actions = document.createElement("div");
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");

        input.type = "checkbox";
        input.checked = todo.done;

        span.classList.add("bubble");

        if(todo.category == "personal"){
            span.classList.add("personal");
        }else{
            span.classList.add("business");
        }

        actions.classList.add("actions");
        editBtn.classList.add("edit");
        editBtn.innerText = `edit`;
        deleteBtn.classList.add("delete");
        deleteBtn.innerText = `delete`;

        label.appendChild(input);
        label.appendChild(span);

        todoContent.appendChild(label);
        todoContent.innerHTML += `
            <input type="text" readonly value="${todo.content}" class="values">
        `
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        todoItem.appendChild(todoContent);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        const checker = todoContent.querySelector("input");

        if(todo.done){
            todoItem.classList.add("completed");
            checker.checked = true;
        }

        checker.addEventListener("click", (e) => {
            todo.done = e.target.checked;

            if(todo.done){
                todoItem.classList.add("completed");
                checker.checked = true;
            }else{
                todoItem.classList.remove("completed");
            }
            localStorage.setItem("todos", JSON.stringify(todosItem))
        })

        editBtn.addEventListener("click", (e) => {

            if(todo.done){
                return
            }

            const input = todoContent.querySelector(".values");
            input.removeAttribute("readonly");
            input.focus();

            input.addEventListener("blur", (e) => {
                todo.content = e.target.value;
                localStorage.setItem("todos", JSON.stringify(todosItem));
                input.setAttribute("readonly", true);
            })
        })

        deleteBtn.addEventListener("click", () => {
            removeTodo(todo);
        })
    })

}