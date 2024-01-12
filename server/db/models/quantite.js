const {
    Model
  } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class Quantite extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
      }
    }
    Quantite.init({
        id_quantite: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
      type: DataTypes.STRING,
      quantity: DataTypes.INTEGER,

    }, {
      sequelize,
      modelName: 'Quantite',
    });
    return Quantite;
  };
  
  