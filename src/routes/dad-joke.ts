import { Router } from 'express';

import * as dadJokeController from '../controllers/dadJokeController.ts';

const dadJokeRouter: Router = Router();

/**
 * @swagger
 * /dad-joke:
 *   get:
 *     summary: Get a random dad joke.
 *     description: Returns a random dad joke.
 *     tags: [Dad Joke]
 *     responses:
 *       200:
 *         description: A random dad joke.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Joke load failed
 */

dadJokeRouter.get('/', dadJokeController.getDadJoke);

export default dadJokeRouter;
