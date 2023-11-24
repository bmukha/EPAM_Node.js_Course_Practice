import request from 'supertest';
import server from '../server.ts';

afterAll(async () => await server.close());
describe('Dad Joke Endpoint', () => {
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
