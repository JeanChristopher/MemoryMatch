//global variables go here:
var  clickedArray = [];
var interval;
var started = false;
var time = 0;


//execute functions here:
setUp();


//function definitions go here:

function randomAnswers(){
    var answers = [1,1,2,2,3,3,4,4,5];
    answers.sort(function(item){
        return .5 - Math.random();
    })
    return answers;
}

function reveal(cell){
    cell.style.backgroundColor = "red";
    cell.innerHTML = cell.value;
    cell.clicked = true;
}

function startTimer(){
    if (started == false){
        interval = setInterval(function(){
            time++;
            document.getElementById("timer").innerHTML = "Time Elapsed: " + time;
        },1000)
        started = true;
    }
}

function setUp(){
    var grid = document.getElementsByTagName("td");
    var answers = randomAnswers();

    for(var i = 0; i < grid.length; i++){
        var cell = grid[i];
        cell.completed = false;
        cell.clicked = false;
        cell.value = answers[i];

        // permet d'avoir la couleur orange au clic sur un bloc du tableau
        cell.addEventListener("mouseenter",function(){
            startTimer();
            if(this.completed == false && this.clicked == false)
            this.style.background = "orange";
        
            if(this.clicked == false && this.completed == false){
            clickedArray.push(this);
            reveal(this);
        }
        
        });
       // lorsque l'on retire le clic de la souris, le carré devient bleu
       cell.addEventListener("mouseleave", function(){
           if(this.completed == false && this.clicked == false)
               this.style.background = "blue";   
       });       
    }

}