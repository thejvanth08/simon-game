const headingEle = document.querySelectorAll("h1"); // array of objects (nodes)
const buttons = document.getElementsByClassName("btn");

let buttonColours = ["red", "blue", "green", "yellow"];

// random correct pattern
let gamePattern = [];
// user's response pattern
let userClickedPattern = [];

let started = false;
let level = 0;


// To detect in which device the website is opened
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';

const deviceType = detectDeviceType();
let currentHeading;

if (deviceType == "Desktop") {
  currentHeading = headingEle[0];
  // disabling mobile's heading for desktop
  headingEle[1].style.display = "none";
} else {
  currentHeading = headingEle[1];
  // disabling desktop's heading for mobile
  headingEle[0].style.display = "none";
}

// for changing heading with current level & starting the game
document.onkeyup = () => {
  // at first only started will be true (!false)
  if(!started) {
      currentHeading.innerText = `level ${level}`;
      nextSequence();
      // after starting
      started = true;
  }
}

// jquery has to be replaced with vanilla js
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});


//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");

    $("body").addClass("game-over");
    $("h1").text("Game over, Press any key to restart");
    playSound("wrong");
    
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();// to reset all values
  }

}

function nextSequence() {

  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}


for(let i = 0; i < buttons.length; i++) {
  // adding eventlistener to all buttons
  buttons[i].addEventListener("touchend", () => {
    console.log("button is touched");
  });
}