const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentaireUserRecipes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CommentaireUserRecipes.belongsTo(models.Users, { foreignKey: 'userId' });
      CommentaireUserRecipes.belongsTo(models.Recipes, { foreignKey: 'recipeId' });
    }
  }
  CommentaireUserRecipes.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
  }, {
    sequelize,
    modelName: 'CommentaireUserRecipes',
  });
  return CommentaireUserRecipes;
};

