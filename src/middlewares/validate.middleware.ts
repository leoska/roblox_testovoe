import { Request, Response, NextFunction } from 'express';

type ValidatorFn<T = any> = (value: T) => string | null;

interface ValidationSchema {
  body?: ValidatorFn;
  params?: ValidatorFn;
  query?: ValidatorFn;
}

const validate =
  (schema: ValidationSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];

    if (schema.body) {
      const error = schema.body(req.body);
      if (error) errors.push(`body: ${error}`);
    }

    if (schema.params) {
      const error = schema.params(req.params);
      if (error) errors.push(`params: ${error}`);
    }

    if (schema.query) {
      const error = schema.query(req.query);
      if (error) errors.push(`query: ${error}`);
    }

    if (errors.length > 0) {
      res.status(400).json({ message: 'Validation error', errors });
      return;
    }

    next();
  };

export default validate;
