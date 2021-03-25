const mongoose = require('mongoose');

const connectionTypeSchema = new mongoose.Schema({
  id: String,
  FormalName: String,
  Title: String,
});

module.exports = mongoose.model('ConnectionType', connectionTypeSchema);