const fs = require('fs');
const path = require('path');

// Dados das palavras (copiado do wordsData.js)
const wordsData = [
  // Unidade 1 - Aparência física
  { en: "Portrait", pt: "Retrato", category: "appearance" },
  { en: "Self-portrait", pt: "Autorretrato", category: "appearance" },
  { en: "DNA", pt: "DNA", category: "appearance" },
  { en: "Blue eyes", pt: "Olhos azuis", category: "appearance" },
  { en: "Moustache", pt: "Bigode", category: "appearance" },
  { en: "Curly hair", pt: "Cabelo cacheado", category: "appearance" },
  { en: "Thin", pt: "Magro", category: "appearance" },
  { en: "Green eyes", pt: "Olhos verdes", category: "appearance" },
  { en: "Blond hair", pt: "Cabelo loiro", category: "appearance" },
  { en: "Fat", pt: "Gordo", category: "appearance" },
  { en: "Beard", pt: "Barba", category: "appearance" },
  { en: "Straight hair", pt: "Cabelo liso", category: "appearance" },
  { en: "Grey hair", pt: "Cabelo grisalho", category: "appearance" },
  { en: "Long hair", pt: "Cabelo comprido", category: "appearance" },
  { en: "Short hair", pt: "Cabelo curto", category: "appearance" },
  { en: "Tall", pt: "Alto", category: "appearance" },
  { en: "Short", pt: "Baixo", category: "appearance" },
  { en: "Brown eyes", pt: "Olhos castanhos", category: "appearance" },
  { en: "Brown hair", pt: "Cabelo castanho", category: "appearance" },
  { en: "Young", pt: "Jovem", category: "appearance" },
  { en: "Old", pt: "Velho", category: "appearance" },
  { en: "Weak", pt: "Fraco", category: "appearance" },
  { en: "Strong", pt: "Forte", category: "appearance" },
  { en: "Beautiful", pt: "Bonito(a)", category: "appearance" },
  { en: "Ugly", pt: "Feio(a)", category: "appearance" },

  // Unidade 2 - Casa e objetos
  { en: "Upstairs", pt: "Andar de cima", category: "house" },
  { en: "Downstairs", pt: "Andar de baixo", category: "house" },
  { en: "Basement", pt: "Porão", category: "house" },
  { en: "Floor", pt: "Piso/andar", category: "house" },
  { en: "Lift", pt: "Elevador", category: "house" },
  { en: "Internet", pt: "Internet", category: "house" },
  { en: "Fan", pt: "Ventilador", category: "house" },
  { en: "Shower", pt: "Chuveiro", category: "house" },
  { en: "Stairs", pt: "Escadas", category: "house" },
  { en: "Broom", pt: "Vassoura", category: "house" },
  { en: "Board games", pt: "Jogos de tabuleiro", category: "house" },
  { en: "Tall apartment building", pt: "Prédio alto", category: "house" },
  { en: "Oxygen", pt: "Oxigênio", category: "house" },
  { en: "Water", pt: "Água", category: "house" },
  { en: "Gravity", pt: "Gravidade", category: "house" },
  { en: "Plants", pt: "Plantas", category: "house" },
  { en: "Animals", pt: "Animais", category: "house" },

  // Unidade 3 - Tempo e arte
  { en: "Day", pt: "Dia", category: "time" },
  { en: "Night", pt: "Noite", category: "time" },
  { en: "Aging", pt: "Envelhecimento", category: "time" },
  { en: "Schedule", pt: "Agenda", category: "time" },
  { en: "Sandglass", pt: "Ampulheta", category: "time" },
  { en: "Four seasons", pt: "Quatro estações", category: "time" },
  { en: "Birthday", pt: "Aniversário", category: "time" },
  { en: "Pottery", pt: "Cerâmica", category: "time" },
  { en: "Architecture", pt: "Arquitetura", category: "time" },
  { en: "Sculpture", pt: "Escultura", category: "time" },
  { en: "Maths", pt: "Matemática", category: "time" },
  { en: "Sport", pt: "Esporte", category: "time" },

  // Unidade 4 - Comida e ações
  { en: "Picnic", pt: "Piquenique", category: "food" },
  { en: "Cheese", pt: "Queijo", category: "food" },
  { en: "Glass", pt: "Copo", category: "food" },
  { en: "Lemonade", pt: "Limonada", category: "food" },
  { en: "Butter", pt: "Manteiga", category: "food" },
  { en: "Spoon", pt: "Colher", category: "food" },
  { en: "Sandwich", pt: "Sanduíche", category: "food" },
  { en: "Plate", pt: "Prato", category: "food" },
  { en: "Fork", pt: "Garfo", category: "food" },
  { en: "Salad", pt: "Salada", category: "food" },
  { en: "Bowl", pt: "Tigela", category: "food" },
  { en: "Knife", pt: "Faca", category: "food" },
  { en: "Dance", pt: "Dançar", category: "food" },
  { en: "Monday", pt: "Segunda-feira", category: "food" },
  { en: "Wednesday", pt: "Quarta-feira", category: "food" },
  { en: "Read", pt: "Ler", category: "food" },
  { en: "Roast", pt: "Assar", category: "food" },
  { en: "Heat", pt: "Aquecer", category: "food" },
  { en: "Grind", pt: "Moer", category: "food" },
  { en: "Brew", pt: "Fermentar/Preparar", category: "food" },
  { en: "Age", pt: "Envelhecer", category: "food" }
];

// Configurações de cores por categoria
const gradients = {
  appearance: ['#667eea', '#764ba2'],
  house: ['#f093fb', '#f5576c'],
  time: ['#4facfe', '#00f2fe'],
  food: ['#43e97b', '#38f9d7']
};

// Emojis específicos por palavra (melhorados para representar significados reais)
const specificEmojis = {
  // Aparência
  'portrait': '🖼️', 'self-portrait': '🤳', 'dna': '🧬', 'blue eyes': '🔵👁️', 'moustache': '🥸',
  'curly hair': '🌀', 'thin': '🪶', 'green eyes': '🟢👁️', 'blond hair': '☀️', 'fat': '🎈',
  'beard': '🧔‍♂️', 'straight hair': '📏', 'grey hair': '⚪', 'long hair': '🎀', 'short hair': '✂️',
  'tall': '🦒', 'short': '🐿️', 'brown eyes': '🟤👁️', 'brown hair': '🌰', 'young': '👶',
  'old': '👴', 'weak': '🪶', 'strong': '💪', 'beautiful': '👸', 'ugly': '👹',
  
  // Casa
  'upstairs': '⬆️', 'downstairs': '⬇️', 'basement': '🕳️', 'floor': '🟫', 'lift': '🛗',
  'internet': '🌐', 'fan': '🌀', 'shower': '🚿', 'stairs': '🪜', 'broom': '🧹',
  'board games': '🎲', 'tall apartment building': '🏢', 'oxygen': '🫁', 'water': '💧',
  'gravity': '⬇️', 'plants': '🌱', 'animals': '🦁',
  
  // Tempo/Arte
  'day': '☀️', 'night': '🌙', 'aging': '👶➡️👴', 'schedule': '📅', 'sandglass': '⏳',
  'four seasons': '🍂', 'birthday': '🎂', 'pottery': '🏺', 'architecture': '🏛️',
  'sculpture': '🗿', 'maths': '🔢', 'sport': '🏃‍♂️',
  
  // Comida/Ações
  'picnic': '🧺', 'cheese': '🧀', 'glass': '🥛', 'lemonade': '🍋', 'butter': '🧈',
  'spoon': '🥄', 'sandwich': '🥪', 'plate': '🍽️', 'fork': '🍴', 'salad': '🥗',
  'bowl': '🥣', 'knife': '🔪', 'dance': '💃', 'monday': '1️⃣', 'wednesday': '3️⃣',
  'read': '📖', 'roast': '🔥', 'heat': '🌡️', 'grind': '⚙️', 'brew': '☕', 'age': '👶➡️👴'
};

// Função para criar SVG (SEM LEGENDAS - apenas visual)
function createSVG(word, category) {
  const colors = gradients[category] || ['#667eea', '#764ba2'];
  const emoji = specificEmojis[word.en.toLowerCase()] || '🖼️';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
  <defs>
    <linearGradient id="bg${word.en.replace(/\s+/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors[1]};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="300" height="200" fill="url(#bg${word.en.replace(/\s+/g, '')})" rx="15"/>
  <circle cx="60" cy="40" r="12" fill="rgba(255,255,255,0.1)"/>
  <circle cx="240" cy="160" r="18" fill="rgba(255,255,255,0.1)"/>
  <circle cx="270" cy="30" r="8" fill="rgba(255,255,255,0.1)"/>
  <circle cx="30" cy="170" r="10" fill="rgba(255,255,255,0.1)"/>
  <text x="150" y="120" font-family="Arial, sans-serif" font-size="64" text-anchor="middle" fill="white" filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.3))">${emoji}</text>
  <rect x="8" y="8" width="284" height="184" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="3" rx="12"/>
</svg>`;
}

// Função para criar filename seguro
function createSafeFilename(word) {
  return word.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/--+/g, '-');
}

// Criar diretório se não existir
const imagesDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

console.log('🎨 Gerando imagens SVG para todas as palavras...\n');

let generatedCount = 0;

// Gerar SVG para cada palavra
wordsData.forEach((word, index) => {
  const filename = createSafeFilename(word.en) + '.svg';
  const filepath = path.join(imagesDir, filename);
  
  const svgContent = createSVG(word, word.category);
  
  try {
    fs.writeFileSync(filepath, svgContent);
    generatedCount++;
    console.log(`✅ ${String(index + 1).padStart(2)}. ${word.en.padEnd(20)} → ${filename}`);
  } catch (error) {
    console.log(`❌ ${String(index + 1).padStart(2)}. ${word.en.padEnd(20)} → ERRO: ${error.message}`);
  }
});

console.log(`\n🎉 Concluído! Geradas ${generatedCount} imagens SVG de ${wordsData.length} palavras.`);
console.log(`📁 Imagens salvas em: ${imagesDir}`);
console.log(`\n🔄 Agora atualize o wordsData.js para usar as extensões .svg`);
