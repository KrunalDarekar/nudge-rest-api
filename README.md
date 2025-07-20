# Leet-Nudge REST API

A TypeScript REST API that provides AI-powered nudges for LeetCode problems. This API is designed to work with the Leet-Nudge browser extension, offering helpful hints that guide users toward solutions without revealing the complete answer.

## 🚀 Features

- **AI-Powered Nudges**: Generate contextual hints using OpenAI's GPT models
- **Input Validation**: Robust validation using Zod schemas
- **Rate Limiting**: Built-in rate limiting to prevent abuse
- **Security**: Helmet.js for security headers and CORS protection
- **Error Handling**: Comprehensive error handling and logging
- **Health Monitoring**: Health check endpoint for monitoring

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nudge-rest-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### 1. Health Check
**GET** `/api/health`

Returns the health status of the API.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0"
}
```

#### 2. Generate Nudge
**POST** `/api/nudge`

Generates an AI-powered nudge based on the LeetCode problem context.

**Request Body:**
```json
{
  "title": "Two Sum",
  "statement": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  "language": "Python",
  "code": "def twoSum(nums, target):\n    # Your code here\n    pass",
  "examples": [
    "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]",
    "Input: nums = [3,2,4], target = 6\nOutput: [1,2]"
  ],
  "constraints": [
    "2 <= nums.length <= 104",
    "-109 <= nums[i] <= 109",
    "-109 <= target <= 109"
  ]
}
```

**Response:**
```json
{
  "nudge": "Have you considered using a hash map to store complements? This could help you find pairs in O(n) time.",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error Type",
  "message": "Detailed error message",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `OPENAI_API_KEY` | OpenAI API key | Required |
| `OPENAI_MODEL` | OpenAI model to use | `gpt-4` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window (ms) | `30000` |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `5` |
| `CORS_ORIGIN` | CORS origin | `*` |

## 🧪 Testing

Run tests:
```bash
npm test
```

Run linting:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint:fix
```

## 📁 Project Structure

```
src/
├── types/           # TypeScript interfaces and types
├── validation/      # Zod validation schemas
├── services/        # Business logic (AI service)
├── middleware/      # Express middleware
├── routes/          # API routes
├── app.ts          # Express application setup
└── index.ts        # Server entry point
```

## 🔒 Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing protection
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Zod schema validation
- **Error Handling**: Secure error responses

## 🚀 Deployment

### Docker (Recommended)

1. **Build the image**
   ```bash
   docker build -t leet-nudge-api .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 --env-file .env leet-nudge-api
   ```

### Manual Deployment

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Start the server**
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team. 