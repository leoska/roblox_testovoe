import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

function logRequest(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(
      `[${req.method}] ${req.originalUrl} → ${res.statusCode} (${duration}ms)`,
    );
  });

  next();
}

export default logRequest;
