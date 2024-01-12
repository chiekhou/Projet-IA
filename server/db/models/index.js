const { Sequelize } = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const user = require("./user");
const preference = require("./preferences");
const recipes = require("./recipes");
const ingredients = require("./ingredients");
const quantite = require("./quantite");
const commentaire = require("./commentaire");
const usersRecipes = require("./user-recipe");
const commentaireUsersRecipes = require("./commentaireUserRecipes");

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config, {
    logging: console.log,
  });
  console.log("Connection has been established successfully.");
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
const modelExports = [
  user,
  recipes,
  usersRecipes ,
  commentaire,
  ingredients,
  preference,
  quantite,
  commentaireUsersRecipes
];

modelExports.forEach((exportedModel) => {
  const model = exportedModel(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
