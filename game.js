const headingEle = document.getElementById("level-title"); // array of objects (nodes)
const btns = document.getElementsByClassName("btn");
const bodyEle = document.querySelector("body");

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

if (deviceType == "Desktop") {
  headingEle.innerHTML = `Press A Key to Start`;
  
  // For changing heading with current level & starting the game
  document.onkeydown = () => {
    // at first only started will be true (!false)
  if(!started) {
      // headingEle.innerText = `level ${level}`; this is not required
      nextSequence(); // to generate gamePattern (initiate the game)
      // after starting
      started = true;
    }
  }
  
} else {
  // Can include Tags using template literals
  headingEle.innerHTML = `Touch here<span class="star">⭐</span> to Start`;
  // touchend -> finger removed from screen
  headingEle.addEventListener("touchend", () => {

    if(!started) {
      nextSequence(); 
      started = true;
    }

  });
}


// Accessing each button element, adding event listener to each, call func if any one of it is clicked
for(let i = 0; i<btns.length; i++) {

  // different events for different devices
  const eventType = (deviceType == "Desktop") ? "click" : "touchend";

  btns[i].addEventListener(eventType, () => {
    let clickedColor = btns[i].getAttribute("id");
    userClickedPattern.push(clickedColor);

    // playing sound
    playSound(clickedColor);
    // for animation
    animatePress(clickedColor);

    // to check the answer is correct or not
    // index of recently pressed button (color) to check with appropriate game pattern
    checkAnswer(userClickedPattern.length - 1);
  });
}

// checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentIndex) {

  // to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  console.log(gamePattern[currentIndex] + "   " + userClickedPattern[currentIndex]);
  if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {;

    // If the user got the most recent (latest) answer right, then check the both array length to end the current level and move to next (to avoid looping or errors)
    if (userClickedPattern.length === gamePattern.length) {

      // Call nextSequence() after a 1000 millisecond delay for next level (pattern matches)
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    bodyEle.classList.add("game-over");

    if(deviceType == "Desktop") {
      headingEle.innerText = "Game over, Press any key to restart";
    } else {
      headingEle.innerText = "Game over, Press here to restart";
    }

    playSound("wrong");
    
    setTimeout(function() {
      bodyEle.classList.remove("game-over");
    }, 200);
    startOver();// to reset all values
  }

}

// Generating gamePattern randomly
function nextSequence() {

  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;

  headingEle.innerText = "Level " + level;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // to show the choosen key by gamePattern (acknoledge the user)
  const chosenBtn = document.getElementById(randomChosenColour);
  chosenBtn.classList.add("chosen");
  // $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  setTimeout(() => {
    chosenBtn.classList.remove("chosen");
  }, 150);

  playSound(randomChosenColour);
}

// Playing sound during click
function playSound(name) {
  // creating audio object
  let audio = new Audio("sounds/" + name + ".mp3");
  // playing the audio object
  audio.play();
}

// For btn animation during click
function animatePress(currentColor) {
  const animateBtn = document.getElementById(currentColor);
  animateBtn.classList.add("pressed");
  
  // remove the class after 0.1 sec (100 ms)
  setTimeout(() => {
    animateBtn.classList.remove("pressed");
  }, 100);
}

// To restart the game, when game is over
function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}

// For touch devices
for(let i = 0; i < buttons.length; i++) {
  // adding eventlistener to all buttons
  buttons[i].addEventListener("touchend", () => {
    console.log("button is touched");
  });
}