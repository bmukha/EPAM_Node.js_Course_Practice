import { GenreModel } from '../models/genreModel.ts';

import * as handlerFactory from '../utils/handlerFactory.ts';

export const getAllGenres = handlerFactory.getAll(GenreModel);

export const getGenre = handlerFactory.getOneById(GenreModel);

export const createGenre = handlerFactory.createOne(GenreModel);

export const updateGenre = handlerFactory.updateOne(GenreModel);

export const deleteGenre = handlerFactory.deleteOne(GenreModel);
