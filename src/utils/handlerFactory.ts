import { Request, Response, NextFunction } from 'express';

import { Model } from 'mongoose';

import { asyncErrorHandler } from './asyncErrorHandler.ts';
import { CustomError } from './CustomError.ts';

export const getAll = <T>(Model: Model<T>) => {
  return asyncErrorHandler(async (req: Request, res: Response) => {
    const data = await Model.find();
    const collectionName = `${Model.modelName.toLowerCase()}s`;
    res.status(200).json({
      status: 'success',
      length: data.length,
      data: {
        [collectionName]: data,
      },
    });
  });
};

export const getOneById = <T>(Model: Model<T>) => {
  return asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const document = await Model.findById(id);

      if (!document) {
        const error = new CustomError(
          `${Model.modelName} with id ${id} is not found!`,
          404,
        );
        return next(error);
      }

      res.status(200).json({
        status: 'success',
        data: {
          [Model.modelName.toLocaleLowerCase()]: document,
        },
      });
    },
  );
};

export const createOne = <T>(Model: Model<T>) => {
  return asyncErrorHandler(async (req: Request, res: Response) => {
    const document = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        [Model.modelName.toLocaleLowerCase()]: document,
      },
    });
  });
};

export const updateOne = <T>(Model: Model<T>) => {
  return asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const updatedDocument = await Model.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedDocument) {
        const error = new CustomError(
          `${Model.modelName} with id ${id} is not found!`,
          404,
        );
        return next(error);
      }

      res.status(200).json({
        status: 'success',
        data: {
          [Model.modelName.toLocaleLowerCase()]: updatedDocument,
        },
      });
    },
  );
};

export const deleteOne = <T>(Model: Model<T>) => {
  return asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const deletedDocument = await Model.findByIdAndDelete(id);

      if (!deletedDocument) {
        const error = new CustomError(
          `${Model.modelName} with id ${id} is not found!`,
          404,
        );
        return next(error);
      }

      res.status(204).json({
        status: 'success',
        data: null,
      });
    },
  );
};
