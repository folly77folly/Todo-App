
let todoItems;

function addTodo() {
objects = JSON.parse(localStorage.getItem("Records"));
if (objects!==null){
    todoItems=objects
}else{
    todoItems = [];
}
text=document.getElementById('task').value
  const todo = {
    text,
    checked: false,
    Date: new Date().toJSON().slice(0,10),
    sno:Date.now()
  };
//   myStorage = window.localStorage
  todoItems.push(todo);
  console.log(todoItems);
  localStorage.setItem('Records', JSON.stringify(todoItems))
  display(todoItems)
  document.getElementById('task').value=''
  event.preventDefault()
}

function display(todoItems){
    let output = ''
    let output2 = ''
    head=`
    <table class="table table-striped todo-list" id="todos">
    <thead>
    <th>Todo Task</th>
    <th>Entry Date</th>
    <th>Edit</th>
    <th>Delete</th>
    </thead>
    </table>
    `
    todoItems.forEach(element => {
        output += `
        <tr><td>${element.text}</td><td>${element.Date}</td> <td><button id='${element.sno}' data-myattribute='${element.sno}' class='mr-2 doedit btn btn-warning form-control'>Edit</button></td><td><button id='${element.sno}' class='dodelete btn btn-danger form-control' data-myattribute='${element.sno}'>Delete</button></td></tr>
        `
    });
    output2=head+output
    document.getElementById('todos').innerHTML=output2
    
}

function checkstore(){
let val= localStorage.getItem('Records')
objects = JSON.parse(localStorage.getItem("Records"));
if (objects){
    console.log(objects)
    display(objects)
}

event.preventDefault()
}

document.querySelector('.todo-list').addEventListener('click',myFunction)

document.querySelector('#submitbtn').addEventListener('click',addTodos)
document.querySelector('#search').addEventListener('keyup',dosearch)

function myFunction(e){
    if (e.target.classList.contains('dodelete')){
        let response=confirm('Are you Sure you want to Delete')
        if (response==true){
            objects = JSON.parse(localStorage.getItem("Records"));
            let newarray=objects.filter(function(val){
                return (val.sno != e.target.id)
            })
    
            localStorage.setItem('Records',JSON.stringify(newarray))
            checkstore()
        }

    }

    if (e.target.classList.contains('doedit')){
        objects = JSON.parse(localStorage.getItem("Records"));
        document.getElementById('submitbtn').value='Update Record'
            let filteredArray=objects.filter(function(val){
            return (val.sno == e.target.id)
        })
        console.log(filteredArray[0].text)
        console.log(filteredArray[0].sno)
        document.getElementById('hidden').value=filteredArray[0].sno
        $('#task').val(filteredArray[0].text)
    }

}


function addTodos(e){
    text=document.getElementById('task').value
    if (e.target.value=='Submit' && text != ''){
        var attribute = this.getAttribute("data-myattribute");
        addTodo()
    }
    if (e.target.value=='Update Record' && text != ''){
        var hiddenid = document.getElementById('hidden').value;
        objects = JSON.parse(localStorage.getItem("Records"));
        let newarray=objects.filter(function(val){
            return (val.sno != hiddenid)
        })
        localStorage.setItem('Records',JSON.stringify(newarray))
        checkstore()
        addTodo()
        document.getElementById('submitbtn').value='Submit'
    }

}


function doclear(){
localStorage.clear('Records')
}

function dosearch(e){
    const searchname=e.target.value.toLowerCase()
    // console.log(searchname)
    const task_list=document.querySelector('#todos tbody').getElementsByTagName('tr')
    Array.from(task_list).forEach(function(val){
        const stask=val.firstElementChild.textContent
        if (stask.toLowerCase().indexOf(searchname)!=-1){
            val.style.display='block'
            // val.style.display='d-print-block'
        }else{
            val.style.display='none'
            // val.setAttribute('class','mr-2 doedit btn btn-warning form-control')
        }
        console.log(stask)
    })
    // console.log(task_list)

}