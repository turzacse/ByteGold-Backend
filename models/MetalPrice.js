const mongoose = require('mongoose');

const metalPriceSchema = new mongoose.Schema({
  title: String,
  description: String,
  source: String,
  gold: String,
  silver: String,
  platinum: String,
  palladium: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('MetalPrice', metalPriceSchema);
