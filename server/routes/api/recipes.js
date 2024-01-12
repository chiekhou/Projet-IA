const router = require('express').Router();
const authMiddleware = require('../../middleware');
const { Sequelize } = require("sequelize");
const {Recipes , UsersRecipes} = require('../../db/models')
const OpenAI = require("openai");
const openai = new OpenAI();


// Créer une recette 
router.post('/', async (req, res) => {
  const { recipeName, description, difficulte, liked} = req.body;

  try {

    const newRecipe = await Recipes.create({
        recipeName,
        description,
        difficulte,
        liked
    });

    res.json(newRecipe);
  } catch (err) {
    console.error(err);
  }
});


// Recuperer toute les recettes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipes.findAll();
    res.json(recipes);
  
  } catch (err) {
    console.error(err);
  }
});



router.patch('/:id_recipe',authMiddleware, async (req, res) => {

  const { id_user } = req.user;
  const {recipeName, description, difficulte, liked} = req.body
  const { id_recipe } = req.params;

  try {
 const recipe = await Recipes.findByPk(id_recipe);

    if(!recipe){
      res.status(404).json({error: "Recette non trouvé"});
      return;
    }
     // Check if the user has already liked the recipe
  const existingLike = await UsersRecipes.findOne({
    where: {
      userId: id_user,
      recipeId: id_recipe,
    },
  });

  if (liked && !existingLike) {
    // If the user liked the recipe and there's no existing record, create one
    await UsersRecipes.create({
      userId : id_user,
      recipeId: id_recipe,
    });
  } else if (!liked && existingLike) {
    // If the user unliked the recipe and there's an existing record, delete it
    await existingLike.destroy();
  }


    recipe.recipeName = recipeName;
    recipe.description = description;
    recipe.difficulte = difficulte;
    recipe.liked = liked;

    await recipe.save()

    res.json(recipe)
  
  } catch (err) {
    console.error(err);
    res.status(500).json({ error:' Erreur lors de la modification de la recette'})
  }
});


// Recuperer les recettes favorites de l'user
router.get('/likeUser', authMiddleware, async (req, res) => {

  const { id_user } = req.user;

  try {
  const userLikeFav = await UsersRecipes.findAll({
    where: {
      userId: id_user,
    },
  });
    res.json( userLikeFav)
  
  } catch (err) {
    console.error(err);
    res.status(500).json({ error:' Erreur lors de la récupération de la recette favoris'})
  }
});



// Recuperer une recette par son id
router.get('/:id', async (req, res) => {

  const { id } = req.params

  try {
    const recipe = await Recipes.findByPk(id);

    if(!recipe){
      res.status(404).json({error: "Recette non trouvé"});
      return;
    }

    res.json(recipe)
  
  } catch (err) {
    console.error(err);
    res.status(500).json({ error:' Erreur lors de la récupération de la recette'})
  }
});



router.post('/search', async (req, res) => {
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
      const prompt = `Bonjour je veux des idées de recettes qui correspondent à ce plat et autour de ce plat : ${recipeName}`;
  
      // 2. Appel à OpenAI GPT-3.5-turbo
      const completions = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        max_tokens: 512,
        temperature: 0.8,
        messages: [
          {
            role: 'system',
            content:
              "Tu es un moteur de recherche de recettes. À partir de maintenant tu renverras un objet JSON et uniquement un objet JSON pas de texte avant ou aprés qui aura plusieurs recettes qui contiennent les proprietés suivante : nom , description , ingredients. Ces valeurs doivent être des chaînes de caractéres en français (seules les clés sont en anglais). Tu donneras des idées de recettes qui correspondent à la recherche avec les détails de ces recettes. Pas besoin de faire des phrases de courtoisies.",
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