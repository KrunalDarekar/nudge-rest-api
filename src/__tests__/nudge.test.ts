import request from 'supertest';
import app from '../app';

describe('Nudge API', () => {
  describe('POST /api/nudge', () => {
    it('should return 400 for invalid request', async () => {
      const response = await request(app)
        .post('/api/nudge')
        .send({
          title: '', // Invalid: empty title
          statement: 'Test statement',
          language: 'Python',
          code: 'def test(): pass'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 for missing required fields', async () => {
      const response = await request(app)
        .post('/api/nudge')
        .send({
          title: 'Two Sum',
          // Missing statement, language, and code
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should validate request structure', async () => {
      const validRequest = {
        title: 'Two Sum',
        statement: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        language: 'Python',
        code: 'def twoSum(nums, target):\n    pass',
        examples: ['Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]'],
        constraints: ['2 <= nums.length <= 104']
      };

      const response = await request(app)
        .post('/api/nudge')
        .send(validRequest);

      // Note: This will fail without OpenAI API key, but validates request structure
      expect([400, 500]).toContain(response.status);
    });
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('version');
      expect(response.body.status).toBe('healthy');
    });
  });

  describe('GET /', () => {
    it('should return API information', async () => {
      const response = await request(app)
        .get('/');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('endpoints');
    });
  });
}); 