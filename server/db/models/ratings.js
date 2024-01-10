const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ratings extends Model {
    static associate(models) {
      Ratings.belongsTo(models.Recipes, { foreignKey: 'recipeId' });
    }
  }

  Ratings.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Ratings',
  });

  return Ratings;
};
