import { Router, Request, Response } from 'express';
import { HealthResponse } from '../types';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  const healthResponse: HealthResponse = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
  };
  
  res.status(200).json(healthResponse);
});

export default router; 