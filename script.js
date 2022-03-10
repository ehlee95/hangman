console.log("loaded");

let startPage = document.querySelector(".startPage");
let wordInput = document.querySelector("#word");
startPage.style.display = "block";
let charArray = [];
let displayString = "";
let guesses = [];

document.querySelector("#enterWord").addEventListener("submit", (e) => {
    e.preventDefault();
    startPage.style.display = "none";
    playGame(wordInput.value);
});

function buildString(wordArr) {
   
    let string = "";
    
    for (let i = 0; i < wordArr.length; i++) {
        // if wordArr[i] matches a guess, append the letter wordArr[i], if not, append a blank    
        //    for (let j = 0; j < guesses.length; j++) {
        //        if (guesses[j] === wordArr[i])
        //            string += wordArr[i];
        //    }
            string += wordArr[i];
            string += " "
    }
    string = string.slice(0, -1);
    return string;
}

function playGame(word) {

    charArray = wordInput.value.split("")
    displayString = buildString(charArray);
    document.querySelector("#blanks").innerHTML = displayString;

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

// cycle to next hangman image
// cross out guessed letter on letter array
// build new string with letters revealed, and append to #blanks innerHTML
function playRound(letter) {
    console.log(letter);    
    guesses.push(letter);
}
