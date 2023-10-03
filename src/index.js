import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import healthCheckRouter from './routes/health-check.js';
import dadJokeRouter from './routes/dad-joke.js';

const swaggerOptions = {
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
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();
const PORT = 3000;

app.get('/', (req, res) => res.send('Hello, World!'));

app.use('/health-check', healthCheckRouter);

app.use('/dad-joke', dadJokeRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res, next) => res.status(404).send('404 Not Found'));

app.use((err, req, res, next) => res.status(500).send('Internal Server Error'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
