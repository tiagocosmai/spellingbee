// Utilitário para garantir pronúncia sempre em inglês

/**
 * Configura utterance para sempre usar inglês, independente do idioma do navegador
 */
export const createEnglishUtterance = (text, options = {}) => {
  if (!window.speechSynthesis) {
    throw new Error('Speech synthesis not supported');
  }

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Configurações padrão
  const defaultOptions = {
    rate: 0.7,
    volume: 1,
    pitch: 1
  };
  
  const config = { ...defaultOptions, ...options };
  
  // Aplicar configurações
  utterance.rate = config.rate;
  utterance.volume = config.volume;
  utterance.pitch = config.pitch;
  
  // Forçar inglês - tentar múltiplas estratégias
  const englishLocales = ['en-US', 'en-GB', 'en-AU', 'en-CA', 'en'];
  
  // Aguardar vozes carregarem (necessário em alguns navegadores)
  const setEnglishVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    
    if (voices.length === 0) {
      // Vozes ainda não carregaram, usar fallback
      utterance.lang = 'en-US';
      return utterance;
    }
    
    // Procurar voz em inglês por prioridade
    let englishVoice = null;
    
    // Primeiro: tentar encontrar voz nativa do sistema
    for (const locale of englishLocales) {
      englishVoice = voices.find(voice => 
        voice.lang === locale && 
        (voice.localService || voice.default)
      );
      if (englishVoice) break;
    }
    
    // Segundo: qualquer voz em inglês
    if (!englishVoice) {
      englishVoice = voices.find(voice => 
        voice.lang.startsWith('en') || 
        voice.lang.toLowerCase().includes('english')
      );
    }
    
    // Aplicar voz se encontrada
    if (englishVoice) {
      utterance.voice = englishVoice;
      utterance.lang = englishVoice.lang;
      console.log(`Using English voice: ${englishVoice.name} (${englishVoice.lang})`);
    } else {
      // Fallback final
      utterance.lang = 'en-US';
      console.warn('No English voice found, using fallback en-US');
    }
    
    return utterance;
  };
  
  return setEnglishVoice();
};

/**
 * Garantir que as vozes estão carregadas antes de usar
 */
export const ensureVoicesLoaded = () => {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    
    if (voices.length > 0) {
      resolve(voices);
      return;
    }
    
    // Aguardar evento de vozes carregadas
    const handleVoicesChanged = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      resolve(window.speechSynthesis.getVoices());
    };
    
    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    
    // Timeout de segurança
    setTimeout(() => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      resolve(window.speechSynthesis.getVoices());
    }, 2000);
  });
};

/**
 * Falar palavra com pronúncia forçada em inglês
 */
export const speakEnglishWord = async (word, options = {}) => {
  try {
    await ensureVoicesLoaded();
    const utterance = createEnglishUtterance(word, options);
    
    return new Promise((resolve, reject) => {
      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event);
      
      window.speechSynthesis.speak(utterance);
    });
  } catch (error) {
    console.error('Error speaking English word:', error);
    throw error;
  }
};

export default {
  createEnglishUtterance,
  ensureVoicesLoaded,
  speakEnglishWord
};
