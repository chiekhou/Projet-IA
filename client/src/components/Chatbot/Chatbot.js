import React, { useState } from 'react';
import styles from "../Chatbot/Chatbot.module.scss";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const apiKey = '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';
      const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'Vous êtes un assistant utile.' },
            { role: 'user', content: input },
          ],
          max_tokens: 50,  // Limite la longueur de la réponse générée
        }),
      });
  
      const responseData = await response.json();
  
      if (responseData && responseData.choices && responseData.choices.length > 0) {
        setResponse(responseData.choices[0].message.content);
      } else {
        setResponse('Aucune réponse disponible.');
      }
  
    } catch (error) {
      console.error('Erreur lors de la requête à l\'API GPT-3.5:', error);
    }
  };
  

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Posez une question..."
      />
      <button onClick={handleSendMessage}>Envoyer</button>
      <div>
        {response && (
          <div>
            <strong>Réponse :</strong>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
