// Test OpenAI API Key validity
// Run with: node test-api-key.js

require('dotenv').config();
const fetch = require('node-fetch');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function testAPIKey() {
  console.log('🧪 Testing OpenAI API Key...');
  
  if (!OPENAI_API_KEY) {
    console.error('❌ No API key found in .env file');
    return;
  }
  
  console.log('🔑 API Key found:', OPENAI_API_KEY.substring(0, 20) + '...');
  
  try {
    // Test 1: Check API key with models endpoint
    console.log('\n📋 Test 1: Checking API access...');
    const modelsResponse = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (modelsResponse.ok) {
      console.log('✅ API Key is valid and has access');
    } else {
      console.log('❌ API Key issue:', modelsResponse.status, modelsResponse.statusText);
      const errorText = await modelsResponse.text();
      console.log('Error details:', errorText);
      return;
    }
    
    // Test 2: Check Realtime API access
    console.log('\n🎙️ Test 2: Checking Realtime API access...');
    const realtimeResponse = await fetch('https://api.openai.com/v1/realtime/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-realtime-preview-2024-12-17',
        voice: 'alloy'
      })
    });
    
    if (realtimeResponse.ok) {
      console.log('✅ Realtime API access confirmed');
      const sessionData = await realtimeResponse.json();
      console.log('📋 Session created:', sessionData.id);
    } else {
      console.log('❌ Realtime API issue:', realtimeResponse.status, realtimeResponse.statusText);
      const errorText = await realtimeResponse.text();
      console.log('Error details:', errorText);
    }
    
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
}

testAPIKey();
