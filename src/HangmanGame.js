import './App.css';
import React from 'react';
import SingleLetterSearchbar from './SingleLetterSearchBar';
import LetterBox from './LetterBox';

const pics = [
  '/firstImg.png',
  '/secondImg.png',
  '/thirdImg.png',
  '/fourthImg.png',
  '/fifthImg.png',
  '/sixthImg.png',
  '/seventhImg.png', // Last image, should match max incorrect guesses (6)
];

const words = [
  'Morehouse',
  'Spelman',
  'Basketball',
  'Table',
  'Museum',
  'Excellent',
  'Fun',
  'React',
];

class HangmanGame extends React.Component {
  state = {
    curWord: '',
    maskedWord: [],
    usedLetters: [],
    wrongLetters: [], // Stores incorrect guesses
    lifeLeft: 0, // Starts at 0, max mistakes = 6
    gameOver: false,
    gameWon: false,
  };

  componentDidMount() {
    this.startNewGame();
  }

  startNewGame = () => {
    const newWord =
      words[Math.floor(Math.random() * words.length)].toUpperCase();

    this.setState({
      curWord: newWord,
      maskedWord: Array(newWord.length).fill('_'), // Hide all letters
      usedLetters: [],
      wrongLetters: [], // Reset wrong guesses
      lifeLeft: 0,
      gameOver: false,
      gameWon: false,
    });
  };

  handleGuess = (letter) => {
    if (this.state.gameOver || this.state.usedLetters.includes(letter)) return;

    this.setState((prevState) => {
      const usedLetters = [...prevState.usedLetters, letter];
      let maskedWord = [...prevState.maskedWord];
      let lifeLeft = prevState.lifeLeft;
      let wrongLetters = [...prevState.wrongLetters];

      // Check if letter is in the word
      if (prevState.curWord.includes(letter)) {
        for (let i = 0; i < prevState.curWord.length; i++) {
          if (prevState.curWord[i] === letter) {
            maskedWord[i] = letter;
          }
        }
      } else {
        lifeLeft += 1; // Reduce life on incorrect guess
        wrongLetters.push(letter); // Add incorrect letter to wrongLetters array
      }

      const gameOver = lifeLeft >= pics.length - 1; // Game over after max incorrect guesses (6)
      const gameWon = !maskedWord.includes('_'); // Win when no underscores remain

      return {
        usedLetters,
        maskedWord,
        lifeLeft,
        wrongLetters,
        gameOver,
        gameWon,
      };
    });
  };

  render() {
    return (
      <div className="game-container">
        <h1>Mason's Hangman Game </h1>
        <img
          src={pics[Math.min(this.state.lifeLeft, pics.length - 1)]}
          alt="Hangman"
          className="hangman-image"
        />
        <p className="word-display">{this.state.maskedWord.join(' ')}</p>
        <p className="lives-left">Lives Left: {6 - this.state.lifeLeft}</p>

        <SingleLetterSearchbar onSearch={this.handleGuess} />

        <p>Guessed Letters: {this.state.usedLetters.join(', ')}</p>

        {this.state.gameOver && (
          <p className="game-over">
            Game Over! The word was: {this.state.curWord}
          </p>
        )}
        {this.state.gameWon && (
          <p className="game-won">Congratulations! You won!</p>
        )}

        <h3>Incorrect Guesses:</h3>
        <div className="incorrect-letters-container">
          {this.state.wrongLetters.map((letter, index) => (
            <LetterBox
              key={index}
              letter={letter}
              isVisible={true}
              boxStyle={{ backgroundColor: 'red' }}
              letterStyle={{ color: 'white', fontSize: '30px' }}
            />
          ))}
        </div>

        <button onClick={this.startNewGame}>New Game</button>
      </div>
    );
  }
}

export default HangmanGame;
