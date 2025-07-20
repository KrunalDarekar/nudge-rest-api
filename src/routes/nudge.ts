import { Router, Request, Response } from 'express';
import { AIService } from '../services/aiService';
import { validateNudgeRequest } from '../middleware/validation';
import { NudgeRequest, NudgeResponse, ErrorResponse } from '../types';

const router = Router();
const aiService = new AIService();

router.post('/nudge', validateNudgeRequest, async (req: Request, res: Response) => {
  try {
    const requestData: NudgeRequest = req.body;
    
    const nudgeResponse: NudgeResponse = await aiService.generateNudge(requestData);
    
    res.status(200).json(nudgeResponse);
  } catch (error) {
    console.error('Error in nudge route:', error);
    
    const errorResponse: ErrorResponse = {
      error: 'Nudge Generation Failed',
      message: error instanceof Error ? error.message : 'Failed to generate nudge',
      timestamp: new Date().toISOString(),
    };
    
    res.status(500).json(errorResponse);
  }
});

export default router; 