### Hangman Game Project

This project is a **React-based Hangman Game** where users guess a randomly selected word letter by letter. Players have a limited number of incorrect guesses before they lose. The game features dynamic word selection, a visual hangman progression, and interactive gameplay.

## **Features**

✔️ Renders a **HangmanGame** component that controls the game logic  
✔️ Allows users to:

- Guess one letter at a time
- View incorrect guesses
- See a masked version of the word  
  ✔️ Updates the hangman image with each incorrect guess  
  ✔️ Displays **win/lose conditions** based on the number of incorrect guesses  
  ✔️ Includes a **restart button** to start a new game

---

### **Files Overview**

- **`HangmanGame.js`** - The **main component** that handles game logic, word selection, and user interaction.
- **`SingleLetterSearchBar.js`** - The **input component** where users enter letter guesses.
- **`LetterBox.js`** - Displays incorrect guesses in individual styled boxes.
- **`index.js`** - The **entry point** that renders the `HangmanGame` component.
- **`App.css` & `index.css`** - Styling files to enhance UI.
- **`index.html`** - The main HTML file for rendering the React app.

---

## **How It Works**

### **Main Component (`HangmanGame.js`)**

- Selects a **random word** from a predefined list.
- Manages **state** for:
  - The current word
  - The masked word display
  - Correct and incorrect guesses
  - The number of remaining lives
  - Game over and win conditions
- Handles **button clicks** to process guesses and update game status.

### **Input Component (`SingleLetterSearchBar.js`)**

- Allows users to enter **one letter at a time**.
- Validates input to ensure only a **single letter (A-Z)** is entered.
- Calls the `handleGuess` function in `HangmanGame.js` to process guesses.

### **Incorrect Letters Display (`LetterBox.js`)**

- Displays incorrect guesses in **red-styled boxes**.
- Updates dynamically as the user makes incorrect guesses.

---

## **Installation & Setup**

1. Clone this repository:

   ```sh
   git clone https://github.com/your-username/react-parent-child-demo.git
   cd react-parent-child-demo
   ```

2. **Navigate to the Project Folder**:

   ```bash
   cd your-repo-name
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Start the Development Server**:

   ```bash
   npm start
   ```

5. **Open the Application**:
   ```bash
   The app will open automatically in your browser at http://localhost:3000
   If it doesnt, manually navigate to http://localhost:3000
   ```

## Application Screenshot

![Hangman Assignment ("Hangman Game" Homework) Screenshot](hangmanImg.jpg)

