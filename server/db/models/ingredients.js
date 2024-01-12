const {
    Model
  } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class Ingredients extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        Ingredients.hasMany(models.Quantite, { foreignKey: 'ingredientId' });
      }
    }
    Ingredients.init({
        id_ingredient: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
      ingredientName: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Ingredients',
    });
    return Ingredients;
  };
  
  