import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc, { Options } from 'swagger-jsdoc';

import healthCheckRouter from './routes/health-check.js';
import dadJokeRouter from './routes/dad-joke.js';

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

app.get('/', (req: Request, res: Response) => res.send('Hello, World!'));

app.use('/health-check', healthCheckRouter);

app.use('/dad-joke', dadJokeRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req: Request, res: Response, next: NextFunction) =>
  res.status(404).send('404 Not Found')
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) =>
  res.status(500).send('Internal Server Error')
);

app.listen(PORT, (): void => console.log(`Server listening on port ${PORT}`));
