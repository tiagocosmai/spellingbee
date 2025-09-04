# Spelling Bee Game - React App

A Spelling Bee game built with React.js where players see images and spell the corresponding words in English using a virtual keyboard. Features the Educa Portinari logo.

## Features

- Image-based word spelling game
- Virtual keyboard interface (no typing required)
- 12 different words with images
- Real-time feedback on answers
- Progressive gameplay - must get correct answer to advance
- Game completion tracking
- Responsive virtual keyboard design

## Installation and Setup

1. Install Node.js (if not already installed)

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## How to Play

1. Look at the image displayed
2. Use the virtual keyboard to spell the correct English word
3. Click letters on the virtual keyboard to form the word
4. Use the "ESPAÇO" button for spaces and "⌫" for backspace
5. The game automatically checks your answer as you type
6. If correct, click "Próxima Palavra" to advance
7. Complete all 12 words to finish the game

## Project Structure

```
spelling-bee-game/
├── public/
│   └── index.html
├── src/
│   ├── App.js              # Main game component
│   ├── App.css             # Main styles
│   ├── VirtualKeyboard.js  # Virtual keyboard component
│   ├── VirtualKeyboard.css # Virtual keyboard styles
│   └── index.js            # Entry point
├── package.json
└── README.md
```
