const express = require('express')
const cookie = require('cookie-parser')
const dotenv = require("dotenv");
const fetch = require('node-fetch');
dotenv.config();

const app = express()
const routes = require('./routes')

app.use(cookie())
app.use(express.json())
const port = 5000

const db = require('./db/models/index');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/chatbot', async (req, res) => {
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
        max_tokens: 50,  // Limite la longueur de la réponse générée
      }),
    });

    const responseData = await response.json();
    res.json({ response: responseData.choices[0].text });
  } catch (error) {
    console.error('Erreur lors de la requête à l\'API GPT-3.5:', error);
    res.status(500).json({ error: 'Erreur lors de la requête à l\'API GPT-3.5' });
  }
});

app.use(routes)
app.use('*', (req,res) => {
  res.status(404).end()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

db.sequelize.sync({force:true}).then(() => {
  console.log('synced db.');
}).catch((err) => {
  console.log('Failed to sync db: ' + err.message);
})

