const mongoose = require('mongoose');
const Suggestion = require('./models/Suggestion');

// Lista de termos de exemplo (poderia ser um arquivo JSON externo)
const sampleTerms = [
  "Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", 
  "Honeydew", "Iceberg Lettuce", "Jackfruit", "Kiwi", "Lemon", "Mango",
  "Nectarine", "Orange", "Papaya", "Quince", "Raspberry", "Strawberry",
  "Tomato", "Ugli Fruit", "Vanilla Bean", "Watermelon", "Xigua", "Yellow Squash",
  "Zucchini", "Apricot", "Blueberry", "Cantaloupe", "Dragonfruit"
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