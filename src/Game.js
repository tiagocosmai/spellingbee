import React, { useState, useEffect } from 'react';
import VirtualKeyboard from './VirtualKeyboard';
import WordImage from './WordImage';
import { getAllWords, shuffleArray } from './wordsData';
import { useLanguage } from './LanguageContext';

const Game = () => {
  const { translate } = useLanguage();
  
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
      setResultMessage(translate('correctMessage'));
      setMessageColor('green');
      setKeyboardDisabled(true);
      setNextButtonDisabled(false);
      setCorrectAnswers(prev => prev + 1);
    } else if (userGuess.length >= correctWord.length) {
      setResultMessage(translate('incorrectMessage', { word: correctWord }));
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
    if (resultMessage.includes(translate('correctMessage').split('!')[0])) {
      const nextIndex = currentWordIndex + 1;
      
      if (nextIndex >= words.length) {
        setGameEnded(true);
        setResultMessage(translate('gameEndMessage', { 
          correct: correctAnswers + 1, 
          total: totalWords 
        }));
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
      setResultMessage(translate('needCorrectMessage'));
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
{translate('playAgainButton')}
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
        <span className="score">{translate('scoreLabel')}{correctAnswers}</span>
      </div>
      
      <div className="game-controls">
        <button 
          className={`control-button mode-button ${isRandomMode ? 'active' : ''}`}
          onClick={toggleRandomMode}
        >
{isRandomMode ? translate('randomModeButton') : translate('sequentialModeButton')}
        </button>
        <button 
          className="control-button restart-button"
          onClick={restartGame}
        >
{translate('restartButton')}
        </button>
      </div>
      
      <p className="instruction">{translate('gameInstruction')}</p>
      
      <WordImage
        word={currentWord.word}
        image={currentWord.image}
        alt={`Imagem da palavra ${currentWord.word}`}
        id="word-image"
      />
      
      <div className="input-display">
        <div className="typed-word">
{userInput || translate('typeHint')}
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
{translate('nextWordButton')}
      </button>
    </div>
  );
};

export default Game;
