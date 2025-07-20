export interface NudgeRequest {
  title: string;
  statement: string;
  language: string;
  code: string;
  examples?: string[];
  constraints?: string[];
}

export interface NudgeResponse {
  nudge: string;
  timestamp: string;
  requestId: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  timestamp: string;
}

export interface HealthResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  version: string;
}

export interface RateLimitInfo {
  remaining: number;
  resetTime: string;
} 