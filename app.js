
class toDoList{

    constructor()
    {
        this.tasks=[];
    }

     addTask(task)
    {
       this.tasks.push({id:this.tasks.length+1,task:task,completed:false});
    }

    completed(index)
    {
        if(index>=0 && index<this.tasks.length)
        {
            this.tasks[index].completed=true;
        }
    }
    undoTask(index)
    {
        if(index>=0 && index<this.tasks.length)
        {
            this.tasks[index].completed=false;
        }
    }

    summary()
    {
      let totalTasks=this.tasks.length;
      let completedTasks=this.tasks.filter((x)=>x.completed==true).length;
      let remainingTasks=totalTasks-completedTasks;

    

      return {totalTasks,completedTasks,remainingTasks};
    }
}

 const todo = new toDoList();
// todo.addTask("Lean Html");
// todo.addTask("Lean css");
// todo.addTask("Lean javscript");

// console.log(todo);

// console.log(todo.summary());
// todo.completed(2)
// console.log(todo);
// console.log(todo.summary());
// todo.undoTask(2);
// console.log(todo);
// console.log(todo.summary());


document.getElementById("addTaskButton").addEventListener("click",()=>
{
    const task = document.getElementById("textInput").value.trim();

    console.log(task);

    if(task!="")
    {
       todo.addTask(task);
      
       console.log(todo.summary());
       
       updateTaskList();
       updateSummary();
       document.getElementById("textInput").value="";
    }
})





function updateSummary()
{
    document.getElementById("totalTasks").innerHTML=todo.summary().totalTasks;
    document.getElementById("CompletedTasks").innerHTML=todo.summary().completedTasks;
    document.getElementById("remainingTasks").innerHTML=todo.summary().remainingTasks;
}








// function updateTaskList(task)
// {
//   let listItem = document.createElement("li");
//   listItem.innerHTML=task;



//   const button = document.createElement("button");
  
//   button.innerHTML=todo.completed[1]?"Undo":"Done";
//   console.log(todo.completed[1]);

//   listItem.appendChild(button);

//   const taskList =document.getElementById("taskList");
//   taskList.appendChild(listItem);
// }

function updateTaskList()
{
  const taskList = document.getElementById("taskList");
  taskList.innerHTML="";

  todo.tasks.forEach((taskitem,index)=>{
    let listItem = document.createElement("li");
    listItem.classList.add("taskItem");
    
    let taskText = document.createElement("div");
    taskText.classList.add("taskText");

    taskText.textContent=taskitem.task;

    let toggleButton = document.createElement("button");
    
    toggleButton.textContent=taskitem.completed?"Undo":"Done";

    if(toggleButton.textContent=="Undo")
    {
        listItem.classList.toggle("taskCompleted");
    }

    toggleButton.addEventListener("click",()=>
    {
        listItem.classList.toggle("taskCompleted");

        let isCompleted = listItem.classList.contains("taskCompleted");
        
        toggleButton.textContent=isCompleted?"Undo":"Done";

        if(isCompleted)
        {
            todo.completed(index);
        }
        else
        {
            todo.undoTask(index);
        }

        updateSummary();

        
    });

    listItem.append(taskText);
        listItem.append(toggleButton);

        taskList.append(listItem);
   
});

}
updateSummary();