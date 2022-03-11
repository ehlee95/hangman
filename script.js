let startPage = document.querySelector("#startPage");
let wordInput = document.querySelector("#word");
startPage.style.display = "block";
let charArray = [];
let displayString = "";
let guesses = [];
let round = 1;

document.querySelector("#enterWord").addEventListener("submit", (e) => {
    e.preventDefault();
    // require at least one letter, all alphanumeric
    if (wordInput.value.length > 0 && wordInput.value.match(/^[A-Za-z]+$/)) {
    startPage.style.display = "none";
    playGame();
    }
});

function buildString() {

    // make a temporary clone of charArray, then replace each character with a "_" if it's not represented in guesses
    
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

function playGame() {
    
    // start by splitting secret word into array of characters and displaying on the left side
    charArray = wordInput.value.toLowerCase().split("");
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
        document.querySelector("#guessLeft").innerHTML = "Guesses left: " + `${8 - round}`
        document.querySelector("#paint").src = "./images/hm" + round + ".png"; 
    }

    // display win screen if all chars are guessed
    if (document.querySelector("#blanks").innerHTML.indexOf("_") === -1)
        document.querySelector("#winPage").style.display = "block";

    // display lose screen if round = 8 and hangman is complete
    if (round === 8)
        document.querySelector("#losePage").style.display = "block";

}




