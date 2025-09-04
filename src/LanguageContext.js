import React, { createContext, useContext, useState } from 'react';

// Traduções
const translations = {
  en: {
    // Header
    appTitle: "English Learning Hub",
    gameTab: "🎮 Spelling Bee Game",
    cardsTab: "📚 Flashcards",
    
    // Game
    gameTitle: "Spelling Bee Game",
    gameInstruction: "Look at the image and spell the word.",
    typeHint: "Click the letters to form the word...",
    correctMessage: "Correct! Press 'Next Word' to continue.",
    incorrectMessage: "Incorrect. The word was: \"{word}\". Try again.",
    skipMessage: "⏭️ Word skipped! The correct answer was: \"{word}\".",
    gameEndMessage: "Game Over! Results: ✅ {correct} correct | ❌ {incorrect} incorrect | 📊 {total} total words.",
    nextWordButton: "Next Word / Skip",
    restartButton: "🔄 Restart",
    playAgainButton: "🔄 Play Again",
    randomModeButton: "🔀 Random Mode",
    sequentialModeButton: "📋 Sequential Mode",
    scoreLabel: "Score: ",
    
    // Cards
    cardsTitle: "Interactive Flashcards",
    cardsSubtitle: "Click on the card to hear the pronunciation, spelling and then see the translation.",
    previousButton: "← Previous",
    nextButton: "Next →",
    trainModeButton: "🎯 Challenge Mode",
    challengeModeButton: "📚 Train Mode",
    modeIndicator: "Mode: {mode}",
    trainMode: "TRAIN",
    challengeMode: "CHALLENGE",
    
    // Instructions
    instructionsTitle: "Instructions:",
    instructionsList: [
      "Use ← → arrow keys to navigate",
      "Press SPACE or ENTER to activate card",
      "Wait for complete spelling before interacting"
    ],
    
    // Language
    languageButton: "🇧🇷 Português"
  },
  pt: {
    // Header
    appTitle: "Hub de Aprendizado de Inglês",
    gameTab: "🎮 Jogo Spelling Bee",
    cardsTab: "📚 Flashcards",
    
    // Game
    gameTitle: "Jogo Spelling Bee",
    gameInstruction: "Veja a imagem e soletre a palavra.",
    typeHint: "Clique nas letras para formar a palavra...",
    correctMessage: "Correto! Pressione 'Próxima Palavra' para continuar.",
    incorrectMessage: "Incorreto. A palavra era: \"{word}\". Tente novamente.",
    skipMessage: "⏭️ Palavra pulada! A resposta correta era: \"{word}\".",
    gameEndMessage: "Fim do jogo! Resultado: ✅ {correct} corretas | ❌ {incorrect} incorretas | 📊 {total} palavras totais.",
    nextWordButton: "Próxima Palavra / Pular",
    restartButton: "🔄 Reiniciar",
    playAgainButton: "🔄 Jogar Novamente",
    randomModeButton: "🔀 Modo Aleatório",
    sequentialModeButton: "📋 Modo Sequencial",
    scoreLabel: "Acertos: ",
    
    // Cards
    cardsTitle: "Flashcards Interativos",
    cardsSubtitle: "Clique no card para ouvir a pronúncia, a soletração e depois ver a tradução.",
    previousButton: "← Anterior",
    nextButton: "Próximo →",
    trainModeButton: "🎯 Modo Desafio",
    challengeModeButton: "📚 Modo Treino",
    modeIndicator: "Modo: {mode}",
    trainMode: "TREINO",
    challengeMode: "DESAFIO",
    
    // Instructions
    instructionsTitle: "Instruções:",
    instructionsList: [
      "Use as setas ← → do teclado para navegar",
      "Pressione ESPAÇO ou ENTER para ativar o card",
      "Aguarde a soletração completa antes de interagir"
    ],
    
    // Language
    languageButton: "🇺🇸 English"
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('pt'); // Português como padrão
  
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'pt' : 'en');
  };
  
  const translate = (key, variables = {}) => {
    let text = translations[language][key] || key;
    
    // Substituir variáveis no texto
    Object.keys(variables).forEach(variable => {
      text = text.replace(`{${variable}}`, variables[variable]);
    });
    
    return text;
  };
  
  const value = {
    language,
    setLanguage,
    toggleLanguage,
    translate,
    isEnglish: language === 'en',
    isPortuguese: language === 'pt'
  };
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
