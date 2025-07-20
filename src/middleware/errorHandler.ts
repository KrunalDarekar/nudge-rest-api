import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../types';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', error);

  const errorResponse: ErrorResponse = {
    error: error.name || 'Internal Server Error',
    message: error.message || 'An unexpected error occurred',
    timestamp: new Date().toISOString(),
  };

  // Handle specific error types
  if (error.name === 'ValidationError') {
    res.status(400).json(errorResponse);
  } else if (error.name === 'UnauthorizedError') {
    res.status(401).json(errorResponse);
  } else if (error.name === 'RateLimitExceeded') {
    res.status(429).json(errorResponse);
  } else {
    res.status(500).json(errorResponse);
  }
};

export const notFoundHandler = (req: Request, res: Response): void => {
  const errorResponse: ErrorResponse = {
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString(),
  };
  
  res.status(404).json(errorResponse);
}; 