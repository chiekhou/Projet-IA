const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersRecipes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        UsersRecipes.belongsTo(models.Users, { foreignKey: 'userId' });
        UsersRecipes.belongsTo(models.Recipes, { foreignKey: 'recipeId' });
    }
  }
  UsersRecipes.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
  }, {
    sequelize,
    modelName: 'UsersRecipes',
  });
  return UsersRecipes;
};

