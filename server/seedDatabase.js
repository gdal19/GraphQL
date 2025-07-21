const mongoose = require('mongoose');
const Suggestion = require('./models/Suggestion');

// Lista de termos de exemplo (poderia ser um arquivo JSON externo)
const sampleTerms = [
  "Abóbora", "Alface", "Berinjela", "Beterraba", "Brócolis",
  "Cebola", "Cenoura", "Chuchu", "Couve", "Espinafre",
  "Pepino", "Pimentão", "Rabanete", "Repolho", "Tomate",
  "Caderno", "Caneta", "Celular", "Computador", "Garrafa",
  "Livro", "Mochila", "Óculos", "Panela", "Relógio",
  "Sapato", "Teclado", "Telefone", "Ventilador", "Xícara",
  "Advogado", "Bombeiro", "Cozinheiro", "Dentista", "Enfermeiro",
  "Engenheiro", "Médico", "Professor", "Programador", "Veterinário",
  "Cachorro", "Gato", "Elefante", "Girafa", "Leão",
  "Macaco", "Papagaio", "Tartaruga", "Tigre", "Zebra"
];

async function seedDB() {
  try {
    await mongoose.connect('mongodb://mongo:27017/autocomplete');
    console.log('Connected for seeding');
    
    await Suggestion.deleteMany({});
    
    const suggestions = sampleTerms.map(term => ({
      term,
      popularity: Math.floor(Math.random() * 100)
    }));
    
    await Suggestion.insertMany(suggestions);
    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    mongoose.disconnect();
  }
}

seedDB();