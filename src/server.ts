import app from './app.ts';

const ENV = process.env.NODE_ENV;

const PORT =
  ENV === 'test'
    ? Math.floor(Math.random() * 60000) + 5000
    : process.env.PORT || 3000;

export const server = app.listen(PORT, (): void =>
  console.log(`Server listening on port ${PORT} in ${ENV} mode`),
);
