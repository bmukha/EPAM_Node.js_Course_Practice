import { Request, Response, NextFunction } from 'express';

export const asyncErrorHandler = (
  handlerFunc: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    handlerFunc(req, res, next).catch((err: Error) => next(err));
  };
};
