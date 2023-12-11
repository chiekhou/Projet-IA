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
      }
    }
    Commentaires.init({
    id_commentaire: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
      contenue: DataTypes.STRING,
      date: DataTypes.DATE,
      difficulte : DataTypes.STRING,
      note : DataTypes.INTEGER,
    }, {
      sequelize,
      modelName: 'Commentaires',
    });
    return Commentaires;
  };
  
  