/*
1. Select DOM elements
2. Check input to see if it matches randonNum;
3. if number is wrong, display a message to user , tell them number of guesses left;

*/

const guessInput = document.getElementById('guess-input'),
    guessBtn = document.getElementById('guess-btn'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    message = document.querySelector('.message');

let guessesLeft = 2,
    min = 1,
    max = 10,
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;


minNum.textContent = min;
maxNum.textContent = max;

// event listener
guessBtn.addEventListener('click', () => {
    const guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess < minNum || guess > maxNum) {
        // unqualified number;
        setMessage(`Enter a number between ${min} and ${max}`, `red`);
    } // correct number, you won
    else if (guess === randomNum) {
        gameOver(true, `${guess} is correct answer, You win!`);
    } else {
        // wrong guesss , reduce guessesleft 
        guessesLeft -= 1;
        if (guessesLeft <= 0) {
            // Game Over
            gameOver(false, `Game over, the correct answer was ${randomNum}`);
        } else {
            // wrong answer - continue;
            setMessage(`${guess} is not correct, you have ${guessesLeft} guesses left`, `red`);
        }
    }
    // e.preventDefault();
});

function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color;
    // call set message and pass in the message
    setMessage(msg);
    // play again functionality
    guessBtn.value = 'Play again';
    guessBtn.className += 'play-again';
}

const setMessage = function (msg, color) {
    message.textContent = msg;
    message.style.color = color;
}

// Play again event listener
document.getElementById('game').addEventListener('mousedown', (e) => {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});