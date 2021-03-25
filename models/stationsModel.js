const mongoose = require('mongoose');

const stationsSchema = new mongoose.Schema({
  id: String,
  Title: String,
  Town: String,
  AddressLine1: String,
  StateOrProvince: String,
  Postcode: String,
  Location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
    }
  },
  Connections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Connections'
    }
  ]
});

module.exports = mongoose.model('Stations', stationsSchema);