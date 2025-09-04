const fs = require('fs');
const path = require('path');

// Caminho para o arquivo wordsData.js
const wordsDataPath = path.join(__dirname, '..', 'src', 'wordsData.js');

// Ler o arquivo atual
console.log('📄 Lendo wordsData.js...');
let content = fs.readFileSync(wordsDataPath, 'utf8');

console.log('🔄 Atualizando caminhos de .png para .svg...');

// Função para criar filename seguro (igual ao usado no generateImages.js)
function createSafeFilename(word) {
  return word.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/--+/g, '-');
}

// Lista de palavras para atualizar
const wordsToUpdate = [
  'Portrait', 'Self-portrait', 'DNA', 'Blue eyes', 'Moustache', 'Curly hair',
  'Thin', 'Green eyes', 'Blond hair', 'Fat', 'Beard', 'Straight hair',
  'Grey hair', 'Long hair', 'Short hair', 'Tall', 'Short', 'Brown eyes',
  'Brown hair', 'Young', 'Old', 'Weak', 'Strong', 'Beautiful', 'Ugly',
  'Upstairs', 'Downstairs', 'Basement', 'Floor', 'Lift', 'Internet',
  'Fan', 'Shower', 'Stairs', 'Broom', 'Board games', 'Tall apartment building',
  'Oxygen', 'Water', 'Gravity', 'Plants', 'Animals', 'Day', 'Night',
  'Aging', 'Schedule', 'Sandglass', 'Four seasons', 'Birthday', 'Pottery',
  'Architecture', 'Sculpture', 'Maths', 'Sport', 'Picnic', 'Cheese',
  'Glass', 'Lemonade', 'Butter', 'Spoon', 'Sandwich', 'Plate', 'Fork',
  'Salad', 'Bowl', 'Knife', 'Dance', 'Monday', 'Wednesday', 'Read',
  'Roast', 'Heat', 'Grind', 'Brew', 'Age'
];

let updatedCount = 0;

// Atualizar cada palavra
wordsToUpdate.forEach(word => {
  const filename = createSafeFilename(word);
  const oldPath = `"/images/${filename}.png"`;
  const newPath = `"/images/${filename}.svg"`;
  
  if (content.includes(oldPath)) {
    content = content.replace(oldPath, newPath);
    updatedCount++;
    console.log(`✅ ${word.padEnd(25)} → ${filename}.svg`);
  } else {
    // Tentar com diferentes variações
    const variations = [
      `"/images/${word.toLowerCase().replace(/\s+/g, '-')}.png"`,
      `"/images/${word.toLowerCase()}.png"`,
    ];
    
    let found = false;
    variations.forEach(variation => {
      if (content.includes(variation) && !found) {
        const newVariation = variation.replace('.png', '.svg');
        content = content.replace(variation, newVariation);
        updatedCount++;
        found = true;
        console.log(`✅ ${word.padEnd(25)} → ${filename}.svg (variation)`);
      }
    });
    
    if (!found) {
      console.log(`⚠️  ${word.padEnd(25)} → não encontrado`);
    }
  }
});

// Salvar o arquivo atualizado
fs.writeFileSync(wordsDataPath, content);

console.log(`\n🎉 Concluído! Atualizadas ${updatedCount} referências de imagens para .svg`);
console.log(`📁 Arquivo atualizado: ${wordsDataPath}`);
