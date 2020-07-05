//We will use localStorage to store users 
//tasks instead of sessionStorage as it 
//caches the data and is permanet until deleted



loadAllEventListeners();
//adding all event listeners in the code
function loadAllEventListeners(){
    $(".submittask").on("click", addUserTask);

    //load content on page load
    document.addEventListener("DOMContentLoaded", retrieveAllUsersTasks);

    //removing single item from local storage and unordered list
    $(".user-task-list").click(removeSingleUserTask);

    //remove all userstasks
    $(".clear-user-task-list").click(clearAllUsersTasks);
}

//counter to remove an annoying button
let counter = 0;
counter++;

//just removing an annoying extra X in code(❁´◡`❁)
function removeAnnoyingX(){
    var removeSingleRowBtn = document.querySelectorAll("li");
    for (var i = 0; i < removeSingleRowBtn.length; i++) {
        if (removeSingleRowBtn[i].children.length >= 2) {
            removeSingleRowBtn[i].children[counter].remove();
        }


    }
}
//when page loads, retrieve previous existing user tasks from local storage
    function retrieveAllUsersTasks(){
        var toDo;
        if(localStorage.getItem("usersTasks")===null){
            toDo = [];
        }
        else{
            toDo = JSON.parse(localStorage.getItem("usersTasks"));
        }

        toDo.forEach(todo=>{

            $(".user-task-list").append($("<li>").html(todo));
            $("li").append($("<button>").html("X"));
            $("li").children().addClass("remove-single-item");

            removeAnnoyingX();
            
        })
    }

    //adding new task to unordered list
    function addUserTask(){

        var $usersTaskArray = $(".simple-input").children("#userTask").val();
        if($usersTaskArray===""){
            alert("Please enter a task");
        }
        else{
            $(".user-task-list").append($("<li>").html($usersTaskArray));
            $("li").append($("<button>").html("X"));
            $("li").children().addClass("remove-single-item");

            storeUserDataInLocalStorage($usersTaskArray);
            $(".simple-input").children("#userTask").val("");
        }
        $usersTaskArray = "";

        
        removeAnnoyingX();
    }

    //storing all user new tasks into local storage
    function storeUserDataInLocalStorage(todo){
        let toDo;
        if (localStorage.getItem("usersTasks")===null){
            toDo=[];
        }
        else{
            toDo = JSON.parse(localStorage.getItem("usersTasks"));
        }
        toDo.push(todo);
        localStorage.setItem("usersTasks",JSON.stringify(toDo));

    }

    //removing single item from the unoerderes list
    function removeSingleUserTask(e){
        var bvd = e.target;
        
        var singleUserTask=bvd.parentElement.innerText.replace("X", "");
        bvd.parentElement.remove();

        removeSingleTaskFromLocalStorage(singleUserTask);

    }

    //removing a single item from local storage
    function removeSingleTaskFromLocalStorage(localstorageusertask){
        let toDo;
        if (localStorage.getItem("usersTasks")===null){
            toDo=[];
        }else{
            toDo = JSON.parse(localStorage.getItem("usersTasks"));
        }

        toDo.forEach((event,index)=>{
            if (localstorageusertask === event) {
                toDo.splice(index, 1);

            }
        });
        localStorage.setItem("usersTasks",JSON.stringify(toDo))        ;

    }

    //clear all users tasks
    function clearAllUsersTasks(){
        $("li").remove();

        clearAllUsersTasksFromLocalStorage();
    }

    //clear all users tasks from local storage
    function clearAllUsersTasksFromLocalStorage(){
        localStorage.clear();
    }

