import { CustomError } from '../utils/CustomError.ts';

import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import { MongoServerError } from 'mongodb';

export const globalErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode: number = 500;
  let message: string = 'Something went wrong, try again later!';

  if (
    error instanceof Error.CastError ||
    error instanceof Error.ValidationError ||
    (error instanceof MongoServerError && error.code === 11000)
  ) {
    statusCode = 400;
    message = error.message;
  } else if (error instanceof CustomError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  res.status(statusCode).json({
    status: statusCode > 399 && statusCode < 500 ? 'fail' : 'error',
    message,
  });

  next();
};
