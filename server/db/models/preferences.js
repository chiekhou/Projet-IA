const {
    Model
  } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class Preferences extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {

      }
    }
    Preferences.init({
        id_preference: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
      allergies: DataTypes.STRING,
      medicalConditions: DataTypes.STRING,
      regimeAlimentaire: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Preferences',
    });
    return Preferences;
  };
  
  