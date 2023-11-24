import request from 'supertest';
import server from '../server.ts';
import { connectToDB, disconnectFromDB, clearDB } from '../db/db.ts';
import { GenreModel } from '../models/genreModel.ts';
import { genres } from '../data/data.ts';

beforeAll(async () => {
  await connectToDB(process.env.TEST_DB_URL as string);
});
beforeEach(async () => {
  await clearDB();
  await GenreModel.create(genres);
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
      const response = await request(server).post('/api/v1/genres').send({
        name: 'drama',
      });

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        status: 'fail',
        message: expect.stringMatching('duplicate key error'),
      });
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
