let startPage = document.querySelector("#startPage");
let wordInput = document.querySelector("#word");
startPage.style.display = "block";
let charArray = [];
let displayString = "";
let guesses = [];
let round = 1;

document.querySelector("#enterWord").addEventListener("submit", (e) => {
    e.preventDefault();
    startPage.style.display = "none";
    playGame(wordInput.value);
});

function buildString() {

    // we need to make a string of charArray.length with spaces between each character
    // one way to do it would be to make a temporary clone of charArray, then replace each character with a "_" if it's not represented in guesses
    
    let string = "";
    let clone = Array.from(charArray);
   
    // check every letter in the clone
    for (let i = 0; i < clone.length; i++) {
        if (guesses.indexOf(clone[i]) === -1)
            clone[i] = "_";
    }

    for (let i = 0; i < clone.length; i++) {
        string += clone[i] + " ";
    }
    string = string.substring(0, string.length - 1)
    return string;
}

function playGame(word) {
    
    // start by splitting secret word into array of characters and displaying on the left side
    charArray = wordInput.value.split("");
    document.querySelector("#blanks").innerHTML = buildString();

    // addEventListener(submit) to playerInput form, which triggers playRound
    document.querySelector("#playerInput").addEventListener("submit", (e) => {
        e.preventDefault();
        let letter = document.querySelector("#letter")
        playRound(letter.value)
        letter.value = "";
    });

    // while two conditions: 
        // 1. hangman hasn't been built (7 turns?)
        // 2. user hasn't guessed all letters
}

// plays a round (this function triggered when player submits a letter)
function playRound(letter) {
   
    // alters right side letter array to signify letter has been guessed
    let letterGrid = document.querySelector("#letters").innerHTML;
    let newGrid = letterGrid.split(letter.toUpperCase());
    let newHTML = newGrid[0] + "<span class='strikeout'>" + letter.toUpperCase() + "</span>" + newGrid[1];
    document.querySelector("#letters").innerHTML = newHTML;

    guesses.push(letter);
    round += 1;

    // if guess is represented in the word, update string on the left side
    // if guess is not represented, move to next image of hangman
    if (charArray.indexOf(letter) !== -1)
        document.querySelector("#blanks").innerHTML = buildString();
    else {
        document.querySelector("#paint").src = "./images/hm" + round + ".png"; 
    }

    // display win screen if all chars are guessed
    // display lose screen if round = 8 and hangman is complete

}




