require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/autocomplete')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Modelo de Suggestion
const suggestionSchema = new mongoose.Schema({
  term: { type: String, required: true, index: true },
  popularity: { type: Number, default: 0 }
});
const Suggestion = mongoose.model('Suggestion', suggestionSchema);

// Rotas
app.get('/api/suggestions', async (req, res) => {
  const { query } = req.query;
  if (!query || query.length < 4) {
    return res.json([]);
  }

  try {
    const suggestions = await Suggestion.find(
      { term: { $regex: `^${query}`, $options: 'i' } },
      { _id: 0, term: 1 }
    )
      .sort({ popularity: -1, term: 1 })
      .limit(20);

    res.json(suggestions.map(s => s.term));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));