import { Router } from 'express';

import * as genresController from '../controllers/genresController.js';

const genresRouter: Router = Router();

genresRouter
  .route('/')
  .get(genresController.getAllGenres)
  .post(genresController.createGenre)
  .delete(genresController.deleteGenre);

genresRouter
  .route('/:id')
  .get(genresController.getGenreById)
  .put(genresController.updateGenre);

export default genresRouter;
