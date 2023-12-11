const {
    Model
  } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class Recipes extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        Recipes.hasMany(models.Commentaires, { foreignKey: 'recipeId' });
        Recipes.hasMany(models.Evaluation, { foreignKey: 'recipeId' });
        Recipes.hasMany(models.Recommandations, { foreignKey: 'recipeId' });
      }
    }
    Recipes.init({
        id_recipe: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
      recipeName: DataTypes.STRING,
      description: DataTypes.STRING,
      instructionCuisson: DataTypes.STRING,
      ingredients: DataTypes.STRING,
      timePreparation: DataTypes.INTEGER,
      difficulte : DataTypes.STRING,
      note : DataTypes.INTEGER,
    }, {
      sequelize,
      modelName: 'Recipes',
    });
    return Recipes;
  };
  
  