
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;

$(document).on("keypress",function(){
  if(!started){
    $("h1").text("Level  "+level);
    nextSequence();
    started = true;
  }
})

function nextSequence(){
  level++;
  $("h1").text("Level  "+level);
  var randomNumber = Math.floor(4*Math.random());
  var randomColor = buttonColors[randomNumber];
  gamePattern[gamePattern.length] = randomColor;
  $("#"+randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

$(".btn").on("click",function(event){
  var buttonClicked = $(this).attr("id");
  userPattern.push(buttonClicked);
  playSound(buttonClicked);
  animatePress(buttonClicked);
  checkAnswer(userPattern.length-1);
})

function checkAnswer(currentLevel){
  if(userPattern[currentLevel]==gamePattern[currentLevel]){
    if(currentLevel == gamePattern.length-1){
      setTimeout(function(){nextSequence();},1000);
      userPattern = [];
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    $("h1").text("Game Over , Press Any Key To Restart ");
    startOver();
  }
}
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){
  gamePattern = [];
  userPattern = [];
  started = false;
  level = 0;
}
