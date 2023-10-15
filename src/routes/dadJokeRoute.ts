import { Router } from 'express';

import * as dadJokeController from '../controllers/dadJokeController.js';

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
 *         description: Successful response.
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
 *                     joke:
 *                       type: string
 *                       description: The retrieved dad joke.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           text/plain:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

dadJokeRouter.get('/', dadJokeController.getDadJoke);

export default dadJokeRouter;
