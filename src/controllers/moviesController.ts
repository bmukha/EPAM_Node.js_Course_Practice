import { MovieModel } from '../models/movieModel.js';

import * as handlerFactory from '../utils/handlerFactory.js';

export const getAllMovies = handlerFactory.getAll(MovieModel);

export const getMovie = handlerFactory.getOneById(MovieModel);

export const createMovie = handlerFactory.createOne(MovieModel);

export const updateMovie = handlerFactory.updateOne(MovieModel);

export const deleteMovie = handlerFactory.deleteOne(MovieModel);
