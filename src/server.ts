import app from './app.ts';

const PORT = 3000;

export const server = app.listen(process.env.PORT || 3000, (): void =>
  console.log(
    `Server listening on port ${PORT} in ${process.env.NODE_ENV} mode`,
  ),
);
