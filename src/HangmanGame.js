// src/HangmanGame.js
import './App.css';
import React, { useState, useEffect } from 'react';
import SingleLetterSearchbar from './SingleLetterSearchBar';
import LetterBox from './LetterBox';
import {
  initializeGame,
  processGuess,
  MAX_LIVES,
} from './logicTest/hangmanLogic'; // update path if needed
import axios from 'axios';

const pics = [
  '/firstImg.png',
  '/secondImg.png',
  '/thirdImg.png',
  '/fourthImg.png',
  '/fifthImg.png',
  '/sixthImg.png',
  '/seventhImg.png',
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

function HangmanGame() {
  const [gameState, setGameState] = useState(initializeGame(''));
  const [playerName, setPlayerName] = useState('');

  const startNewGame = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    const newGameState = initializeGame(newWord);
    setGameState(newGameState);
  };

  const handleGuess = (letter) => {
    if (
      gameState.gameOver ||
      gameState.gameWon ||
      gameState.usedLetters.includes(letter)
    )
      return;

    const updatedState = processGuess(gameState, letter);
    setGameState(updatedState);
  };

  useEffect(() => {
    if ((gameState.gameOver || gameState.gameWon) && playerName) {
      axios
        .post('http://localhost:5000/record', {
          name: playerName,
          didWin: gameState.gameWon,
        })
        .then(() => {
          console.log('✔️ Result saved to DB');
        })
        .catch((err) => {
          console.error('Error saving result:', err);
        });
    }
  }, [gameState.gameOver, gameState.gameWon, playerName]);

  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <div className="game-container">
      <h1>Hangman Game</h1>

      <img
        src={pics[Math.min(gameState.lifeLeft, pics.length - 1)]}
        alt="Hangman"
        className="hangman-image"
      />

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '200px',
            borderRadius: '5px',
            border: '2px solid #3498db',
          }}
        />
      </div>

      {playerName && (
        <p style={{ fontSize: '18px', marginBottom: '10px' }}>
          Welcome, {playerName}!
        </p>
      )}

      <p className="word-display">{gameState.maskedWord.join(' ')}</p>
      <p className="lives-left">Lives Left: {MAX_LIVES - gameState.lifeLeft}</p>

      <SingleLetterSearchbar onSearch={handleGuess} />
      <p>Guessed Letters: {gameState.usedLetters.join(', ')}</p>

      {gameState.gameOver && (
        <p className="game-over">
          Game Over! The word was: {gameState.curWord}
        </p>
      )}
      {gameState.gameWon && (
        <p className="game-won">Congratulations! You won!</p>
      )}

      <h3>Incorrect Guesses:</h3>
      <div className="incorrect-letters-container">
        {gameState.wrongLetters.map((letter, index) => (
          <LetterBox
            key={index}
            letter={letter}
            isVisible={true}
            boxStyle={{ backgroundColor: 'red' }}
            letterStyle={{ color: 'white', fontSize: '30px' }}
          />
        ))}
      </div>

      <button onClick={startNewGame}>New Game</button>

      <button
        style={{ marginTop: '10px' }}
        onClick={() => {
          axios
            .get(`http://localhost:5000/stats/${playerName}`)
            .then((res) => {
              const { winPercent, wins, losses } = res.data;
              alert(
                `Stats for ${playerName}:\nWins: ${wins}\nLosses: ${losses}\nWin %: ${winPercent}`
              );
            })
            .catch((err) => {
              console.error('Error fetching stats', err);
              alert('Could not fetch stats.');
            });
        }}
        disabled={!playerName}
      >
        Show My Stats
      </button>
    </div>
  );
}

export default HangmanGame;
