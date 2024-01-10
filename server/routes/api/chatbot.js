const router = require('express').Router();
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const  authenticateUser = require('../../middleware'); 
dotenv.config();

// Endpoint pour gérer les messages vers le chatbot
router.post('/messages',authenticateUser, async (req, res) => {
  try {
    const { input } = req.body;

    const apiKey = process.env.OPENAI_API_KEY || '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';
    const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

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
    res.json({ response: responseData.choices[0].text });
  } catch (error) {
    console.error('Erreur lors de la requête à l\'API GPT-3.5:', error);
    res.status(500).json({ error: 'Erreur lors de la requête à l\'API GPT-3.5' });
  }
});



module.exports = router;
