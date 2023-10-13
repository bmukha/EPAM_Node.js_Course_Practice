import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  release_date: { type: Date, required: true },
  genres: { type: [mongoose.Schema.Types.ObjectId], ref: 'Genre' },
});

export const MovieModel = mongoose.model('Movie', MovieSchema);
