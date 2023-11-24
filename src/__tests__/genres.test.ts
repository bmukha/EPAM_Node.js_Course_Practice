import request from 'supertest';
import server from '../server.ts';

afterAll(async () => await server.close());

describe('Genres Endpoint', () => {
  describe('GET Request', () => {
    it(`should return status: "success" and array of genres`, async () => {
      const response = await request(server).get('/api/v1/genres');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: 'success',
        length: 3,
        data: {
          genres: expect.any(Array),
        },
      });
    });
  });
});
