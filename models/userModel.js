import mongoose from 'mongoose';
import 'mongoose-unique-validator';

const userModel = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export default mongoose.model('User', userModel);