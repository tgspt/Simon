

var buttonColours = ["red","blue","green","yellow"];
var gamePattern =[];

var userClickedPattern =[];
var level = 0 ;
var started = false;

//start function
$(document).keypress(function() {
    if (started==false) {
  
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
});

//Gets random colours, join all the random colours, count the levels, fade animation
function nextSequence(){
    userClickedPattern=[]

    var randomNumber=Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    
    
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);

    level++;

    $("#level-title").text("Level "+level);
    
}
    
//saves the colour chosen by the user 
$(".btn").click(function(){
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern)
    //console.log(gamePattern)
    playSound(userChosenColour);
    animatedPress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1)
})

    //checkAnswer(userClickedPattern.length-1)

function playSound(name){
    var sound=new Audio("sounds/"+name+".mp3");
    sound.play();
}

function animatedPress(currentColour){
$("."+currentColour).addClass("pressed");
setTimeout(function(){$("."+currentColour).removeClass("pressed");},100);
}

// checks the answer, if right will run the nextsequence function, if wrong will reset the game.
function checkAnswer(currentLevel){
    
    if (userClickedPattern[currentLevel]==gamePattern[currentLevel]) { 
        console.log("sucess")
            if(userClickedPattern.length==gamePattern.length){
                setTimeout(function (){nextSequence();}, 1000);
            }

    }else{
        console.log("wrong")
        var wrong=new Audio("sounds/wrong.mp3")
        wrong.play()
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200)
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver();
    }

}
//reset all the variables needed to restart the game
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}