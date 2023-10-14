import { Router } from 'express';

import * as genresController from '../controllers/genresController.js';

const genresRouter: Router = Router();

genresRouter
  .route('/')
  .get(genresController.getAllGenres)
  .post(genresController.createGenre);

genresRouter
  .route('/:id')
  .get(genresController.getGenre)
  .patch(genresController.updateGenre)
  .delete(genresController.deleteGenre);

export default genresRouter;
