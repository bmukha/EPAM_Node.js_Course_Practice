import { type Request, type Response } from 'express';
import { asyncErrorHandler } from '../utils/asyncErrorHandler.ts';

export const getDadJoke = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const response: globalThis.Response = await fetch(
      'https://icanhazdadjoke.com/',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    const { joke } = await response.json();

    res.status(200).json({
      status: 'success',
      data: {
        joke,
      },
    });
  },
);
