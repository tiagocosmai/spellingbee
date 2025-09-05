import React, { useState, useEffect } from 'react';
import './Cards.css';
import { getAllWords } from './wordsData';
import { useLanguage } from './LanguageContext';

const Cards = () => {
  const { translate } = useLanguage();
  const cards = getAllWords();

  const [current, setCurrent] = useState(0);
  const [showingTranslation, setShowingTranslation] = useState(false);
  const [mode, setMode] = useState("treino");
  const [spellingLetters, setSpellingLetters] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isSpelling, setIsSpelling] = useState(false);

  const speakAndSpell = (word) => {
    if (!window.speechSynthesis) {
      alert('Seu navegador não suporta síntese de voz.');
      setShowingTranslation(true);
      return;
    }

    setIsSpelling(true);
    
    // Configurar utterance forçando inglês
    const utterance = new SpeechSynthesisUtterance(word);
    
    // Obter vozes e forçar inglês
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => 
      voice.lang.startsWith('en') || 
      voice.lang.includes('en-US') || 
      voice.lang.includes('en-GB')
    );
    
    if (englishVoice) {
      utterance.voice = englishVoice;
      utterance.lang = englishVoice.lang;
    } else {
      utterance.lang = 'en-US';
    }
    
    utterance.rate = 0.7;
    
    // Preparar letras para soletração
    const letters = word.replace(/\s+/g, ' ').split('');
    setSpellingLetters(letters);
    
    window.speechSynthesis.speak(utterance);

    utterance.onend = () => {
      // Iniciar soletração
      spellLetters(letters, word);
    };

    utterance.onerror = () => {
      console.error('Erro na síntese de voz');
      setShowingTranslation(true);
      setIsSpelling(false);
    };
  };

  const spellLetters = (letters, originalWord) => {
    let index = 0;

    const spellNext = () => {
      if (index < letters.length) {
        const letter = letters[index];
        setHighlightedIndex(index);
        
        if (letter.trim() !== '') {
          const letterUtterance = new SpeechSynthesisUtterance(letter);
          
          // Forçar inglês para soletração também
          const voices = window.speechSynthesis.getVoices();
          const englishVoice = voices.find(voice => 
            voice.lang.startsWith('en') || 
            voice.lang.includes('en-US') || 
            voice.lang.includes('en-GB')
          );
          
          if (englishVoice) {
            letterUtterance.voice = englishVoice;
            letterUtterance.lang = englishVoice.lang;
          } else {
            letterUtterance.lang = 'en-US';
          }
          
          letterUtterance.rate = 0.5; // Mais devagar para soletração
          
          window.speechSynthesis.speak(letterUtterance);
          
          letterUtterance.onend = () => {
            setHighlightedIndex(-1);
            index++;
            setTimeout(spellNext, 300);
          };
          
          letterUtterance.onerror = () => {
            setHighlightedIndex(-1);
            index++;
            setTimeout(spellNext, 300);
          };
        } else {
          // Espaço - apenas aguardar
          setTimeout(() => {
            setHighlightedIndex(-1);
            index++;
            spellNext();
          }, 200);
        }
      } else {
        // Soletração completa
        setTimeout(() => {
          setShowingTranslation(true);
          setIsSpelling(false);
          setSpellingLetters([]);
          setHighlightedIndex(-1);
        }, 500);
      }
    };

    spellNext();
  };

  const nextCard = () => {
    setCurrent((current + 1) % cards.length);
    setShowingTranslation(false);
    setIsSpelling(false);
    setSpellingLetters([]);
    setHighlightedIndex(-1);
  };

  const prevCard = () => {
    setCurrent((current - 1 + cards.length) % cards.length);
    setShowingTranslation(false);
    setIsSpelling(false);
    setSpellingLetters([]);
    setHighlightedIndex(-1);
  };

  const toggleMode = () => {
    const newMode = mode === "treino" ? "desafio" : "treino";
    setMode(newMode);
    const modeText = newMode === "treino" ? translate('trainMode') : translate('challengeMode');
    alert(`${translate('modeIndicator', { mode: modeText })}`);
  };

  const handleCardClick = () => {
    if (isSpelling) return; // Evitar cliques durante soletração
    
    if (!showingTranslation) {
      const currentCard = cards[current];
      speakAndSpell(currentCard.en);
    } else {
      setShowingTranslation(false);
      setSpellingLetters([]);
      setHighlightedIndex(-1);
    }
  };

  const renderCard = () => {
    const currentCard = cards[current];
    
    if (isSpelling && spellingLetters.length > 0) {
      // Mostrar soletração com destaque
      return (
        <div className="card-content spelling">
          <h2>
            {spellingLetters.map((letter, index) => (
              <span
                key={index}
                className={`letter ${index === highlightedIndex ? 'highlight' : ''}`}
              >
                {letter}
              </span>
            ))}
          </h2>
        </div>
      );
    }

    return (
      <div className="card-content">
        <h2>{showingTranslation ? currentCard.pt : currentCard.en}</h2>
      </div>
    );
  };

  // Suporte a teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          prevCard();
          break;
        case 'ArrowRight':
          nextCard();
          break;
        case ' ':
          e.preventDefault();
          handleCardClick();
          break;
        case 'Enter':
          handleCardClick();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [current, showingTranslation, isSpelling]);

  return (
    <div className="cards-container">
      <div className="cards-header">
        <h1>{translate('cardsTitle')}</h1>
        <p className="cards-subtitle">
          {translate('cardsSubtitle')}
        </p>
        <div className="cards-info">
          <span className="card-counter">{current + 1}/{cards.length}</span>
          <span className="mode-indicator">{translate('modeIndicator', { 
            mode: mode === "treino" ? translate('trainMode') : translate('challengeMode')
          })}</span>
        </div>
      </div>

      <div className="flashcard" onClick={handleCardClick}>
        <div className="card-counter-overlay">
          {current + 1}/{cards.length}
        </div>
        {renderCard()}
      </div>

      <div className="cards-controls">
        <button 
          className="cards-button prev-button" 
          onClick={prevCard}
          disabled={isSpelling}
        >
          {translate('previousButton')}
        </button>
        
        <button 
          className="cards-button mode-button" 
          onClick={toggleMode}
          disabled={isSpelling}
        >
          {mode === "treino" ? translate('trainModeButton') : translate('challengeModeButton')}
        </button>
        
        <button 
          className="cards-button next-button" 
          onClick={nextCard}
          disabled={isSpelling}
        >
          {translate('nextButton')}
        </button>
      </div>

      <div className="cards-instructions">
        <p><strong>{translate('instructionsTitle')}</strong></p>
        <ul>
          {translate('instructionsList').map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cards;
