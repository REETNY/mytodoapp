const nameInput = document.querySelector("#my_name");
const todoForm = document.querySelector("#new-todo-form");
const todoContent = document.querySelector("#contents");
const todoList = document.querySelector("#todo-list");


// function to save todos
function saveTodos(todos){
    localStorage.setItem("todos", JSON.stringify(todos));
}

// function to get todos
function getTodos(){
    return JSON.parse(localStorage.getItem("todos")) || []
}

// function to save todo is done or not
function saveDone(todo, value, todoItem){
    const todos = getTodos();
    todos.forEach( itemz => {
        if(itemz.content == todo.content && itemz.category == todo.category){
            itemz.done = value;

            if(itemz.done){
                todoItem.classList.add("done");
            }else{
                todoItem.classList.remove("done")
            }
        }
    })

    saveTodos(todos)
}

// function to save todo content;
function saveContent(todo, value){

    const todos = getTodos();

    todos.forEach( todoz => {
        if(todoz.content == todo.content && todoz.category == todo.category){
            todoz.content = value;
        }
    })
    saveTodos(todos);
}


// function to delete the todo
function deleteTodo(todo){
    let todos = getTodos();
    let index;
    for(let i=0; i<todos.length; i++){
        if(todos[i].category == todo.category && todos[i].content == todo.content){
            index = i;
        }
    }

    console.log(index);
    todos.splice(index,1);
    console.log(todos);
    saveTodos(todos);
    todosIt = getTodos();
    showTodos();
}

function checkTodoStatus(todo){
    const todos = getTodos();

    todos.forEach( todoz => {
        if(todo.category == todoz.category && todo.content == todoz.content & todoz.done === todo.done){
            return;
        }
    })
}



let todosIt = [];

window.addEventListener("load", () => {
    todos = getTodos();
    showTodos();
})

nameInput.value = localStorage.getItem("user") || "";

nameInput.addEventListener("change", (e) => {
    localStorage.setItem("user", e.target.value);
})

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(todos)

    const todo = {
        content: e.target.elements.content.value,
        category: e.target.elements.category.value,
        done: false
    }

    if(todo.content === "" || todo.category == ""){
        return;
    }
    todosIt.push(todo);
    saveTodos(todosIt);
    e.target.reset();
    showTodos();
})



function showTodos(){
    let datas = getTodos();
    todoList.innerHTML = ``;

    datas.forEach( todo => {
        let itemTodo = todo;

        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");

        const label = document.createElement("label");
        const inputz = document.createElement("input");
        const span = document.createElement("span");

        const todoContent = document.createElement("div");

        const actions = document.createElement("div");
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");

        inputz.type = "checkbox";
        inputz.checked = todo.done;
        
        span.classList.add("bubble");

        if(todo.category == "personal"){
            span.classList.add("personal");
        }else{
            span.classList.add("business");
        }

        todoContent.classList.add("todo-content");
        todoContent.innerHTML = `
            <input type="text" value="${todo.content}" readonly>
        `

        actions.classList.add("actions");
        editBtn.classList.add("edit");
        editBtn.innerText = `edit`;
        deleteBtn.classList.add("delete");
        deleteBtn.innerText = `delete`;

        label.appendChild(inputz);
        label.appendChild(span);

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        todoItem.appendChild(label);
        todoItem.appendChild(todoContent);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if(todo.done){
            todoItem.classList.add("done");
        }else{
            todoItem.classList.remove("done");
        }

        inputz.addEventListener("click", (e) => {
            saveDone(todo, e.target.checked, todoItem);
        });

        editBtn.addEventListener("click", () => {

            if(inputz.checked){
                return;
            }

            const input = todoContent.querySelector("input");
            checkTodoStatus(todo);
            input.removeAttribute("readonly");
            input.focus();
            
            input.addEventListener("blur", (e) => {
                saveContent(todo, e.target.value);
                input.setAttribute("readonly", true);
            })
        })

        deleteBtn.addEventListener("click", () => {
            deleteTodo(todo);
        })


    })
}