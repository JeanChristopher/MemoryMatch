//global variables go here:
var  clickedArray = [];
var interval;
var started = false;
var time = 0;
// Indicates when the application is able to handle clic events
var ready = true;
// keep track of the cells that have been completed
var numCompleted = 0;

//execute functions here:
setUp();


//function definitions go here:

// select random numbers in a table 
function randomAnswers(){
    var answers = [1,1,2,2,3,3,4,4,5];
    answers.sort(function(item){
        return .5 - Math.random();
    })
    return answers;
}

// change the color of a cell when the mouse over it 

function reveal(cell){
    cell.style.backgroundColor = "red";
    cell.innerHTML = cell.value;
    cell.clicked = true;
}

/**
 * start the timer by calling an interval  between every cell revelation 
 */

function startTimer(){
    if (started == false){
        interval = setInterval(function(){
            time++;
            document.getElementById("timer").innerHTML = "Time Elapsed: " + time;
        },1000)
        started = true;
    }
}

/**
 * revert red cells back to blue cells and also hide the preceded shown number
 * set the click attribute to false so it can be clicked later 
*/

function hide(cell){
    cell.style.backgroundColor = "blue";
    cell.innerHTML = "";
    cell.clicked = false;
}

/**
 * turn cells to purple and sets their completed attribute to true 
 * increments thenumCompleted global variable
 */

function complete(cell){
    numCompleted++;
    cell.completed = true;
    cell.style.backgroundColor = "purple";
}

function setUp(){
    var grid = document.getElementsByTagName("td");
    var answers = randomAnswers();

    // handle keydown events and use the key pad number 
    document.addEventListener('keydown', function(event){
        if(event.key > 0 && event.key < 10 ){
            grid[event.key - 1].click();
        }    
    });

    // reload the game when the restart button is pressed
    document.getElementById('restart').addEventListener('click', function(){
        location.reload();
    });

    for(var i = 0; i < grid.length; i++){
        var cell = grid[i];
        cell.completed = false;
        cell.clicked = false;
        cell.value = answers[i];

        // permet d'avoir la couleur orange au clic sur un bloc du tableau
        cell.addEventListener("mouseenter",function(){
            // make the application unable to handle clic events when the ready attribute is set to false
            if(ready == false)
            return;
            startTimer();
            if(this.completed == false && this.clicked == false)
            this.style.background = "orange";
        
            if(this.clicked == false && this.completed == false){
            clickedArray.push(this);
            reveal(this);
            }
            if(clickedArray.length == 2){

            // compare if the two clicked values are the same and get the clicked table emptied
            if(clickedArray[0].value == clickedArray[1].value){
               // call the complete method on the cell
                complete(clickedArray[0]);
                complete(clickedArray[1]);
                
                clickedArray = [];
                /**
                 * number = 8 this means we have 8 pairs numbers that matched ;
                 * the system print you won ;
                 * the interval variable is cleared so it stops to run ;
                 */ 
                if(numCompleted == 8){
                    alert("You won in " + time + " seconds!");
                    clearInterval(interval);
                }    
            }
            //if a matching pair is not found
            /**
             * the application is not able to handle clic events
             * setimeout allow the users to look a bit at the hidden values
             */
            else{
                ready = false;
                document.getElementById("gridTable").style.border = "5px solid red";                 
    
                setTimeout(function(){
                    //after a 500ms delay    
                    hide(clickedArray[0]);
                    hide(clickedArray[1]);
                    clickedArray = [];
                    ready = true;
                        document.getElementById("gridTable").style.border = "5px solid black";
                },500);    
            }
        }
    });
       // lorsque l'on retire le clic de la souris, le carré devient bleu
       cell.addEventListener("mouseleave", function(){
           if(this.completed == false && this.clicked == false)
               this.style.background = "blue";   
       });       
       
       

    }
    

}