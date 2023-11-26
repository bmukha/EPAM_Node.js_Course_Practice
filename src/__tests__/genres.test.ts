import request from 'supertest';
import server from '../server.ts';
import { connectToDB, disconnectFromDB, clearDB } from '../db/db.ts';
import { Genre, GenreModel } from '../models/genreModel.ts';
import { genres } from '../data/data.ts';

let firstGenre: Genre & { _id: string };
let id: string;

beforeAll(async () => {
  await connectToDB(process.env.TEST_DB_URL as string);
  await clearDB();
  await GenreModel.create(genres);
  const response = await request(server).get('/api/v1/genres');
  firstGenre = response.body.data.genres[0];
  id = firstGenre['_id'];
});

afterAll(async () => {
  await disconnectFromDB();
  server.close();
});

describe('Genres Endpoint', () => {
  describe('GET Request', () => {
    it(`should return status: "success" and array of genres`, async () => {
      const response = await request(server).get('/api/v1/genres');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: 'success',
        length: 4,
        data: {
          genres: expect.any(Array),
        },
      });
    });
  });

  describe('POST Request', () => {
    it(`should return status: "success", code 201 and created genre`, async () => {
      const response = await request(server).post('/api/v1/genres').send({
        name: 'cartoon',
      });

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.data.genre.name).toBe('cartoon');
    });

    it(`should return status: "fail", code 400 and error message if genre already exists`, async () => {
      const response = await request(server)
        .post('/api/v1/genres')
        .send(firstGenre);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        status: 'fail',
        message: expect.stringMatching('duplicate key error'),
      });
    });

    it(`should return status: "fail", code 400 and error message if name is not provided`, async () => {
      const response = await request(server).post('/api/v1/genres').send();

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        status: 'fail',
        message: expect.stringMatching(
          'Genre validation failed: name: Name is required!',
        ),
      });
    });
  });
});
describe('Single genre endpoint', () => {
  describe('GET request', () => {
    it('should return status: "success" and genre if valid id is provided', async () => {
      const response = await request(server).get(`/api/v1/genres/${id}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: 'success',
        data: {
          genre: expect.objectContaining(firstGenre),
        },
      });
    });

    it('should return status: "fail", code 404 and error message if invalid id is provided', async () => {
      const id = '612d6b59e34dea61d8983e1e';
      const response = await request(server).get(`/api/v1/genres/${id}`);

      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        status: 'fail',
        message: `Genre with id ${id} is not found!`,
      });
    });
  });

  describe('PATCH request', () => {
    it('should return status: "success" and updated genre if valid id is provided', async () => {
      const response = await request(server)
        .patch(`/api/v1/genres/${id}`)
        .send({ name: 'opera' });

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: 'success',
        data: {
          genre: expect.objectContaining({ name: 'opera' }),
        },
      });
    });

    it('should return status: "fail", code 404 and error message if invalid id is provided', async () => {
      const id = '612d6b59e34dea61d8983e1e';
      const response = await request(server)
        .patch(`/api/v1/genres/${id}`)
        .send({ name: 'drama' });

      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        status: 'fail',
        message: `Genre with id ${id} is not found!`,
      });
    });
  });

  describe('DELETE request', () => {
    it('should return status: "success" and null if valid id is provided', async () => {
      const response = await request(server).delete(`/api/v1/genres/${id}`);

      expect(response.status).toBe(204);
      expect(response.body).toMatchObject({});
    });

    it('should return status: "fail", code 404 and error message if invalid id is provided', async () => {
      const id = '612d6b59e34dea61d8983e1e';
      const response = await request(server).delete(`/api/v1/genres/${id}`);

      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        status: 'fail',
        message: `Genre with id ${id} is not found!`,
      });
    });
  });
});
