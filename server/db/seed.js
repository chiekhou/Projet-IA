const { Users,Recipes,Ingredients ,Quantite} = require('./models');
const bcrypt = require('bcrypt');
const generateUser = require('./user.fakers'); // Remplacez le chemin correct
const generateRecipe = require('./recipes.faker');
const generateIngredient = require('./ingredients.faker')
const generateQuantite = require('./quantite.fake')

async function seedUsers() {
  try {
    // Insérer plusieurs utilisateurs fictifs
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
      // Insérer plusieurs utilisateurs fictifs
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



// Appel de la fonction pour insérer les données de test
seedUsers();

seedRecipes()

seedIngredients()

seedQuantite()
