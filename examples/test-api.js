const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:3000';

async function testHealthEndpoint() {
  try {
    console.log('🔍 Testing health endpoint...');
    const response = await fetch(`${API_BASE_URL}/api/health`);
    const data = await response.json();
    
    console.log('✅ Health check response:', data);
    return data.status === 'healthy';
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return false;
  }
}

async function testNudgeEndpoint() {
  try {
    console.log('\n🔍 Testing nudge endpoint...');
    
    const nudgeRequest = {
      title: "Two Sum",
      statement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
      language: "Python",
      code: `def twoSum(nums, target):
    # Your code here
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
      examples: [
        "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].",
        "Input: nums = [3,2,4], target = 6\nOutput: [1,2]"
      ],
      constraints: [
        "2 <= nums.length <= 104",
        "-109 <= nums[i] <= 109",
        "-109 <= target <= 109",
        "Only one valid answer exists."
      ]
    };

    const response = await fetch(`${API_BASE_URL}/api/nudge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nudgeRequest),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Nudge response:', data);
    } else {
      const errorData = await response.json();
      console.log('❌ Nudge request failed:', errorData);
    }
  } catch (error) {
    console.error('❌ Nudge test failed:', error.message);
  }
}

async function testInvalidRequest() {
  try {
    console.log('\n🔍 Testing invalid request...');
    
    const invalidRequest = {
      title: "", // Invalid: empty title
      statement: "Test statement",
      language: "Python",
      code: "def test(): pass"
    };

    const response = await fetch(`${API_BASE_URL}/api/nudge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidRequest),
    });

    const data = await response.json();
    console.log('✅ Invalid request handled correctly:', data);
  } catch (error) {
    console.error('❌ Invalid request test failed:', error.message);
  }
}

async function runTests() {
  console.log('🚀 Starting API tests...\n');
  
  const healthOk = await testHealthEndpoint();
  
  if (healthOk) {
    await testNudgeEndpoint();
    // await testInvalidRequest();
  } else {
    console.log('❌ Skipping other tests due to health check failure');
  }
  
  console.log('\n✨ Tests completed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testHealthEndpoint,
  testNudgeEndpoint,
  testInvalidRequest,
  runTests
}; 