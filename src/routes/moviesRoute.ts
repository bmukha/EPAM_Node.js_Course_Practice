import { Router } from 'express';

import * as moviesController from '../controllers/moviesController.ts';

const moviesRouter: Router = Router();

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies.
 *     description: Returns all movies.
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: A list of movies.
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
 *                   description: The number of movies.
 *                 data:
 *                   type: object
 *                   properties:
 *                     movies:
 *                       type: array
 *                       items:
 *                         type: object
 *   post:
 *     summary: Create a new movie.
 *     tags: [Movies]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             {
 *               "title": "Terminator",
 *               "description": "Good film",
 *               "release_date": "2002-12-09",
 *               "genre": ["652d6b66e34dea61d8983e22"]
 *             }
 *     responses:
 *       201:
 *         description: The created movie.
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
 *                     movie:
 *                       type: object
 */

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get movie by id.
 *     description: Returns a movie by its ID.
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Returns the movie by ID.
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
 *                     movie:
 *                       type: object
 *   patch:
 *     summary: Update movie by id.
 *     tags: [Movies]
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
 *         description: The created movie.
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
 *                     movie:
 *                       type: object
 *   delete:
 *     summary: Delete movie by id.
 *     tags: [Movies]
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

/**
 * @swagger
 * /movies/genre/{genreName}:
 *   get:
 *     summary: Get movies by genre name.
 *     description: Returns movies by genre name.
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: genreName
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Returns movies by genre name.
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
 *                     movies:
 *                       type: array
 *                       items:
 *                         type: object
 */

moviesRouter
  .route('/')
  .get(moviesController.getAllMovies)
  .post(moviesController.createMovie);

moviesRouter
  .route('/:id')
  .get(moviesController.getMovie)
  .patch(moviesController.updateMovie)
  .delete(moviesController.deleteMovie);

moviesRouter.route('/genre/:genreName').get(moviesController.getMoviesByGenre);

export default moviesRouter;
