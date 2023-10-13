import { Request, Response, Router } from 'express';

export const getHealthCheck = (req: Request, res: Response) =>
  res.json({ isRunning: true });
