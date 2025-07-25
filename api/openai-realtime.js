export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  // GET request: Provide ephemeral token for direct client connection
  if (req.method === 'GET') {
    try {
      console.log('🔑 Creating ephemeral token for OpenAI Realtime API...');
      
      // Create ephemeral session token for client-side WebSocket connection
      const response = await fetch('https://api.openai.com/v1/realtime/sessions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o-realtime-preview-2024-12-17',
          voice: 'alloy',
          modalities: ['text', 'audio'],
          instructions: 'You are Air Assist, a helpful voice-controlled AI assistant. Respond naturally and concisely to voice commands.',
          input_audio_format: 'pcm16',
          output_audio_format: 'pcm16',
          input_audio_transcription: {
            model: 'whisper-1'
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('❌ OpenAI API error:', response.status, errorData);
        return res.status(response.status).json({ 
          error: 'Failed to create OpenAI session',
          details: errorData
        });
      }

      const sessionData = await response.json();
      console.log('✅ Ephemeral token created successfully');

      return res.status(200).json({
        success: true,
        message: 'Ephemeral token created for direct WebSocket connection',
        websocketUrl: `wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17`,
        token: sessionData.client_secret?.value,
        expires_at: sessionData.expires_at,
        instructions: 'Use the provided token for direct WebSocket connection to OpenAI'
      });

    } catch (error) {
      console.error('❌ Error creating ephemeral token:', error);
      return res.status(500).json({ 
        error: 'Failed to create ephemeral token',
        message: error.message
      });
    }
  }

  // POST request: Proxy for chat completions (fallback)
  if (req.method === 'POST') {
    try {
      const { messages, model = 'gpt-4o-mini' } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Messages array is required' });
      }

      console.log('📝 Proxying chat completion request...');
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: 1000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('❌ OpenAI Chat API error:', response.status, errorData);
        return res.status(response.status).json({ 
          error: 'OpenAI API error',
          details: errorData
        });
      }

      const data = await response.json();
      return res.status(200).json(data);

    } catch (error) {
      console.error('❌ Chat completion proxy error:', error);
      return res.status(500).json({ 
        error: 'Internal server error',
        message: error.message
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
