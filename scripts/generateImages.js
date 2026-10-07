const fs = require('fs');
const path = require('path');

// Dados das palavras (copiado do wordsData.js)
const wordsData = [
  // Unidade 1 - Transportes e profissões
  { en: "Bicycle", pt: "Bicicleta", category: "transport" },
  { en: "Train", pt: "Trem", category: "transport" },
  { en: "Motorbike", pt: "Motocicleta", category: "transport" },
  { en: "Helicopter", pt: "Helicóptero", category: "transport" },
  { en: "Rocket", pt: "Foguete", category: "transport" },
  { en: "Truck", pt: "Caminhão", category: "transport" },
  { en: "Electric", pt: "Elétrico", category: "transport" },
  { en: "Future", pt: "Futuro", category: "transport" },
  { en: "Astronaut", pt: "Astronauta", category: "transport" },
  { en: "Police Officer", pt: "Policial", category: "transport" },
  { en: "Firefighter", pt: "Bombeiro", category: "transport" },
  { en: "Teacher", pt: "Professor(a)", category: "transport" },
  { en: "Clown", pt: "Palhaço", category: "transport" },
  { en: "Fisherman", pt: "Pescador", category: "transport" },
  { en: "Nurse", pt: "Enfermeiro(a)", category: "transport" },
  { en: "Doctor", pt: "Médico(a)", category: "transport" },
  { en: "Driver", pt: "Motorista", category: "transport" },
  { en: "Dentist", pt: "Dentista", category: "transport" },

  // Unidade 2 - Lugares, esportes e profissões
  { en: "Engineer", pt: "Engenheiro(a)", category: "community" },
  { en: "Journalist", pt: "Jornalista", category: "community" },
  { en: "Actor", pt: "Ator", category: "community" },
  { en: "Actress", pt: "Atriz", category: "community" },
  { en: "Waiter", pt: "Garçom", category: "community" },
  { en: "Waitress", pt: "Garçonete", category: "community" },
  { en: "Hotel", pt: "Hotel", category: "community" },
  { en: "University", pt: "Universidade", category: "community" },
  { en: "Footballer", pt: "Jogador de futebol", category: "community" },
  { en: "Robot", pt: "Robô", category: "community" },
  { en: "Swimming", pt: "Natação", category: "community" },
  { en: "Volleyball", pt: "Vôlei", category: "community" },
  { en: "Basketball", pt: "Basquete", category: "community" },
  { en: "Airport", pt: "Aeroporto", category: "community" },
  { en: "Park", pt: "Parque", category: "community" },
  { en: "Ride", pt: "Passeio", category: "community" },
  { en: "Passenger", pt: "Passageiro(a)", category: "community" },
  { en: "Circus", pt: "Circo", category: "community" },

  // Unidade 3 - Família, saúde e lugares
  { en: "Ambulance", pt: "Ambulância", category: "daily" },
  { en: "Transport", pt: "Transporte", category: "daily" },
  { en: "Uncle", pt: "Tio", category: "daily" },
  { en: "Aunt", pt: "Tia", category: "daily" },
  { en: "Relatives", pt: "Parentes", category: "daily" },
  { en: "Parents", pt: "Pais", category: "daily" },
  { en: "Hospital", pt: "Hospital", category: "daily" },
  { en: "School", pt: "Escola", category: "daily" },
  { en: "Party", pt: "Festa", category: "daily" },
  { en: "Honey", pt: "Mel", category: "daily" },
  { en: "Garlic", pt: "Alho", category: "daily" },
  { en: "Sore Throat", pt: "Dor de garganta", category: "daily" },
  { en: "Restroom", pt: "Banheiro", category: "daily" },
  { en: "World", pt: "Mundo", category: "daily" },
  { en: "Castle", pt: "Castelo", category: "daily" },
  { en: "Library", pt: "Biblioteca", category: "daily" }
];

// Configurações de cores por categoria
const gradients = {
  transport: ['#4facfe', '#00f2fe'],
  community: ['#667eea', '#764ba2'],
  daily: ['#43e97b', '#38f9d7']
};

// Emojis específicos por palavra
const specificEmojis = {
  'bicycle': '🚲', 'train': '🚆', 'motorbike': '🏍️', 'helicopter': '🚁', 'rocket': '🚀',
  'truck': '🚚', 'electric': '⚡', 'future': '🔮', 'astronaut': '👨‍🚀', 'police officer': '👮',
  'firefighter': '🚒', 'teacher': '👩‍🏫', 'clown': '🤡', 'fisherman': '🎣', 'nurse': '👩‍⚕️',
  'doctor': '👨‍⚕️', 'driver': '🚗', 'dentist': '🦷',

  'engineer': '👷', 'journalist': '📰', 'actor': '🎭', 'actress': '🎬', 'waiter': '🤵',
  'waitress': '💁', 'hotel': '🏨', 'university': '🎓', 'footballer': '⚽', 'robot': '🤖',
  'swimming': '🏊', 'volleyball': '🏐', 'basketball': '🏀', 'airport': '✈️', 'park': '🌳',
  'ride': '🎢', 'passenger': '🧳', 'circus': '🎪',

  'ambulance': '🚑', 'transport': '🚌', 'uncle': '👨', 'aunt': '👩', 'relatives': '👨‍👩‍👧‍👦',
  'parents': '👪', 'hospital': '🏥', 'school': '🏫', 'party': '🎉', 'honey': '🍯',
  'garlic': '🧄', 'sore throat': '🤒', 'restroom': '🚻', 'world': '🌍', 'castle': '🏰',
  'library': '📚'
};

// Função para criar SVG otimizado (SEM LEGENDAS - apenas visual)
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
