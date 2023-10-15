import { type Request, type Response } from 'express';
import { asyncErrorHandler } from '../utils/asyncErrorHandler.ts';

export const getHealthCheck = asyncErrorHandler(
  async (req: Request, res: Response) => {
    res.json({
      status: 'success',
      data: {
        serverIsRunning: true,
      },
    });
  },
);
