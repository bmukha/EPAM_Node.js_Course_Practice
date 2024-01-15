import request from 'supertest';
import server from '../server.ts';

afterAll(async () => {
  server.close();
});

describe('Root endpoint', () => {
  describe('GET request', () => {
    it('should return status 200 welcome message', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Welcome to API!');
    });
  });
});

describe('Non-existing endpoint', () => {
  describe('GET request', () => {
    it('should return status "fail", status code 404 and error message', async () => {
      const response = await request(server).get('/no-such-path');
      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        status: 'fail',
        message: `Can't find /no-such-path on the server!`,
      });
    });
  });
});
