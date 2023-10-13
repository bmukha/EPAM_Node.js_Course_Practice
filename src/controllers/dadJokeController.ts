import { Request, Response, Router } from 'express';

export const getDadJoke = async (req: Request, res: Response) => {
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
};
