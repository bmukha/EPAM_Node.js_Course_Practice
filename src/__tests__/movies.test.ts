/* eslint-disable @typescript-eslint/no-explicit-any */
import request from 'supertest';
import server from '../server.ts';
import { connectToDB, disconnectFromDB, clearDB } from '../db/db.ts';
import { GenreModel } from '../models/genreModel.ts';
import { Movie, MovieModel } from '../models/movieModel.ts';
import { genres, movies } from '../data/data.ts';

let firstMovie: Movie & { _id: string };
let id: string;

beforeAll(async () => {
  await connectToDB(process.env.TEST_DB_URL as string);
});

const getGenresIdsByNames = async (genresArray: string[]) => {
  return await Promise.all(
    genresArray.map(async (genreName: string) => {
      const result = await GenreModel.find({ name: genreName });
      return result[0]['_id'];
    }),
  );
};

const getMoviesWithGenreIds = async () => {
  return await Promise.all(
    movies.map(async (movie) => {
      const { genre } = movie;
      const genreIds = await getGenresIdsByNames(genre);
      return { ...movie, genre: genreIds };
    }),
  );
};

beforeEach(async () => {
  await clearDB();
  await GenreModel.create(genres);

  await MovieModel.create(await getMoviesWithGenreIds());

  const response = await request(server).get('/api/v1/movies');
  firstMovie = response.body.data.movies[0];
  id = firstMovie['_id'];
});

afterAll(async () => {
  await disconnectFromDB();
  server.close();
});

describe('Movies Endpoint', () => {
  describe('GET Request', () => {
    it(`should return status: "success" and array of movies`, async () => {
      const response = await request(server).get('/api/v1/movies');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: 'success',
        length: 4,
        data: {
          movies: expect.any(Array),
        },
      });
    });
  });

  describe('POST Request', () => {
    it(`should return status: "success", code 201 and created movie`, async () => {
      const response = await request(server)
        .post('/api/v1/movies')
        .send({
          title: 'Once upon a time in America',
          description: 'Gangster movie',
          release_date: '2001-12-09T00:00:00.000Z',
          genre: await getGenresIdsByNames(['drama']),
        });

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.data.movie.title).toBe(
        'Once upon a time in America',
      );
    });

    it(`should return status: "fail", code 400 and error message if movie already exists`, async () => {
      const response = await request(server)
        .post('/api/v1/movies')
        .send(firstMovie);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        status: 'fail',
        message: expect.stringMatching('duplicate key error'),
      });
    });

    it(`should return status: "fail", code 400 and error message if name is not provided`, async () => {
      const response = await request(server)
        .post('/api/v1/movies')
        .send({
          description: 'Gangster movie',
          release_date: '2001-12-09T00:00:00.000Z',
          genre: await getGenresIdsByNames(['drama']),
        });

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        status: 'fail',
        message: expect.stringMatching(
          'Movie validation failed: title: Title is required!',
        ),
      });
    });
  });

  describe('Single genre endpoint', () => {
    describe('GET request', () => {
      it('should return status: "success" and movie if valid id is provided', async () => {
        const response = await request(server).get(`/api/v1/movies/${id}`);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
          status: 'success',
          data: {
            movie: expect.objectContaining(firstMovie),
          },
        });
      });
      it('should return status: "fail", code 404 and error message if invalid id is provided', async () => {
        const id = '612d6b59e34dea61d8983e1e';
        const response = await request(server).get(`/api/v1/movies/${id}`);
        expect(response.status).toBe(404);
        expect(response.body).toMatchObject({
          status: 'fail',
          message: `Movie with id ${id} is not found!`,
        });
      });
    });
    //   describe('PATCH request', () => {
    //     it('should return status: "success" and updated genre if valid id is provided', async () => {
    //       const response = await request(server)
    //         .patch(`/api/v1/genres/${id}`)
    //         .send({ name: 'opera' });
    //       expect(response.status).toBe(200);
    //       expect(response.body).toMatchObject({
    //         status: 'success',
    //         data: {
    //           genre: expect.objectContaining({ name: 'opera' }),
    //         },
    //       });
    //     });
    //     it('should return status: "fail", code 404 and error message if invalid id is provided', async () => {
    //       const id = '612d6b59e34dea61d8983e1e';
    //       const response = await request(server)
    //         .patch(`/api/v1/genres/${id}`)
    //         .send({ name: 'drama' });
    //       expect(response.status).toBe(404);
    //       expect(response.body).toMatchObject({
    //         status: 'fail',
    //         message: `Genre with id ${id} is not found!`,
    //       });
    //     });
    //   });
    //   describe('DELETE request', () => {
    //     it('should return status: "success" and null if valid id is provided', async () => {
    //       const response = await request(server).delete(`/api/v1/genres/${id}`);
    //       expect(response.status).toBe(204);
    //       expect(response.body).toMatchObject({});
    //     });
    //     it('should return status: "fail", code 404 and error message if invalid id is provided', async () => {
    //       const id = '612d6b59e34dea61d8983e1e';
    //       const response = await request(server).delete(`/api/v1/genres/${id}`);
    //       expect(response.status).toBe(404);
    //       expect(response.body).toMatchObject({
    //         status: 'fail',
    //         message: `Genre with id ${id} is not found!`,
    //       });
    //     });
  });
});
