const mongoose = require('mongoose');

// Definition des Eintrag-Schemas
const eintragSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  submissionDate: {
    type: String,
    required: true
  }
});

// Erstellung des Eintrag-Modells
const Eintrag = mongoose.model('Eintrag', eintragSchema);

// Export des Eintrag-Modells
module.exports = Eintrag;
