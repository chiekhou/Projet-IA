const router = require('express').Router();
const { Recipes } = require('../../db/models');

// Endpoint pour obtenir des suggestions d'accompagnements
router.post('/suggestions', async (req, res) => {
  try {
    const { recipeId } = req.body;

    // Récupérer la recette à partir de recipeId
    const recipe = await Recipes.findByPk(recipeId);

    // Envoyer les suggestions en réponse
    // res.json({ suggestions: /* Vos suggestions ici */ });
  } catch (error) {
    console.error('Erreur lors de la récupération des suggestions d\'accompagnements :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des suggestions d\'accompagnements' });
  }
});

module.exports = router;
