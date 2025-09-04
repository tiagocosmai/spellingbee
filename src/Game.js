import React, { useState, useEffect } from 'react';
import VirtualKeyboard from './VirtualKeyboard';

const Game = () => {
  const originalWords = [
    { word: 'beautiful', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrtoxfsrsyji5_ejfxwnBSnv6TCq6H6yGI7_upB_XyCGQ7vOTwwKUEed6Hu3Ip_6AOCwY&usqp=CAU' },
    { word: 'curly hair', image: 'https://i.pinimg.com/736x/3a/99/bf/3a99bf7e2c392566347554d0f0f5df17.jpg' },
    { word: 'moustache', image: 'https://media.istockphoto.com/id/1133779957/pt/vetorial/mustache-icon-vector-moustache-vintage-shape-symbol.jpg?s=612x612&w=0&k=20&c=lKbN1F-VfKGSw0HbyyDE-hkw0c_EU3d4fz8dCxJwS-4=' },
    { word: 'stairs', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJqMvzAAtOyFhpkOX9UbPX27bUrJ6jKWu2jw&s' },
    { word: 'fan', image: 'https://img.freepik.com/vetores-premium/ilustracao-do-vetor-de-fa-ventilador-azul-dos-desenhos-animados-desenho-de-mao-de-fa-isolado_648083-319.jpg' },
    { word: 'board games', image: 'https://img.freepik.com/vetores-gratis/elementos-de-jogos-de-tabuleiro-desenhados-a-mao_23-2151071907.jpg?semt=ais_incoming&w=740&q=80' },
    { word: 'sandglass', image: 'https://cdn-icons-png.flaticon.com/512/4871/4871214.png' },
    { word: 'pottery', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVq0I0xywHgBQzbtXYQPjOtiIZ5G1VR290Tgiv2i7IZRMtoDmiEIof3ZBusy6KDKafnvo&usqp=CAU' },
    { word: 'sculpture', image: 'https://st2.depositphotos.com/5891300/46682/v/450/depositphotos_466827022-stock-illustration-aphrodite-ancient-statue-color-sketch.jpg' },
    { word: 'picnic', image: 'https://static.vecteezy.com/ti/vetor-gratis/p1/16883431-criancas-bonitinhas-fazem-piquenique-juntos-ilustracaoial-de-desenho-animado-vetor.jpg' },
    { word: 'sandwich', image: 'https://i.pinimg.com/736x/3d/8b/8f/3d8b8f210621c6073f1e07e54a985036.jpg' },
    { word: 'fork', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD5bH6LyMkNj8R9M4RyyhLPMOOf28zFh89LQ&s' }
  ];

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

  // Função para embaralhar array
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

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
      
      <img 
        id="word-image" 
        src={currentWord.image} 
        alt="Imagem da palavra"
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
