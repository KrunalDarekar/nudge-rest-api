import OpenAI from 'openai';
import { NudgeRequest, NudgeResponse } from '../types';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

export class AIService {
  private openai: OpenAI;
  private model: string;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }

    this.openai = new OpenAI({
      apiKey,
    });
    this.model = process.env.OPENAI_MODEL || 'gpt-4.1-mini-2025-04-14';
  }

  async generateNudge(request: NudgeRequest): Promise<NudgeResponse> {
    const prompt = this.buildPrompt(request);
    
    try {
      const response = await this.openai.responses.create({
        model: this.model,
        input: [
          {
            role: 'system',
            content: `You are an expert programming tutor helping students solve LeetCode problems. 
            Your job is to provide helpful nudges that guide students toward the solution WITHOUT giving away the answer.
            
            Guidelines:
            - Give direction, not solutions
            - Highlight relevant concepts, algorithms, or edge cases
            - Keep nudges concise (1-2 sentences)
            - Focus on the most relevant hint for their current code state
            - Don't reveal the complete solution
            - Be encouraging and educational`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      });

      const nudge = response.output_text;
      
      if (!nudge) {
        throw new Error('Failed to generate nudge from AI service');
      }

      return {
        nudge,
        timestamp: new Date().toISOString(),
        requestId: uuidv4(),
      };
    } catch (error) {
      console.error('Error generating nudge:', error);
      throw new Error('Failed to generate nudge. Please try again.');
    }
  }

  private buildPrompt(request: NudgeRequest): string {
    const { title, statement, language, code, examples, constraints } = request;
    
    let prompt = `Problem: ${title}\n\n`;
    prompt += `Statement: ${statement}\n\n`;
    
    if (examples && examples.length > 0) {
      prompt += `Examples:\n${examples.map(ex => `- ${ex}`).join('\n')}\n\n`;
    }
    
    if (constraints && constraints.length > 0) {
      prompt += `Constraints:\n${constraints.map(c => `- ${c}`).join('\n')}\n\n`;
    }
    
    prompt += `Programming Language: ${language}\n\n`;
    prompt += `Current Code:\n\`\`\`${language.toLowerCase()}\n${code}\n\`\`\`\n\n`;
    prompt += `Based on this problem and the user's current code, provide a helpful nudge that guides them toward the solution without giving it away. Focus on the most relevant concept or approach they should consider.`;
    
    return prompt;
  }
} 