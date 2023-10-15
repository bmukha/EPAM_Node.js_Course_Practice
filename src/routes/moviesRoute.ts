import { Router } from 'express';

import * as moviesController from '../controllers/moviesController.js';

const moviesRouter: Router = Router();

moviesRouter
  .route('/')
  .get(moviesController.getAllMovies)
  .post(moviesController.createMovie);

moviesRouter
  .route('/:id')
  .get(moviesController.getMovie)
  .patch(moviesController.updateMovie)
  .delete(moviesController.deleteMovie);

export default moviesRouter;
