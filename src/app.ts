import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import nudgeRoutes from './routes/nudge';
import healthRoutes from './routes/health';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();

app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

const allowedOrigins = [
  'https://leetcode.com',
  'http://localhost:3000'
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // allow requests with no origin (like curl or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // if using cookies / auth headers
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '30000'), // 30 seconds
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5'), // limit each IP to 5 requests per windowMs
  message: {
    error: 'Rate Limit Exceeded',
    message: 'Too many requests, please try again later.',
    timestamp: new Date().toISOString(),
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api', nudgeRoutes);
app.use('/api', healthRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Leet-Nudge API',
    version: process.env.npm_package_version || '1.0.0',
    endpoints: {
      health: '/api/health',
      nudge: '/api/nudge',
    },
  });
});

// 404 handler
app.use(notFoundHandler);

// Error handling middleware
app.use(errorHandler);

export default app; 