import { MovieModel } from '../models/movieModel.ts';
import { GenreModel } from '../models/genreModel.ts';

import * as handlerFactory from '../utils/handlerFactory.ts';
import { asyncErrorHandler } from '../utils/asyncErrorHandler.ts';
import { CustomError } from '../utils/CustomError.ts';

export const getAllMovies = handlerFactory.getAll(MovieModel);

export const getMovie = handlerFactory.getOneById(MovieModel);

export const createMovie = handlerFactory.createOne(MovieModel);

export const updateMovie = handlerFactory.updateOne(MovieModel);

export const deleteMovie = handlerFactory.deleteOne(MovieModel);

export const getMoviesByGenre = asyncErrorHandler(async (req, res, next) => {
  const { genreName } = req.params;
  console.log('genre is', genreName);

  const genre = await GenreModel.findOne({ name: genreName }).exec();

  if (!genre) {
    const error = new CustomError(`Genre '${genreName}' not found.`, 404);
    next(error);
  } else {
    const movies = await MovieModel.find({ genre: genre._id });

    res.status(200).json({
      status: 'success',
      count: movies.length,
      data: {
        movies,
      },
    });
  }
});
