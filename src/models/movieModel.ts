import { Schema, model, InferSchemaType } from 'mongoose';

const MovieSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required!'],
    unique: [true, 'Title must be unique!'],
  },
  description: { type: String, required: [true, 'Description is required!'] },
  release_date: { type: Date, required: [true, 'Date is required!'] },
  genres: {
    type: [Schema.Types.ObjectId],
    ref: 'Genre',
    required: [true, 'Genres are required!'],
  },
});

export type Movie = InferSchemaType<typeof MovieSchema>;

export const MovieModel = model('Movie', MovieSchema);
