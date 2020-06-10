/*
1. Select DOM elements
2. Check input to see if it matches randonNum;
3. if number is wrong, display a message to user , tell them number of guesses left;

*/

const guessInput = document.getElementById('guess-input'),
    guessBtn = document.getElementById('guess-btn'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num');

let guessesLeft = 3,
    randomNum = 5,
    min = 1,
    max = 10;

minNum.textContent = min;
maxNum.textContent = max;

// event listener
guessBtn.addEventListener('click', (e) => {
    const guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess < minNum || guess > maxNum) {
        // wrong number
        setMessage(`Enter a number between ${minNum} and ${maxNum}`, `red`);

    } else if (guess !== randomNum) {
        // wrong guesss
        guessesLeft -= 1;
        setMessage(`${guess} is not correct, you have ${guessesLeft} guesses left`, 'red');

    } else {
        // correct number
        console.log(`Correct answer`);
    }
    e.preventDefault();
});

const setMessage = function (message, color) {
    const paragraph = document.createElement('p');
    paragraph.appendChild(document.createTextNode(message));
    paragraph.style.color = color;
    const container = document.querySelector('.message');
    document.getElementById('game').insertBefore(paragraph, container);
}