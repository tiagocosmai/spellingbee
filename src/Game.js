import React, { useState, useEffect } from 'react';
import VirtualKeyboard from './VirtualKeyboard';
import WordImage from './WordImage';
import { getAllWords, shuffleArray } from './wordsData';

const Game = () => {
  const originalWords = getAllWords().map(word => ({
    word: word.en.toLowerCase(),
    image: word.image,
    translation: word.pt,
    category: word.category
  }));

  const [words, setWords] = useState(originalWords);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [keyboardDisabled, setKeyboardDisabled] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [gameEnded, setGameEnded] = useState(false);
  const [isRandomMode, setIsRandomMode] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalWords] = useState(originalWords.length);

  // Função shuffleArray importada de wordsData

  const checkWord = (inputText) => {
    const userGuess = inputText.trim().toLowerCase();
    const correctWord = words[currentWordIndex].word.toLowerCase();

    if (userGuess === correctWord) {
      setResultMessage('Correto! Pressione "Próxima Palavra" para continuar.');
      setMessageColor('green');
      setKeyboardDisabled(true);
      setNextButtonDisabled(false);
      setCorrectAnswers(prev => prev + 1);
    } else if (userGuess.length >= correctWord.length) {
      setResultMessage(`Incorreto. A palavra era: "${correctWord}". Tente novamente.`);
      setMessageColor('red');
      setKeyboardDisabled(false);
      setNextButtonDisabled(true);
    }
  };

  const handleKeyPress = (key) => {
    const newInput = userInput + key.toLowerCase();
    setUserInput(newInput);
    checkWord(newInput);
  };

  const handleBackspace = () => {
    const newInput = userInput.slice(0, -1);
    setUserInput(newInput);
    if (newInput.length === 0) {
      setResultMessage('');
      setMessageColor('');
      setNextButtonDisabled(true);
    } else {
      checkWord(newInput);
    }
  };

  const handleSpace = () => {
    const newInput = userInput + ' ';
    setUserInput(newInput);
    checkWord(newInput);
  };

  const handleNextWord = () => {
    if (resultMessage.includes('Correto!')) {
      const nextIndex = currentWordIndex + 1;
      
      if (nextIndex >= words.length) {
        setGameEnded(true);
        setResultMessage(`Fim do jogo! Parabéns! Você acertou ${correctAnswers + 1} de ${totalWords} palavras.`);
        setMessageColor('blue');
        return;
      }

      setCurrentWordIndex(nextIndex);
      setUserInput('');
      setResultMessage('');
      setMessageColor('');
      setKeyboardDisabled(false);
      setNextButtonDisabled(true);
    } else {
      setResultMessage('Você precisa acertar a palavra antes de avançar.');
      setMessageColor('orange');
    }
  };

  const toggleRandomMode = () => {
    const newRandomMode = !isRandomMode;
    setIsRandomMode(newRandomMode);
    
    if (newRandomMode) {
      setWords(shuffleArray(originalWords));
    } else {
      setWords(originalWords);
    }
    
    // Reiniciar jogo
    setCurrentWordIndex(0);
    setUserInput('');
    setResultMessage('');
    setMessageColor('');
    setKeyboardDisabled(false);
    setNextButtonDisabled(true);
    setGameEnded(false);
    setCorrectAnswers(0);
  };

  const restartGame = () => {
    if (isRandomMode) {
      setWords(shuffleArray(originalWords));
    } else {
      setWords(originalWords);
    }
    
    setCurrentWordIndex(0);
    setUserInput('');
    setResultMessage('');
    setMessageColor('');
    setKeyboardDisabled(false);
    setNextButtonDisabled(true);
    setGameEnded(false);
    setCorrectAnswers(0);
  };

  if (gameEnded) {
    return (
      <div className="game-content">
        <p className="result-message" style={{ color: messageColor }}>
          {resultMessage}
        </p>
        <div className="game-controls">
          <button 
            className="control-button restart-button"
            onClick={restartGame}
          >
            🔄 Jogar Novamente
          </button>
        </div>
      </div>
    );
  }

  const currentWord = words[currentWordIndex];

  return (
    <div className="game-content">
      <div className="game-info">
        <span className="word-counter">{currentWordIndex + 1}/{totalWords}</span>
        <span className="score">Acertos: {correctAnswers}</span>
      </div>
      
      <div className="game-controls">
        <button 
          className={`control-button mode-button ${isRandomMode ? 'active' : ''}`}
          onClick={toggleRandomMode}
        >
          {isRandomMode ? '🔀 Modo Aleatório' : '📋 Modo Sequencial'}
        </button>
        <button 
          className="control-button restart-button"
          onClick={restartGame}
        >
          🔄 Reiniciar
        </button>
      </div>
      
      <p className="instruction">Veja a imagem e soletre a palavra.</p>
      
      <WordImage
        word={currentWord.word}
        image={currentWord.image}
        alt={`Imagem da palavra ${currentWord.word}`}
        id="word-image"
      />
      
      <div className="input-display">
        <div className="typed-word">
          {userInput || 'Clique nas letras para formar a palavra...'}
        </div>
      </div>
      
      <VirtualKeyboard
        onKeyPress={handleKeyPress}
        onBackspace={handleBackspace}
        onSpace={handleSpace}
        disabled={keyboardDisabled}
      />
      
      <p 
        id="result-message" 
        className="result-message"
        style={{ color: messageColor }}
      >
        {resultMessage}
      </p>
      
      <button 
        id="next-button"
        onClick={handleNextWord}
        disabled={nextButtonDisabled}
      >
        Próxima Palavra
      </button>
    </div>
  );
};

export default Game;
