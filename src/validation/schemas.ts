import { z } from 'zod';

export const nudgeRequestSchema = z.object({
  title: z.string().min(1, 'Problem title is required').max(200, 'Title too long'),
  statement: z.string().min(0, 'Problem statement must be at least 10 characters').max(10000, 'Statement too long'),
  language: z.string().min(1, 'Programming language is required').max(50, 'Language name too long'),
  code: z.string().min(1, 'Code is required').max(50000, 'Code too long'),
  examples: z.array(z.string()).optional(),
  constraints: z.array(z.string()).optional(),
});

export const nudgeResponseSchema = z.object({
  nudge: z.string().min(10, 'Nudge must be at least 10 characters').max(1000, 'Nudge too long'),
  timestamp: z.string().datetime(),
  requestId: z.string().uuid(),
});

export type ValidatedNudgeRequest = z.infer<typeof nudgeRequestSchema>;
export type ValidatedNudgeResponse = z.infer<typeof nudgeResponseSchema>; 