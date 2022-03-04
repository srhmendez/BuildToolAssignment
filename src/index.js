import 'underscore';
import './styles.css';
import editPNG from './images/pencil.png';
import deletePNG from './images/remove.png';

let inputDiv = document.createElement('div');
let inputField = document.createElement('input');
let submitTodoBtn = document.createElement('button');
let bodyElement = document.querySelector('#addTodoDiv');
let displayDiv = document.getElementById('display')
let clearBtn = document.getElementById('clear-tasks-btn')


submitTodoBtn.innerHTML = "Add Todo"

inputDiv.appendChild(inputField);
inputDiv.appendChild(submitTodoBtn);
bodyElement.appendChild(inputDiv);

inputDiv.classList.add('inputGroup');
inputField.classList.add('inputField')
displayDiv.classList.add('displayTodosDiv')


inputField.addEventListener('change', getTodo);
clearBtn.addEventListener('click', clearAllTasks)

let todoList = [
    {
        index : 0,
        task : "Go To Store",
        complete : false

    },
    {
        index : 1,
        task : "Work Out",
        complete : false

    },
    {
        index : 2,
        task : "Clean",
        complete : false

    },
]

function getTodo(event) {
    let todoName = event.target.value;
    let indexNum = todoList.length
    let newTodoObject = {
        index : indexNum,
        task : todoName,
        complete : false
    };
    todoList.push(newTodoObject)
    event.target.value = '';

    loadTodos();
}

function loadTodos() {
    let incompleteDiv = document.getElementById('incomplete')
    incompleteDiv.innerHTML = '';
    let completeDiv = document.getElementById('complete')
    completeDiv.innerHTML = '';

    console.log('todo after clear -->', todoList)
    todoList.forEach(todo => {
        let taskDiv = document.createElement('div');
        taskDiv.classList.add('todoDisplayTaskDiv')

        let todoH2 = document.createElement('h2');
        todoH2.innerText = todo.task;
        todoH2.classList.add('todoTaskName')

        let checkBox = document.createElement('input');
        let indexOfTodo = todoList.indexOf(todo);
        checkBox.setAttribute('name', indexOfTodo)
        checkBox.addEventListener('click', toggleComplete)
        checkBox.setAttribute("type", 'checkbox')
        checkBox.classList.add('checkbox')
        let isChecked = todo.complete;
        checkBox.checked = isChecked;

        let editIcon = document.createElement('IMG');
        editIcon.classList.add('iconSize')
        editIcon.addEventListener('click', editTask)
        editIcon.setAttribute('src', editPNG)

        let deleteIcon = document.createElement('IMG');
        deleteIcon.addEventListener('click', deleteTask)
        deleteIcon.classList.add('iconSize')
        deleteIcon.setAttribute('src', deletePNG);


        let iconDiv = document.createElement('div');
        iconDiv.appendChild(editIcon);
        iconDiv.appendChild(deleteIcon)
        iconDiv.classList.add('iconDiv')



        let nameAndCheckboxDiv = document.createElement('div');
        nameAndCheckboxDiv.appendChild(checkBox);
        nameAndCheckboxDiv.appendChild(todoH2)
        nameAndCheckboxDiv.classList.add('check-and-taskname')

        taskDiv.appendChild(nameAndCheckboxDiv)
        taskDiv.appendChild(iconDiv);

        if(todo.complete){
            completeDiv.appendChild(taskDiv)
        } else {
            incompleteDiv.appendChild(taskDiv);
        }
    })
    adjustIndexNumbers();
}

loadTodos();

function adjustIndexNumbers() {
    let index = 0;
    todoList.forEach(taskObject => {
        taskObject.index = index;
        index ++ 
    })
    console.log(todoList)
}

function toggleComplete(event) {
    
    loadTodos()

    let index = event.target.name;

    let complete = todoList[index].complete;
    complete ? todoList[index].complete = false : todoList[index].complete = true;
    console.log(todoList[index])

    loadTodos()
}

function deleteTask(event){
    let index = event.target.parentElement.parentElement.children[0].children[0].name;
    let filteredArr = todoList.filter(todo =>  todo.index != index )

    todoList = filteredArr;

    loadTodos()
    
}
function editTask(event){
    let checkBoxDiv = event.target.parentElement.parentElement.children[0];
    let h2Element = event.target.parentElement.parentElement.children[0].children[1];
    checkBoxDiv.removeChild(h2Element);

    let newInputField = document.createElement('input');
    newInputField.classList.add('editField');
    newInputField.addEventListener('change', editTaskName)
    newInputField.setAttribute('type', 'text')
    newInputField.select();

    checkBoxDiv.appendChild(newInputField)


}

function editTaskName(event){
    let input = event.target.value;

    let h2 = document.createElement('h2');
    h2.innerHTML = input;

    let parentDiv = event.target.parentElement.parentElement.children[0]
    
    let index = parentDiv.children[0].name;

    todoList[index].task = input;
    loadTodos()
}

function clearAllTasks() {
    
    let filteredArr = todoList.filter(item => !item.complete);
    todoList = filteredArr;

    loadTodos()
}