import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc, { Options } from 'swagger-jsdoc';
import { connectToDB } from './db/db.ts';
import healthCheckRouter from './routes/healthCheckRoute.ts';
import dadJokeRouter from './routes/dadJokeRoute.ts';
import genresRouter from './routes/genresRoute.ts';
import moviesRouter from './routes/moviesRoute.ts';

import { CustomError } from './utils/CustomError.ts';

import { globalErrorHandler } from './utils/errorsHandler.ts';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EPAM NodeJS project API',
      version: '1.0.0',
      description: 'Documentation for EPAM NodeJS project API',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();

app.use(express.json());

app.use('/api/v1/health-check', healthCheckRouter);

app.use('/api/v1/dad-joke', dadJokeRouter);

app.use('/api/v1/genres', genresRouter);

app.use('/api/v1/movies', moviesRouter);

app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req: Request, res: Response) => res.send('Welcome to API!'));

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404,
  );
  next(err);
});

app.use(globalErrorHandler);

if (process.env.NODE_ENV !== 'test') {
  (async () => await connectToDB(process.env.DB_URL as string))();
}

export default app;
