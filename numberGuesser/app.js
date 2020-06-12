/*
DOM Variables
GAME RULES
guess = winningNum = winner , display congrats message, color green, disable input
guess != winning num, reduce guessesLeft and give another try again. display guesses left
*/

const game = document.getElementById('game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessInput = document.getElementById('guess-input'),
    guessBtn = document.getElementById('guess-btn'),
    message = document.querySelector('.message'),
    winningNum = 8;
let min = 1,
    max = 15;
// set UI values
minNum.textContent = min;
maxNum.textContent = max;
let guessLeft = 2;

// event listener
guessBtn.addEventListener('click', function () {
    let guessValue = parseInt(guessInput.value);
    // check if input field is empty
    if (isNaN(guessValue) || guessValue === "") {
        alert(`Enter a guess`);
    };
    //validate input field within range
    if (guessValue < min || guessValue > max) {
        setMessage(`Enter a value between ${min} and ${max}`, `red`);
    } else if (guessValue !== winningNum) {
        // wrong guess
        // 1. reduce guesses left
        guessLeft -= 1;
        setMessage(`Wrong answer, try again, you have ${guessLeft} guesses left`, `red`);
        if (guessLeft === 0) {
            // wrong guess - you lost
            setMessage(`Wrong answer, the correct answer is ${winningNum}`);
            guessInput.disabled = true;
        }
    } else {
        console.log('winner')
    }

});

function setMessage(msg, color) {
    message.innerText = msg;
    message.style.color = color;
}