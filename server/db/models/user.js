const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Recipes, { foreignKey: 'userId' });
      Users.hasMany(models.Commentaires, { foreignKey: 'userId' });
      Users.hasMany(models.Evaluation, { foreignKey: 'userId' });
      Users.hasMany(models.Recommandations, { foreignKey: 'userId' });
      Users.hasOne(models.Recommandations, { foreignKey: 'userId' });
    }
  }
  Users.init({
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};

