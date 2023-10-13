import { Request, Response } from 'express';

import { GenreModel } from '../models/genreModel.ts';

export const getAllGenres = async (req: Request, res: Response) => {
  try {
    const response = await GenreModel.find();
    res.send(response);
  } catch (error) {
    res.status(505).send('Genres loading failed');
  }
};

export const getGenreById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await GenreModel.findById(id);
    res.send(response);
  } catch (error) {
    res.status(505).send('Genres loading failed');
  }
};

export const createGenre = async (req: Request, res: Response) => {
  const {
    body: { name },
  } = req;

  try {
    await GenreModel.create({ name });

    res.status(201).send(`Successfully created ${name} genre`);
  } catch (error) {
    if (error instanceof Error) {
      const { name, message } = error;
      res.status(400).send({ name, message });
      return;
    }
    res.status(400).send('Unknown error occured');
  }
};

export const updateGenre = async (req: Request, res: Response) => {
  const {
    params: { id },
    body: { name },
  } = req;

  console.log({ id, name });

  try {
    await GenreModel.findByIdAndUpdate(id, { name });

    res.send(`Successfully updated ${name} genre`);
  } catch (error) {
    if (error instanceof Error) {
      const { name, message } = error;
      res.status(400).send({ name, message });
      return;
    }
    res.status(400).send('Unknown error occured');
  }
};

export const deleteGenre = async (req: Request, res: Response) => {
  const {
    body: { name },
  } = req;

  try {
    await GenreModel.findOneAndDelete({ name });

    res.send(`Successfully deleted ${name} genre`);
  } catch (error) {
    if (error instanceof Error) {
      const { name, message } = error;
      res.status(400).send({ name, message });
      return;
    }
    res.status(400).send('Unknown error occured');
  }
};
