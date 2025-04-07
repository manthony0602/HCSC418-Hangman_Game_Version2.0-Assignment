import { initializeGame, processGuess, MAX_LIVES } from './hangmanLogic';

describe('Hangman Logic', () => {
  test('initializes correctly', () => {
    const word = 'TEST';
    const state = initializeGame(word);

    expect(state.curWord).toBe('TEST');
    expect(state.maskedWord).toEqual(['_', '_', '_', '_']);
    expect(state.usedLetters).toEqual([]);
    expect(state.lifeLeft).toBe(0);
    expect(state.gameOver).toBe(false);
    expect(state.gameWon).toBe(false);
  });

  test('processes correct guess', () => {
    let state = initializeGame('TEST');
    state = processGuess(state, 'T');

    expect(state.maskedWord).toEqual(['T', '_', '_', 'T']);
    expect(state.lifeLeft).toBe(0);
    expect(state.gameWon).toBe(false);
  });

  test('processes incorrect guess', () => {
    let state = initializeGame('TEST');
    state = processGuess(state, 'X');

    expect(state.wrongLetters).toContain('X');
    expect(state.lifeLeft).toBe(1);
    expect(state.gameOver).toBe(false);
  });

  test('detects win', () => {
    let state = initializeGame('HI');
    state = processGuess(state, 'H');
    state = processGuess(state, 'I');

    expect(state.gameWon).toBe(true);
    expect(state.gameOver).toBe(false);
  });

  test('detects game over', () => {
    let state = initializeGame('A');
    for (let i = 0; i < MAX_LIVES; i++) {
      state = processGuess(state, String.fromCharCode(66 + i)); // Wrong guesses B to G
    }

    expect(state.lifeLeft).toBe(MAX_LIVES);
    expect(state.gameOver).toBe(true);
    expect(state.gameWon).toBe(false);
  });
});
