import { Request, Response, Router } from 'express';

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

dadJokeRouter.get('/', async (req: Request, res: Response) => {
  try {
    const response: globalThis.Response = await fetch(
      'https://icanhazdadjoke.com/',
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const { joke } = await response.json();

    res.send(joke);
  } catch (error: unknown) {
    res.status(500).send('Joke load failed');
  }
});

export default dadJokeRouter;
