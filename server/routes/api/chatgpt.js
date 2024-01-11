const router = require('express').Router();
const {Recipes } = require('../../db/models')
const { Sequelize } = require("sequelize");
const OpenAIApi = require("openai");
const openai = new OpenAIApi();


router.post('/chatbot', async (req, res) => {

  try {
    const { text } = req.body;

    // Pass the request text to the runCompletion function
    const completions = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      max_tokens: 512,
      temperature: 0.8,
      messages: [
        {
          role: 'system',
          content:
            "Tu es un chef étoilé au guide michelin ayant 15 années d’expérience dans le métier avec plusieurs concours culinaires gagnés à l’internationnal. À partir de maintenant, dès que tu recevras une requête, tu renverras un objet JSON et uniquement un objet JSON pas de texte avant ou après qui contiendra les propriétés : rôle, image. Ces valeurs doivent être des chaînes de caractères en français (seules les clés sont en anglais)",
        },
        {
          role: 'user',
          content: text,
        },
      ],
    });

    // Return the completion as a JSON response

    const ideas = completions.choices.map((choice) => choice.message.content);
    res.json({  ideas });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
});


router.post('/recommandations', async (req, res) => {
  const {recipeName } = req.body;

  try {
    // 1. Récupération des données depuis la base de données
    const recipes = await Recipes.findAll({
      where: {
        recipeName: {
          [Sequelize.Op.iLike]: `%${recipeName}%`,
        },
      },
    });

      // 1. Formatage de la requête pour OpenAI GPT-3.5-turbo
      const prompt = `Bonjour je voudrais plusieurs recommandations de recettes similaire à ce plat dans un objet JSON et uniquement un objet JSON pas de texte avant ni après et qui contiennent les propriétés suivantes que tu rempliras en fonction de la recette : recipeName, description, image. Ces valeurs doivent être des chaînes de caractères en français (seules les clés sont en anglais) Tu devras donner des détails en fonction de la recette et rien d'autre avant. Pas besoin d'être courtois: ${recipeName}`;
  
      // 2. Appel à OpenAI GPT-3.5-turbo
      const completions = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        max_tokens: 512,
        temperature: 0.8,
        messages: [
          {
            role: 'system',
            content:
              " À partir de maintenant, dès que tu recevras une requête, tu renverras un objet JSON et uniquement un objet JSON pas de texte avant ou après qui aura plusieurs recommandations qui contiennent les propriétés suivantes que tu rempliras en fonction de la recette : recipeName, description, image. Ces valeurs doivent être des chaînes de caractères en français (seules les clés sont en anglais). Tu devras donner des détails en fonction de la recette et rien d'autre. Pas besoin d'être courtois ",
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      });
  
      // 3. Traitement des réponses de OpenAI GPT-3.5-turbo
      const ideas = completions.choices.map((choice) => choice.message.content);
  
      res.json({ ideas });
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
      res.status(500).json({ error: 'Erreur lors de la recherche' });
    }
  });






  module.exports = router;