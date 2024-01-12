const router = require('express').Router();
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const  authenticateUser = require('../../middleware'); 
dotenv.config();

// Endpoint pour gérer les messages vers le chatbot
router.post('/messages', authenticateUser, async (req, res) => {
  try {
    const { input } = req.body;

    const apiKey = process.env.OPENAI_API_KEY || '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';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: input,
        max_tokens: 50,
      }),
    });

    const responseData = await response.json();
    console.log('API Response:', responseData);

    res.json({ response: responseData.choices[0].text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = router;
