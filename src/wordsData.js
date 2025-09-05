// Dados compartilhados entre Game e Cards
// Todas as palavras dos flashcards com imagens locais

const wordsData = [
  // Unidade 1 - Aparência física
  { en: "Portrait", pt: "Retrato", image: "/images/portrait.svg", category: "appearance" },
  { en: "Self-portrait", pt: "Autorretrato", image: "/images/self-portrait.svg", category: "appearance" },
  { en: "DNA", pt: "DNA", image: "/images/dna.svg", category: "appearance" },
  { en: "Blue eyes", pt: "Olhos azuis", image: "/images/blue-eyes.svg", category: "appearance" },
  { en: "Moustache", pt: "Bigode", image: "/images/moustache.svg", category: "appearance" },
  { en: "Curly hair", pt: "Cabelo cacheado", image: "/images/curly-hair.svg", category: "appearance" },
  { en: "Thin", pt: "Magro", image: "/images/thin.svg", category: "appearance" },
  { en: "Green eyes", pt: "Olhos verdes", image: "/images/green-eyes.svg", category: "appearance" },
  { en: "Blond hair", pt: "Cabelo loiro", image: "/images/blond-hair.svg", category: "appearance" },
  { en: "Fat", pt: "Gordo", image: "/images/fat.svg", category: "appearance" },
  { en: "Beard", pt: "Barba", image: "/images/beard.svg", category: "appearance" },
  { en: "Straight hair", pt: "Cabelo liso", image: "/images/straight-hair.svg", category: "appearance" },
  { en: "Grey hair", pt: "Cabelo grisalho", image: "/images/grey-hair.svg", category: "appearance" },
  { en: "Long hair", pt: "Cabelo comprido", image: "/images/long-hair.svg", category: "appearance" },
  { en: "Short hair", pt: "Cabelo curto", image: "/images/short-hair.svg", category: "appearance" },
  { en: "Tall", pt: "Alto", image: "/images/tall.svg", category: "appearance" },
  { en: "Short", pt: "Baixo", image: "/images/short.svg", category: "appearance" },
  { en: "Brown eyes", pt: "Olhos castanhos", image: "/images/brown-eyes.svg", category: "appearance" },
  { en: "Brown hair", pt: "Cabelo castanho", image: "/images/brown-hair.svg", category: "appearance" },
  { en: "Young", pt: "Jovem", image: "/images/young.svg", category: "appearance" },
  { en: "Old", pt: "Velho", image: "/images/old.svg", category: "appearance" },
  { en: "Weak", pt: "Fraco", image: "/images/weak.svg", category: "appearance" },
  { en: "Strong", pt: "Forte", image: "/images/strong.svg", category: "appearance" },
  { en: "Beautiful", pt: "Bonito(a)", image: "/images/beautiful.svg", category: "appearance" },
  { en: "Ugly", pt: "Feio(a)", image: "/images/ugly.svg", category: "appearance" },

  // Unidade 2 - Casa e objetos
  { en: "Upstairs", pt: "Andar de cima", image: "/images/upstairs.svg", category: "house" },
  { en: "Downstairs", pt: "Andar de baixo", image: "/images/downstairs.svg", category: "house" },
  { en: "Basement", pt: "Porão", image: "/images/basement.svg", category: "house" },
  { en: "Floor", pt: "Piso/andar", image: "/images/floor.svg", category: "house" },
  { en: "Lift", pt: "Elevador", image: "/images/lift.svg", category: "house" },
  { en: "Internet", pt: "Internet", image: "/images/internet.svg", category: "house" },
  { en: "Fan", pt: "Ventilador", image: "/images/fan.svg", category: "house" },
  { en: "Shower", pt: "Chuveiro", image: "/images/shower.svg", category: "house" },
  { en: "Stairs", pt: "Escadas", image: "/images/stairs.svg", category: "house" },
  { en: "Broom", pt: "Vassoura", image: "/images/broom.svg", category: "house" },
  { en: "Board games", pt: "Jogos de tabuleiro", image: "/images/board-games.svg", category: "house" },
  { en: "Tall apartment building", pt: "Prédio alto", image: "/images/tall-apartment-building.svg", category: "house" },
  { en: "Water", pt: "Água", image: "/images/water.svg", category: "house" },
  { en: "Plants", pt: "Plantas", image: "/images/plants.svg", category: "house" },
  { en: "Animals", pt: "Animais", image: "/images/animals.svg", category: "house" },

  // Unidade 3 - Tempo e arte
  { en: "Day", pt: "Dia", image: "/images/day.svg", category: "time" },
  { en: "Night", pt: "Noite", image: "/images/night.svg", category: "time" },
  { en: "Aging", pt: "Envelhecimento", image: "/images/aging.svg", category: "time" },
  { en: "Schedule", pt: "Agenda", image: "/images/schedule.svg", category: "time" },
  { en: "Sandglass", pt: "Ampulheta", image: "/images/sandglass.svg", category: "time" },
  { en: "Birthday", pt: "Aniversário", image: "/images/birthday.svg", category: "time" },
  { en: "Pottery", pt: "Cerâmica", image: "/images/pottery.svg", category: "time" },
  { en: "Architecture", pt: "Arquitetura", image: "/images/architecture.svg", category: "time" },
  { en: "Sculpture", pt: "Escultura", image: "/images/sculpture.svg", category: "time" },
  { en: "Maths", pt: "Matemática", image: "/images/maths.svg", category: "time" },
  { en: "Sport", pt: "Esporte", image: "/images/sport.svg", category: "time" },

  // Unidade 4 - Comida e ações
  { en: "Picnic", pt: "Piquenique", image: "/images/picnic.svg", category: "food" },
  { en: "Cheese", pt: "Queijo", image: "/images/cheese.svg", category: "food" },
  { en: "Glass", pt: "Copo", image: "/images/glass.svg", category: "food" },
  { en: "Lemonade", pt: "Limonada", image: "/images/lemonade.svg", category: "food" },
  { en: "Butter", pt: "Manteiga", image: "/images/butter.svg", category: "food" },
  { en: "Spoon", pt: "Colher", image: "/images/spoon.svg", category: "food" },
  { en: "Sandwich", pt: "Sanduíche", image: "/images/sandwich.svg", category: "food" },
  { en: "Plate", pt: "Prato", image: "/images/plate.svg", category: "food" },
  { en: "Fork", pt: "Garfo", image: "/images/fork.svg", category: "food" },
  { en: "Salad", pt: "Salada", image: "/images/salad.svg", category: "food" },
  { en: "Bowl", pt: "Tigela", image: "/images/bowl.svg", category: "food" },
  { en: "Knife", pt: "Faca", image: "/images/knife.svg", category: "food" },
  { en: "Dance", pt: "Dançar", image: "/images/dance.svg", category: "food" },
  { en: "Monday", pt: "Segunda-feira", image: "/images/monday.svg", category: "food" },
  { en: "Wednesday", pt: "Quarta-feira", image: "/images/wednesday.svg", category: "food" },
  { en: "Read", pt: "Ler", image: "/images/read.svg", category: "food" },
  { en: "Roast", pt: "Assar", image: "/images/roast.svg", category: "food" },
  { en: "Heat", pt: "Aquecer", image: "/images/heat.svg", category: "food" },
  { en: "Grind", pt: "Moer", image: "/images/grind.svg", category: "food" },
  { en: "Brew", pt: "Fermentar/Preparar", image: "/images/brew.svg", category: "food" },
  { en: "Age", pt: "Envelhecer", image: "/images/age.svg", category: "food" }
];

// Função para gerar imagem placeholder baseada na palavra
export const generatePlaceholderImage = (word, width = 400, height = 300) => {
  // Cria um canvas para gerar uma imagem placeholder
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Gradient de fundo baseado na categoria
  const gradients = {
    appearance: ['#667eea', '#764ba2'],
    house: ['#f093fb', '#f5576c'],
    time: ['#4facfe', '#00f2fe'],
    food: ['#43e97b', '#38f9d7']
  };
  
  // Emojis por categoria
  const categoryEmojis = {
    appearance: ['👤', '👁️', '💇', '🧔', '👶', '👴'],
    house: ['🏠', '🪜', '🚿', '🌟', '🎲', '🪴'],
    time: ['⏰', '🌅', '🌙', '📅', '⏳', '🎂'],
    food: ['🍽️', '🥪', '🧀', '🥗', '🍴', '📚']
  };
  
  const wordData = wordsData.find(w => w.en.toLowerCase() === word.toLowerCase());
  const colors = wordData ? gradients[wordData.category] || ['#667eea', '#764ba2'] : ['#667eea', '#764ba2'];
  const emojis = wordData ? categoryEmojis[wordData.category] || ['🖼️'] : ['🖼️'];
  
  // Gradient de fundo
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Adiciona padrão decorativo
  ctx.globalAlpha = 0.1;
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.arc(
      Math.random() * width, 
      Math.random() * height, 
      Math.random() * 30 + 10, 
      0, 
      2 * Math.PI
    );
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  
  // Emoji da categoria
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  ctx.font = '48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(randomEmoji, width/2, height/2 - 40);
  
  // Adiciona o texto da palavra
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 28px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  
  // Quebra texto em múltiplas linhas se necessário
  const words = word.split(' ');
  if (words.length > 1) {
    const lineHeight = 35;
    words.forEach((w, index) => {
      ctx.fillText(w, width/2, (height/2 + 50) + (index - (words.length-1)/2) * lineHeight);
    });
  } else {
    ctx.fillText(word.toUpperCase(), width/2, height/2 + 50);
  }
  
  // Adiciona borda decorativa
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, width-20, height-20);
  
  return canvas.toDataURL('image/png');
};

// Função para obter dados de uma palavra
export const getWordData = (englishWord) => {
  return wordsData.find(word => 
    word.en.toLowerCase() === englishWord.toLowerCase()
  );
};

// Função para obter todas as palavras
export const getAllWords = () => wordsData;

// Função para obter palavras por categoria
export const getWordsByCategory = (category) => {
  return wordsData.filter(word => word.category === category);
};

// Função para embaralhar array
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default wordsData;
