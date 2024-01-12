const { Users,Recipes,Ingredients ,Quantite, Ratings} = require('./models');
const bcrypt = require('bcrypt');
const generateUser = require('./user.fakers'); // Remplacez le chemin correct
const generateRecipe = require('./recipes.faker');
const generateIngredient = require('./ingredients.faker')
const generateQuantite = require('./quantite.fake')

async function seedUsers() {
  try {
    const numberOfUsers = 10;

    for (let i = 0; i < numberOfUsers; i++) {
      const user = generateUser();

      const hashedPassword = await bcrypt.hash(user.password, 8);

      await Users.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword,
      });
    }

    console.log(`${numberOfUsers} utilisateurs fictifs ont été insérés avec succès.`);
  } catch (error) {
    console.error('Erreur lors de l\'insertion des données de test :', error);
  }
}

async function seedRecipes() {
  try {
      // Insérer plusieurs recettes fictifs
      const numberOfRecettes = 10; 

      for (let i = 0; i < numberOfRecettes; i++) {
      const recipe = generateRecipe();

    await Recipes.create({
        recipeName: recipe.recipeName,
        description: recipe.description,
        difficulte: recipe.difficulte,
    });

  }
    console.log(`${numberOfRecettes} recipes fictifs ont été insérés avec succès.`);
  } catch (error) {
    console.error('Erreur lors de l\'insertion des données de test :', error);
  }
}

async function seedIngredients() {
  try {
      // Insérer plusieurs utilisateurs fictifs
      const numberOfIngredients = 10; 

      for (let i = 0; i < numberOfIngredients ; i++) {
      const ingredient = generateIngredient();

   await Ingredients.create({
      ingredientName: ingredient.ingredientName
  });

  }
    console.log(`${numberOfIngredients} ingredients fictifs ont été insérés avec succès.`);
  } catch (error) {
    console.error('Erreur lors de l\'insertion des données de test :', error);
  }
}

async function seedQuantite() {
  try {
      // Insérer plusieurs utilisateurs fictifs
      const numberOfQuantite = 50; //

      for (let i = 0; i < numberOfQuantite ; i++) {
      const quantite = generateQuantite();

   await Quantite.create({
      type: quantite.type,
      quantity : quantite.quantity
  });

  }
    console.log(`${ numberOfQuantite} quantite fictifs ont été insérés avec succès.`);
  } catch (error) {
    console.error('Erreur lors de l\'insertion des données de test :', error);
  }
}
// Fonction pour générer des notes aléatoires
async function seedRandomRatings() {
  try {
    const recipes = await Recipes.findAll();
    const users = await Users.findAll();

    // Insérer plusieurs notes aléatoires
    const numberOfRatings = 50;

    for (let i = 0; i < numberOfRatings; i++) {
      const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
      const randomUser = users[Math.floor(Math.random() * users.length)];

      await Ratings.create({
        userId: randomUser.id, // Utilisez le userId du user fictif
        recipeId: randomRecipe.id_recipe,
        rating: Math.floor(Math.random() * 5) + 1,
        review: 'Avis aléatoire',
      });
    }

    console.log(`${numberOfRatings} notes aléatoires ont été insérées avec succès.`);
  } catch (error) {
    console.error('Erreur lors de l\'insertion des notes aléatoires :', error);
  }
}

// Appel de la fonction pour insérer les données de test
seedUsers();
seedRecipes();
seedIngredients();
seedQuantite();
seedRandomRatings(); // Ajout de l'appel à la nouvelle fonction
