const {
    Model
  } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class Commentaires extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
        Commentaires.belongsTo(models.CommentaireUserRecipes, { foreignKey: 'userRecipeId' });
      }
    }
    Commentaires.init({
    id_commentaire: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
      contenue: DataTypes.TEXT,
      note : DataTypes.INTEGER,
      date: DataTypes.DATE,
    }, {
      sequelize,
      modelName: 'Commentaires',
    });
    return Commentaires;
  };
  
  