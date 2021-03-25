const mongoose = require('mongoose');

const currentTypeSchema = new mongoose.Schema({
  id: String,
  Description: String,
  Title: String,
});

module.exports = mongoose.model('CurrentType', currentTypeSchema);