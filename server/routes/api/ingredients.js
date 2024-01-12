const router = require('express').Router();
const { Sequelize } = require("sequelize");
const {Ingredients} = require('../../db/models')
const OpenAI = require("openai");

const openai = new OpenAI();


router.post('/', async (req, res) => {
  const { ingredientName} = req.body;

  try {

    const newIngredient = await Ingredients.create({
        ingredientName,
    });

    res.json(newIngredient);
  } catch (err) {
    console.error(err);
  }
});

// router.post('/search', async (req, res) => {
//   const {ingredientName } = req.body;

//   try {
//     // 1. Récupération des données depuis la base de données
//     const ingredients = await Ingredients.findAll({
//       where: {
//         ingredientName: {
//           [Sequelize.Op.iLike]: `%${ingredientName}%`,
//         },
//       },
//     });

//        // Vérifier si aucune recette n'a été trouvée
//       //  if (recipes.length === 0) {
//         // Aucune recette trouvée, renvoyer une réponse vide
//       //   res.json({ ideas: [] });
//       //   return;
//       // }

//     // 2. Formatage des données pour l'entrée de ChatGPT
//     const chatGPTInput = ingredients.map((ingredient) => ({
//       role: 'user',
//       content: `Donne moi des détails sur cette ingrédient et quelle sont les recettes que peut on faire avec : ${ingredient.ingredientName}`

//     }));

//     // 3. Appel à ChatGPT
//     const completions = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       temperature: 0.8,
//       messages: [
//         {
//           role: 'system',
//           content:
//             "Tu es un chef cuisinier et ton but est de récupérer un texte de recherche et de répondre à ce que recherche l'utilisateur autour de cette ingrédient et de renvoyer des recettes dés qu'ils contiennent le mot ou les mots , ou des questions dans le texte récuperer. À partir de maintenant, dès que tu recevras une recette ou un ingrédient, tu renverras du texte dans lequel tu donneras les détails de cette recette ou de l'ingrédient , tu n'as pas besoin de dire bonjour ni de faire des phrases de courtoisies . ",
//         },
//         ...chatGPTInput,
//       ],
//     });


//     // 4. Traitement des réponses de ChatGPT
//     const ideas = completions.choices.map((choice) => choice.message.content);

  

//     res.json({ ideas });
//   } catch (error) {
//     console.error('Erreur lors de la recherche dans la base de données :', error);
//     res.status(500).json({ error: 'Erreur lors de la recherche dans la base de données' });
//   }});



module.exports = router;