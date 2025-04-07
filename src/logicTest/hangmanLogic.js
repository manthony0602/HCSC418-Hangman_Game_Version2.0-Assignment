// src/utils/hangmanLogic.js

export const MAX_LIVES = 6;

export function initializeGame(word) {
  return {
    curWord: word.toUpperCase(),
    maskedWord: Array(word.length).fill('_'),
    usedLetters: [],
    wrongLetters: [],
    lifeLeft: 0,
    gameOver: false,
    gameWon: false,
  };
}

export function processGuess(state, letter) {
  const usedLetters = [...state.usedLetters, letter];
  let maskedWord = [...state.maskedWord];
  let lifeLeft = state.lifeLeft;
  let wrongLetters = [...state.wrongLetters];

  if (state.curWord.includes(letter)) {
    for (let i = 0; i < state.curWord.length; i++) {
      if (state.curWord[i] === letter) {
        maskedWord[i] = letter;
      }
    }
  } else {
    lifeLeft += 1;
    wrongLetters.push(letter);
  }

  const gameOver = lifeLeft >= MAX_LIVES;
  const gameWon = !maskedWord.includes('_');

  return {
    ...state,
    usedLetters,
    maskedWord,
    wrongLetters,
    lifeLeft,
    gameOver,
    gameWon,
  };
}
