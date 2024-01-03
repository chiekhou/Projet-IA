const router = require('express').Router();
const authMiddleware = require('../../middleware');
const { Recipes, Ratings, SaveRecipes } = require('../../db/models');
const { Op } = require('sequelize');

// Ajouter une note et un avis à une recette
router.post('/', authMiddleware, async (req, res) => {
  const { id_user } = req.user;
  const { id_recipe, rating, review } = req.body;

  try {
    // Vérifier si l'utilisateur a déjà noté cette recette
    const existingRating = await Ratings.findOne({
      where: {
        userId: id_user,
        recipeId: id_recipe,
      },
    });

    if (existingRating) {
      res.status(400).json({ error: 'Vous avez déjà noté cette recette.' });
      return;
    }

    // Créer une nouvelle note et un avis
    const newRating = await Ratings.create({
      userId: id_user,
      recipeId: id_recipe,
      rating,
      review,
    });

    res.json(newRating);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la note et de l\'avis.' });
  }
});

// Obtenir toutes les notes et avis d'une recette
router.get('/:id_recipe', async (req, res) => {
  const { id_recipe } = req.params;

  try {
    const ratings = await Ratings.findAll({
      where: {
        recipeId: id_recipe,
      },
    });

    res.json(ratings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des notes et avis.' });
  }
});

// Obtenir la moyenne des notes d'une recette
router.get('/average/:id_recipe', async (req, res) => {
  const { id_recipe } = req.params;

  try {
    const averageRating = await Ratings.findAll({
      attributes: [[Ratings.sequelize.fn('avg', Ratings.sequelize.col('rating')), 'averageRating']],
      where: {
        recipeId: id_recipe,
      },
    });

    res.json(averageRating);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération de la moyenne des notes.' });
  }
});

module.exports = router;
