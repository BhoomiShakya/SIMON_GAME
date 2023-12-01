alert("The Simon game is the exciting electronic game of lights and sounds in which players must repeat random sequences of lights by pressing the colored pads in the correct order. It's fast-paced play, with lights and sounds that can challenge you. Experience the fun as you repeat the patterns and advance to higher levels");
var buttonColors=["red", "blue", "green", "yellow"];
var game_pattern=[];
var userClicked_pattern=[];
var started=false;
var level=0;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

$(".btn").on("click",function(){
    var user_chosen_col=$(this).attr("id");
    userClicked_pattern.push(user_chosen_col);
    playsound(user_chosen_col);
    animatePress(user_chosen_col);
    check_ans(userClicked_pattern.length-1);
});

function check_ans(current_level){
    if(game_pattern[current_level]===userClicked_pattern[current_level]){
        // console.log("success");
        if(userClicked_pattern.length===game_pattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        // console.log("wrong");
        playsound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
        startOver();
    }
}

function nextSequence(){
    userClicked_pattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var ran_num=Math.floor(Math.random()*4);
    var ran_chosen_col=buttonColors[ran_num];
    game_pattern.push(ran_chosen_col);
    $("#"+ran_chosen_col).fadeIn(100).fadeOut(100).fadeIn(100);
   playsound(ran_chosen_col);
}


function animatePress(current_col){
    $("#"+current_col).addClass("pressed");
    setTimeout(function(){
        $("#"+current_col).removeClass("pressed");
    },100);  
}

function playsound(name){
    var audio= new Audio("sounds/"+name+".mp3");
    audio.play();
}


function startOver(){
    level=0;
    game_pattern=[];
    started=false;
}