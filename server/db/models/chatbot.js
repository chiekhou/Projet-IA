const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chatbot extends Model {
    static associate(models) {
       
    }
  }

  Chatbot.init(
    {
      id_chatbot: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userMessage: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      chatbotResponse: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Chatbot',
    }
  );

  return Chatbot;
};
