import React, { useState, useEffect } from 'react';
import './Cards.css';

const Cards = () => {
  const cards = [
    // Unidade 1
    {en: "Portrait", pt: "Retrato"}, {en: "Self-portrait", pt: "Autorretrato"}, {en: "DNA", pt: "DNA"},
    {en: "Blue eyes", pt: "Olhos azuis"}, {en: "Moustache", pt: "Bigode"}, {en: "Curly hair", pt: "Cabelo cacheado"},
    {en: "Thin", pt: "Magro"}, {en: "Green eyes", pt: "Olhos verdes"}, {en: "Blond hair / Fair hair", pt: "Cabelo loiro"},
    {en: "Fat", pt: "Gordo"}, {en: "Beard", pt: "Barba"}, {en: "Straight hair", pt: "Cabelo liso"},
    {en: "Grey hair", pt: "Cabelo grisalho"}, {en: "Long hair", pt: "Cabelo comprido"}, {en: "Short hair", pt: "Cabelo curto"},
    {en: "Tall", pt: "Alto"}, {en: "Short", pt: "Baixo"}, {en: "Brown eyes", pt: "Olhos castanhos"},
    {en: "Brown hair", pt: "Cabelo castanho"}, {en: "Young", pt: "Jovem"}, {en: "Old", pt: "Velho"},
    {en: "Weak", pt: "Fraco"}, {en: "Strong", pt: "Forte"}, {en: "Beautiful", pt: "Bonito(a)"}, {en: "Ugly", pt: "Feio(a)"},

    // Unidade 2
    {en: "Upstairs", pt: "Andar de cima"}, {en: "Downstairs", pt: "Andar de baixo"}, {en: "Basement", pt: "Porão"},
    {en: "Floor", pt: "Piso/andar"}, {en: "Lift", pt: "Elevador"}, {en: "Internet", pt: "Internet"},
    {en: "Fan", pt: "Ventilador"}, {en: "Shower", pt: "Chuveiro"}, {en: "Stairs", pt: "Escadas"},
    {en: "Broom", pt: "Vassoura"}, {en: "Board games", pt: "Jogos de tabuleiro"}, {en: "Tall apartment building", pt: "Prédio alto"},
    {en: "Oxygen", pt: "Oxigênio"}, {en: "Water", pt: "Água"}, {en: "Gravity", pt: "Gravidade"},
    {en: "Plants", pt: "Plantas"}, {en: "Animals", pt: "Animais"},

    // Unidade 3
    {en: "Day", pt: "Dia"}, {en: "Night", pt: "Noite"}, {en: "Aging", pt: "Envelhecimento"}, {en: "Schedule", pt: "Agenda"},
    {en: "Sandglass / Hourglass", pt: "Ampulheta"}, {en: "Four seasons", pt: "Quatro estações"}, {en: "Birthday", pt: "Aniversário"},
    {en: "Pottery", pt: "Cerâmica"}, {en: "Architecture", pt: "Arquitetura"}, {en: "Sculpture", pt: "Escultura"},
    {en: "Maths", pt: "Matemática"}, {en: "Sport (Olympia)", pt: "Esporte (Olimpíadas)"},

    // Unidade 4
    {en: "Picnic", pt: "Piquenique"}, {en: "Cheese", pt: "Queijo"}, {en: "Glass", pt: "Copo"}, {en: "Lemonade", pt: "Limonada"},
    {en: "Butter", pt: "Manteiga"}, {en: "Spoon", pt: "Colher"}, {en: "Sandwich", pt: "Sanduíche"},
    {en: "Plate", pt: "Prato"}, {en: "Fork", pt: "Garfo"}, {en: "Salad", pt: "Salada"},
    {en: "Bowl", pt: "Tigela"}, {en: "Knife", pt: "Faca"}, {en: "Dance", pt: "Dançar"},
    {en: "Monday", pt: "Segunda-feira"}, {en: "Wednesday", pt: "Quarta-feira"}, {en: "Read", pt: "Ler"},
    {en: "Roast", pt: "Assar"}, {en: "Heat", pt: "Aquecer"}, {en: "Grind", pt: "Moer"}, {en: "Brew", pt: "Fermentar/Preparar"}, {en: "Age", pt: "Envelhecer"}
  ];

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
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    
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
          letterUtterance.lang = 'en-US';
          letterUtterance.rate = 0.6;
          
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
    alert(`Modo: ${newMode.toUpperCase()}`);
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
        <h1>Flashcards Interativos</h1>
        <p className="cards-subtitle">
          Clique no card para ouvir a pronúncia, a soletração e depois ver a tradução.
        </p>
        <div className="cards-info">
          <span className="card-counter">{current + 1}/{cards.length}</span>
          <span className="mode-indicator">Modo: {mode.toUpperCase()}</span>
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
          ← Anterior
        </button>
        
        <button 
          className="cards-button mode-button" 
          onClick={toggleMode}
          disabled={isSpelling}
        >
          {mode === "treino" ? "🎯 Modo Desafio" : "📚 Modo Treino"}
        </button>
        
        <button 
          className="cards-button next-button" 
          onClick={nextCard}
          disabled={isSpelling}
        >
          Próximo →
        </button>
      </div>

      <div className="cards-instructions">
        <p><strong>Instruções:</strong></p>
        <ul>
          <li>Use as setas ← → do teclado para navegar</li>
          <li>Pressione ESPAÇO ou ENTER para ativar o card</li>
          <li>Aguarde a soletração completa antes de interagir</li>
        </ul>
      </div>
    </div>
  );
};

export default Cards;
