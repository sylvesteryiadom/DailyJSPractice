/*
DOM Variables
GAME RULES
guess = winningNum = winner , display congrats message, color green, disable input
guess != winning num, reduce guessesLeft and give another try again. display guesses left
*/

'use strict';

const game = document.getElementById('game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessInput = document.getElementById('guess-input'),
    guessBtn = document.getElementById('guess-btn'),
    message = document.querySelector('.message'),
    winningNum = 8; // generate random number;
let min = 1,
    max = 20;
// set UI values
minNum.textContent = min;
maxNum.textContent = max;
let guessLeft = 2;

// event listener 2 using DOM traversal to pick up the target.
game.addEventListener('mousedown', function (e) {
    if (e.target.classList.contains('play-again')) {
        window.location.reload();
    }
});
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
            gameWon(false, `Wrong answer, the correct answer is ${winningNum}`);
        }
    } else {
        gameWon(true, `Correct answer, you win!!`);
    }

});

function gameWon(won, msg) {
    let color;
    won === true ? color = `green` : color = `red`;
    // message.style.color = color;
    guessInput.style.borderColor = color;
    guessInput.disabled = true;
    guessBtn.value = 'Play Again';
    guessBtn.className = 'play-again';
    setMessage(msg, color);
}

function setMessage(msg, color) {
    message.innerText = msg;
    message.style.color = color;
    guessInput.style.borderColor = color;
}