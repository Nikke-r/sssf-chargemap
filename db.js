const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to the database!');
  } catch (error) {
    console.log(`Error while connectin to MongoDB: ${error.message}`);
  }
})();

module.exports = mongoose.connection;