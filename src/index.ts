import dotenv from 'dotenv';
dotenv.config();
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc, { Options } from 'swagger-jsdoc';
import mongoose from 'mongoose';

import healthCheckRouter from './routes/healthCheckRoute.ts';
import dadJokeRouter from './routes/dadJokeRoute.ts';
import genresRouter from './routes/genresRoute.ts';

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
        url: 'http://localhost:3000/',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => res.send('Hello, World!'));

app.use('/health-check', healthCheckRouter);

app.use('/dad-joke', dadJokeRouter);

app.use('/genres', genresRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req: Request, res: Response, next: NextFunction) =>
  res.status(404).send('404 Not Found')
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) =>
  res.status(500).send('Internal Server Error')
);

try {
  await mongoose.connect(process.env.DB_URL as string);
  console.log('DB connection successful!');
} catch (error) {
  console.error('DB connection failed!');
}

app.listen(process.env.PORT || 3000, (): void =>
  console.log(`Server listening on port ${PORT}`)
);
