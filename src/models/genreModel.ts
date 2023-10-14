import { Schema, model, InferSchemaType } from 'mongoose';

const GenreSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
    unique: [true, 'Name must be unique!'],
  },
});

export type Genre = InferSchemaType<typeof GenreSchema>;

export const GenreModel = model('Genre', GenreSchema);
