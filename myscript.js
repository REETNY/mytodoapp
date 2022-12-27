window.addEventListener("load", () => {
    const nameInput = document.querySelector("#my_name");
    const todoForm = document.querySelector("#new-todo-form");
    const todoContent = document.querySelector("#contents");

    todos = JSON.parse(localStorage.getItem("todos")) || [];

    let usersName = localStorage.getItem("user") || "";
    nameInput.value = usersName;
    nameInput.addEventListener("change", (e) => {
        localStorage.setItem("user", e.target.value);
    })


    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        if(todoContent.value === "")return;

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
        }

        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        e.target.reset();
        showTodos(todos);
    })
    showTodos(todos);
})

function showTodos(todos) {
    const todoList = document.querySelector("#todo-list");
    todoList.innerHTML = "";
    const todosData = todos;
    todosData.forEach( todo => {
        
        const todoItem = document.createElement('div');
        todoItem.classList.add("todo-item");

        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "checkbox";
        input.checked = todo.done;

        const span = document.createElement("sapn");
        span.classList.add("bubble");

        const todoContent = document.createElement("div");
        todoContent.classList.add("todo-content");
        todoContent.innerHTML = `
            <input type="text" readonly value="${todo.content}">
        `

        const actions = document.createElement("div");
        actions.classList.add("actions");
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        deleteBtn.textContent = "delete";
        const editBtn = document.createElement("button");
        editBtn.classList.add("edit");
        editBtn.textContent = "edit";

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        label.appendChild(input);
        label.appendChild(span);
        
        todoItem.appendChild(label);
        todoItem.appendChild(todoContent);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if(todo.done){
            todoItem.classList.add("done");
        }

        input.addEventListener("click", (e) => {
            todo.done = e.target.checked;
            localStorage.setItem("todos", JSON.stringify(todos));

            if(todo.done){
                todoItem.classList.add("done");
            }else{
                todoItem.classList.remove("done");
            }
        })

        if(todo.category === "personal"){
            span.classList.add('personal');
        }else{
            span.classList.add("business");
        }

        editBtn.addEventListener('click', () => {
            if(todo.done)return;
            const input = todoContent.querySelector("input");
            input.removeAttribute("readonly");
            input.focus();

            input.addEventListener('blur', (e) => {
                input.setAttribute("readonly", true);
                todo.content = e.target.value;
                localStorage.setItem("todos", JSON.stringify(todos));
            })
        })

        deleteBtn.addEventListener("click", () => {
            todos = todos.filter( t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            showTodos(todos);
        })
    })
    
}