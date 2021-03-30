import mongoose from 'mongoose';

const stationsSchema = new mongoose.Schema({
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

export default mongoose.model('Stations', stationsSchema);