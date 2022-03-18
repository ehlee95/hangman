# Project 4: Hangman

Basic 1-player or 2-player hangman game.

## Starting the game

The game opens up with a start page displayed as a modal. User is prompted to enter a word of their choice via text input. This word must contain only alphabetic characters, and once accepted, is converted into lowercase letters. Alternatively, the user can choose to play with a randomly generated word, selected via an API.

## Gameplay

Displayed on the left side of the screen are the hangman image and the secret word, represented by a series of letters and underscores. User may guess letters via a text input on the right side of the screen, and above that there is a list of all letters A-Z. Letters that have already been guessed are struck out and highlighted in red, and non-alphabetic characters are not accepted.

If the user guesses a letter that is represented in the secret word, it will be revealed on the left side of the screen. If the user guesses incorrectly, the hangman will be drawn with an additional body part and the number of guesses will be decremented.

Once the user has guessed all the words, an endgame modal is displayed congratulating the player. If the user runs out of guesses, a different endgame modal is displayed, which reveals the secret word. Both endgame modals give the user an option to play again.

