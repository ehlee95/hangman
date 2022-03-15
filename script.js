// initialize game variables
let startPage = document.querySelector("#startPage");
let wordInput = document.querySelector("#word");
startPage.style.display = "block";
wordInput.focus();
let word = "";
let charArray = [];
let displayString = "";
let guesses = [];
let round = 1;

// prompts user for word, starts game when submitted 
document.querySelector("#enterWord").addEventListener("submit", (e) => {
    e.preventDefault();
    word = wordInput.value;
    // require at least one letter, all alphanumeric
    if (word.length > 0 && word.match(/^[A-Za-z]+$/)) {
    playGame();
    }
});

// start game by getting random word via API
document.querySelector("#randomWord").addEventListener("click", () => {
    fetch("https://random-word-api.herokuapp.com/word?number=1")
        .then(res => res.json())
        .then(res => {
            word = res[0];
            playGame();
        })
});

https://random-word-api.herokuapp.com/word?number=1

// builds a string of N length, with spaces wherever user hasn't guessed the letter
function buildString() {

    // need to use clone so you don't alter original array
    let string = "";
    let clone = Array.from(charArray);
   
    // check every letter in the clone to see if letter guessed
    for (let i = 0; i < clone.length; i++) {
        if (guesses.indexOf(clone[i]) === -1)
            clone[i] = "_";
    }
    
    // add spaces between letters
    for (let i = 0; i < clone.length; i++) {
        string += clone[i] + " ";
    }
    string = string.substring(0, string.length - 1)
    return string;
}

// initialize game
function playGame() {
   
    startPage.style.display = "none";

    // start by splitting secret word into array of characters and displaying on the left side
    charArray = word.toLowerCase().split("");
    document.querySelector("#blanks").innerHTML = buildString();
    document.getElementById("letter").focus();

    // addEventListener(submit) to playerInput form, which triggers playRound
    document.querySelector("#playerInput").addEventListener("submit", (e) => {
        e.preventDefault();
        let letter = document.querySelector("#letter")
        if (letter.value.length === 1 && letter.value.match(/^[A-Za-z]+$/))
            playRound(letter.value.toLowerCase())
        letter.value = "";
    });
}

// plays a round (this function triggered when player submits a letter)
function playRound(letter) {
   
    // check if letter has already been guessed. if it has, return
    if (guesses.indexOf(letter) === -1)
        guesses.push(letter);
    else
        return;

    // alters right side letter array to signify letter has been guessed
    let letterGrid = document.querySelector("#letters").innerHTML;
    let newGrid = letterGrid.split(letter.toUpperCase());
    let newHTML = newGrid[0] + "<span class='strikeout'>" + letter.toUpperCase() + "</span>" + newGrid[1];
    document.querySelector("#letters").innerHTML = newHTML;

    // if guess is represented in the word, update string on the left side
    // if guess is not represented, move to next image of hangman
    if (charArray.indexOf(letter) !== -1)
        document.querySelector("#blanks").innerHTML = buildString();
    else {
        round += 1;
        document.querySelector("#guessLeft").innerHTML = "Guesses left: " + `${8 - round}`;
        document.querySelector("#paint").src = "./images/hm" + round + ".png"; 
    }

    // display win screen if all chars are guessed
    if (document.querySelector("#blanks").innerHTML.indexOf("_") === -1) {
        document.querySelector("#winPage").style.display = "block";    
        document.querySelectorAll("#winreplay").focus();
    }

    // display lose screen if round = 8 and hangman is complete
    if (round === 8) {
        document.querySelector("#losePage").style.display = "block";
        document.querySelector("#loseText").innerHTML = `Oh no! You've run out of guesses.<br>The word was <b>"${word}"</b>`;
        document.querySelectorAll("losereplay").focus(); 
    }
}

