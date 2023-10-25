import { Router } from 'express';

import * as genresController from '../controllers/genresController.ts';

const genresRouter: Router = Router();

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Get all genres.
 *     description: Returns all genres.
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: A list of genres.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 length:
 *                   type: number
 *                   description: The number of genres.
 *                 data:
 *                   type: object
 *                   properties:
 *                     genres:
 *                       type: array
 *                       items:
 *                         type: object
 *   post:
 *     summary: Create a new genre.
 *     tags: [Genres]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             {
 *               "name": "sci-fi"
 *             }
 *     responses:
 *       201:
 *         description: The created genre.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 data:
 *                   type: object
 *                   properties:
 *                     genre:
 *                       type: object
 */

/**
 * @swagger
 * /genres/{id}:
 *   get:
 *     summary: Get genre by id.
 *     description: Returns a genre by its ID.
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Returns the genre by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 data:
 *                   type: object
 *                   properties:
 *                     genre:
 *                       type: object
 *   patch:
 *     summary: Update genre by id.
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             {
 *               "name": "sci-fi"
 *             }
 *     responses:
 *       200:
 *         description: The created genre.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 data:
 *                   type: object
 *                   properties:
 *                     genre:
 *                       type: object
 *   delete:
 *     summary: Delete genre by id.
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       204:
 *         description: Deletion uccessful.
 */

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
