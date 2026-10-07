// Dados compartilhados entre Game e Cards
// Todas as palavras dos flashcards com imagens locais

const wordsData = [
  // Unidade 1 - Transportes e profissões
  { en: "Bicycle", pt: "Bicicleta", image: "/images/bicycle.svg", category: "transport" },
  { en: "Train", pt: "Trem", image: "/images/train.svg", category: "transport" },
  { en: "Motorbike", pt: "Motocicleta", image: "/images/motorbike.svg", category: "transport" },
  { en: "Helicopter", pt: "Helicóptero", image: "/images/helicopter.svg", category: "transport" },
  { en: "Rocket", pt: "Foguete", image: "/images/rocket.svg", category: "transport" },
  { en: "Truck", pt: "Caminhão", image: "/images/truck.svg", category: "transport" },
  { en: "Electric", pt: "Elétrico", image: "/images/electric.svg", category: "transport" },
  { en: "Future", pt: "Futuro", image: "/images/future.svg", category: "transport" },
  { en: "Astronaut", pt: "Astronauta", image: "/images/astronaut.svg", category: "transport" },
  { en: "Police Officer", pt: "Policial", image: "/images/police-officer.svg", category: "transport" },
  { en: "Firefighter", pt: "Bombeiro", image: "/images/firefighter.svg", category: "transport" },
  { en: "Teacher", pt: "Professor(a)", image: "/images/teacher.svg", category: "transport" },
  { en: "Clown", pt: "Palhaço", image: "/images/clown.svg", category: "transport" },
  { en: "Fisherman", pt: "Pescador", image: "/images/fisherman.svg", category: "transport" },
  { en: "Nurse", pt: "Enfermeiro(a)", image: "/images/nurse.svg", category: "transport" },
  { en: "Doctor", pt: "Médico(a)", image: "/images/doctor.svg", category: "transport" },
  { en: "Driver", pt: "Motorista", image: "/images/driver.svg", category: "transport" },
  { en: "Dentist", pt: "Dentista", image: "/images/dentist.svg", category: "transport" },

  // Unidade 2 - Lugares, esportes e profissões
  { en: "Engineer", pt: "Engenheiro(a)", image: "/images/engineer.svg", category: "community" },
  { en: "Journalist", pt: "Jornalista", image: "/images/journalist.svg", category: "community" },
  { en: "Actor", pt: "Ator", image: "/images/actor.svg", category: "community" },
  { en: "Actress", pt: "Atriz", image: "/images/actress.svg", category: "community" },
  { en: "Waiter", pt: "Garçom", image: "/images/waiter.svg", category: "community" },
  { en: "Waitress", pt: "Garçonete", image: "/images/waitress.svg", category: "community" },
  { en: "Hotel", pt: "Hotel", image: "/images/hotel.svg", category: "community" },
  { en: "University", pt: "Universidade", image: "/images/university.svg", category: "community" },
  { en: "Footballer", pt: "Jogador de futebol", image: "/images/footballer.svg", category: "community" },
  { en: "Robot", pt: "Robô", image: "/images/robot.svg", category: "community" },
  { en: "Swimming", pt: "Natação", image: "/images/swimming.svg", category: "community" },
  { en: "Volleyball", pt: "Vôlei", image: "/images/volleyball.svg", category: "community" },
  { en: "Basketball", pt: "Basquete", image: "/images/basketball.svg", category: "community" },
  { en: "Airport", pt: "Aeroporto", image: "/images/airport.svg", category: "community" },
  { en: "Park", pt: "Parque", image: "/images/park.svg", category: "community" },
  { en: "Ride", pt: "Passeio", image: "/images/ride.svg", category: "community" },
  { en: "Passenger", pt: "Passageiro(a)", image: "/images/passenger.svg", category: "community" },
  { en: "Circus", pt: "Circo", image: "/images/circus.svg", category: "community" },

  // Unidade 3 - Família, saúde e lugares
  { en: "Ambulance", pt: "Ambulância", image: "/images/ambulance.svg", category: "daily" },
  { en: "Transport", pt: "Transporte", image: "/images/transport.svg", category: "daily" },
  { en: "Uncle", pt: "Tio", image: "/images/uncle.svg", category: "daily" },
  { en: "Aunt", pt: "Tia", image: "/images/aunt.svg", category: "daily" },
  { en: "Relatives", pt: "Parentes", image: "/images/relatives.svg", category: "daily" },
  { en: "Parents", pt: "Pais", image: "/images/parents.svg", category: "daily" },
  { en: "Hospital", pt: "Hospital", image: "/images/hospital.svg", category: "daily" },
  { en: "School", pt: "Escola", image: "/images/school.svg", category: "daily" },
  { en: "Party", pt: "Festa", image: "/images/party.svg", category: "daily" },
  { en: "Honey", pt: "Mel", image: "/images/honey.svg", category: "daily" },
  { en: "Garlic", pt: "Alho", image: "/images/garlic.svg", category: "daily" },
  { en: "Sore Throat", pt: "Dor de garganta", image: "/images/sore-throat.svg", category: "daily" },
  { en: "Restroom", pt: "Banheiro", image: "/images/restroom.svg", category: "daily" },
  { en: "World", pt: "Mundo", image: "/images/world.svg", category: "daily" },
  { en: "Castle", pt: "Castelo", image: "/images/castle.svg", category: "daily" },
  { en: "Library", pt: "Biblioteca", image: "/images/library.svg", category: "daily" }
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
    transport: ['#4facfe', '#00f2fe'],
    community: ['#667eea', '#764ba2'],
    daily: ['#43e97b', '#38f9d7']
  };
  
  // Emojis por categoria
  const categoryEmojis = {
    transport: ['🚲', '🚆', '🚀', '👮', '🚒', '👩‍⚕️'],
    community: ['🏨', '⚽', '🤖', '✈️', '🎪', '🎓'],
    daily: ['🚑', '👪', '🏥', '🏫', '🍯', '🏰']
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
