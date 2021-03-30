import mongoose from 'mongoose';

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log('Connected to the database!');
  } catch (error) {
    console.log(`Error while connectin to MongoDB: ${error.message}`);
  }
};

export default connectMongo;