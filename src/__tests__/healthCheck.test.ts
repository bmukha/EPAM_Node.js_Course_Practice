import request from 'supertest';
import server from '../server.ts';

afterAll(async () => await server.close());
describe('Health Check Endpoint', () => {
  it(`should return status: "success" and serverIsRunning: true`, async () => {
    const response = await request(server).get('/api/v1/health-check');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'success',
      data: {
        serverIsRunning: true,
      },
    });
  });
});
