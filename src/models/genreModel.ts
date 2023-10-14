import mongoose from 'mongoose';

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
    unique: [true, 'Name must be unique!'],
  },
});

export const GenreModel = mongoose.model('Genre', GenreSchema);
