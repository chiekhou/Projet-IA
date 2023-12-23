const { fa } = require('faker/lib/locales');
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
        Recipes.hasMany(models.Quantite, { foreignKey: 'recipeId' });
      }
    }
    Recipes.init({
        id_recipe: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
      recipeName: DataTypes.STRING,
      description: DataTypes.TEXT,
      difficulte :{ 
        type: DataTypes.INTEGER,
        defaultValue : 0
      },
      liked :{ 
        type: DataTypes.BOOLEAN,
        defaultValue : false,
      }
    }, {
      sequelize,
      modelName: 'Recipes',
    });
    return Recipes;
  };
  
  