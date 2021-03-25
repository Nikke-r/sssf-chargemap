const mongoose = require('mongoose');

const levelTypeSchema = new mongoose.Schema({
  id: String,
  Title: String,
  Comments: String,
  IsFastChargeCapable: Boolean,
});

module.exports = mongoose.model('Level', levelTypeSchema);