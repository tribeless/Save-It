//We will use localStorage to store users 
//tasks instead of sessionStorage as it 
//caches the data and is permanet until deleted



loadAllEventListeners();
//adding all event listeners in the code
function loadAllEventListeners(){
    $(".submittask").on("click", addUserTask);

    
    //document.querySelectorAll(".remove-single-item").addEventListener("click", () => alert("working"));
    //load content on page load
    document.addEventListener("DOMContentLoaded", retrieveAllUsersTasks);

    //removing single item from local storage and unordered list
    $(".user-task-list").click(removeSingleUserTask);
    

    //remove all userstasks
    $(".clear-user-task-list").click(clearAllUsersTasks);

    //remove select element
    //
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

//called to scroll page to current text is
function scrollToNewPosition(){
    document.querySelector(".user-task-list").scrollTop = document.querySelector(".user-task-list").scrollHeight;
}

//when page loads, retrieve previous existing user tasks from local storage
    function retrieveAllUsersTasks(){
        var toDo;
       
        if (localStorage.getItem("usersTasks") === null) {
            toDo = [];
            
        }
        else{
            toDo = JSON.parse(localStorage.getItem("usersTasks"));
           
        }

         toDo.forEach(todo=>{

             $(".user-task-list").append($("<li>").html(todo));
           //  $(".user-task-list").append($("<a>").html("X"));
             $("li").append($("<a>").html("X"));
             
             $("li").children().addClass("remove-single-item");
             
             removeAnnoyingX();
             scrollToNewPosition();
            
         })

    }

    //adding new task to unordered list
    function addUserTask(){
        var date = new Date().toLocaleDateString();
        var $usersTaskArray = $(".simple-input").children("#userTask").val();
        
        
        if($usersTaskArray===""){

            alert("Please enter a task");
        }
        else{
            var ads = $usersTaskArray + " " + date;
            $(".user-task-list").append($("<li>").html(ads));
            $("li").append($("<a>").html("X"));

            $("li").children().addClass("remove-single-item");

            storeUserDataInLocalStorage(ads);
           
        }
         $(".simple-input").children("#userTask").val("");
        
        
        removeAnnoyingX();
        scrollToNewPosition();
    }

    //storing all user new tasks into local storage
    function storeUserDataInLocalStorage(todo){
        let toDo;
        let userDate;
        //console.log(date)
        if (localStorage.getItem("usersTasks") === null) {
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
        
        if (localStorage.getItem("usersTasks") === null) {
            toDo=[];
            
        }else{
            toDo = JSON.parse(localStorage.getItem("usersTasks"));
            
        }

        toDo.forEach((event,index)=>{
            if (localstorageusertask === event) {
                toDo.splice(index, 1);

            }
        });

       
        
        localStorage.setItem("usersTasks",JSON.stringify(toDo));
        scrollToNewPosition();

    }

    //clear all users tasks
    function clearAllUsersTasks(){
        $("li").remove();

        clearAllUsersTasksFromLocalStorage();
        scrollToNewPosition();
    }

    //clear all users tasks from local storage
    function clearAllUsersTasksFromLocalStorage(){
        localStorage.clear();
    }

