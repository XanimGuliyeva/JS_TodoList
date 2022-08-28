const form = document.querySelector('#todo-form');
const todo_input = document.querySelector('#todo');
const TodoList = document.querySelector('.list-group');
const firstCardBody = document.querySelectorAll('.card-body')[0];
const secondCradBody = document.querySelectorAll('.card-body')[1];
const filter=document.querySelector('#filter');
const clear_Button = document.querySelector('#clear-todos');

eventlistener();

function eventlistener(){
    form.addEventListener("submit",addEvent);
    document.addEventListener("DOMContentLoaded",loadAllTodosUI);
    secondCradBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodo);
    clear_Button.addEventListener("click",clearTodoList);
}

function clearTodoList(){
    if(confirm("Silmək istədiyinizə əminsiniz")){
        //TodoList.innerHTML="" ve ya
        while(TodoList.firstElementChild!=null){
            TodoList.removeChild(TodoList.firstElementChild);
        }
        localStorage.remove("todos");
    }
}

function filterTodo(e){
    const filterValue=e.target.value.toLowerCase();
    const ListItems = document.querySelectorAll(".list-group-item");

    ListItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            listItem.setAttribute("style","display:none !important")
        }
        else{
            listItem.setAttribute("style","display:block")
        }
    });
}

function deleteTodo(e){
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Silmə işi uğurla oldu");
    }
}

function deleteTodoFromStorage(deleteTodo){
    let todos=getTodosfromStorage();

    todos.forEach(function(todo,index){
        if (todo === deleteTodo ){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosUI(){
    let Todos=getTodosfromStorage();

    Todos.forEach(function(todo){
        addTodoIO(todo);
    })
}


function addEvent(e){
  const newTodo = todo_input.value.trim();

  if(newTodo===""){
    showAlert("danger","Boş Todo olmaz...");
  }  
  else{
    addTodoIO(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success","Todo əlavə olundu");
  }
  e.preventDefault();
}

function getTodosfromStorage(){
    let Todos;
    if(localStorage.getItem("todos")===null){
        Todos = [];
    }
    else{
        Todos = JSON.parse(localStorage.getItem("todos"));
    }
    return Todos;
}

function addTodoToStorage(newTodo){
    let Todos=getTodosfromStorage();
    Todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(Todos))
}

function showAlert(type,message){
    const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    firstCardBody.appendChild(alert);
    setTimeout(function(){
        alert.remove();
    },1000)
}

function addTodoIO(new_todo){

    const listItem = document.createElement("li");

    const link = document.createElement("a");
    link.href="#"
    link.className="delete-item";
    link.innerHTML="<i class = 'fa fa-remove'></i>"

    listItem.className="list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(new_todo));
    listItem.appendChild(link);
    TodoList.appendChild(listItem);
    todo_input.value='';

}