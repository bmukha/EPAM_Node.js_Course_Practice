import { Request, Response } from 'express';

export const getHealthCheck = (req: Request, res: Response) =>
  res.json({ isRunning: true });