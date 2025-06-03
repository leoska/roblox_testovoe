import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

function errorHandler(
  error: Error,
  _: Request,
  res: Response,
  next: NextFunction,
) {
  logger.error(error);
  res.status(500).json(error);
  next(error);
}

export default errorHandler;
