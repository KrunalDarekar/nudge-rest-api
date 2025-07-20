import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { nudgeRequestSchema } from '../validation/schemas';
import { ErrorResponse } from '../types';

export const validateNudgeRequest = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const validatedData = nudgeRequestSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorResponse: ErrorResponse = {
        error: 'Validation Error',
        message: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
        timestamp: new Date().toISOString(),
      };
      res.status(400).json(errorResponse);
    } else {
      next(error);
    }
  }
}; 