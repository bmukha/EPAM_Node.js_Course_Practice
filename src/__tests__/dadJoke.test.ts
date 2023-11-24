import request from 'supertest';
import { server } from '../server.ts';

describe('Dad Joke Endpoint', () => {
  afterAll(async () => await server.close());
  it(`should return status: "success" and joke as a string`, async () => {
    const response = await request(server).get('/api/v1/dad-joke');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 'success',
      data: {
        joke: expect.any(String),
      },
    });
  });
});
