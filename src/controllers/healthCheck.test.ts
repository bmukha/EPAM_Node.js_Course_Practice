import request from 'supertest';
import { server } from '../server.ts';

describe('Health Check Endpoint', () => {
  afterAll(() => server.close());
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
