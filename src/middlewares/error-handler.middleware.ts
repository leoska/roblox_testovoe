import { Request, Response, NextFunction } from 'express';

function errorHandler(
  error: Error,
  _: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(error);
  res.status(500).json(error);
  next(error);
}

export default errorHandler;
