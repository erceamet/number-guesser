/*
GAME RULES
- Player must guess a number between min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify player of the correct answer if the game is lost
- Give the to the player to play again
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for play again
game.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function() {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(
      `Please make sure you enter a number between ${min} and ${max}.`,
      "red"
    );
  } else {
    // Check if won
    if (guess === winningNum) {
      // Game over - you WIN
      gameOver(
        true,
        `You have guessed the number! ${winningNum} is the correct answer.`
      );
    } else {
      guessesLeft -= 1;
      if (guessesLeft === 0) {
        // Game over - You LOSE
        gameOver(false, `You lost! The the correct answer was ${winningNum}.`);
      } else {
        // Game continues - answer wrong
        // Change the border color
        guessInput.style.borderColor = "red";
        // Clear input
        guessInput.value = "";
        // Send a message to the user telling them it's the wrong nr
        setMessage(
          `${guess} is not correct! ${guessesLeft} guesses left.`,
          "red"
        );
      }
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  // Disable the input
  guessInput.disabled = true;
  // Change border color to green
  guessInput.style.borderColor = color;
  setMessage(msg, color);

  // Play again
  guessBtn.value = "Play again";
  guessBtn.className += "play-again";
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Get winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
