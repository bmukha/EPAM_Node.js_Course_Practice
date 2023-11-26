import app from './app.ts';
import mongoose from 'mongoose';

const ENV = process.env.NODE_ENV;

const PORT =
  ENV === 'test'
    ? Math.floor(Math.random() * 60000) + 5000
    : process.env.PORT || 3000;

const server = app.listen(PORT, (): void =>
  console.log(`Server listening on port ${PORT} in ${ENV} mode`),
);

server.on('close', () => mongoose.connection.close());

export default server;
