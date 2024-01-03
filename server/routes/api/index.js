const router = require('express').Router();
const apiUsers = require('./users');
const apiAuth = require('./auth');
const apiRecipes = require('./recipes');
const apiIngredients = require('./ingredients');
const apiCommentaire = require('./commentaires');
const apiPreference = require('./preferences');
const apiQuantite = require('./quantite');
const apiRating = require('./rating'); 
const apiChatbot = require('./chatbot'); 
const apiAccompaniments = require('./accompaniments');

router.use('/users', apiUsers);
router.use('/recipes', apiRecipes);
router.use('/auth', apiAuth);
router.use('/ingredient', apiIngredients);
router.use('/quantite', apiQuantite);
router.use('/commentaires', apiCommentaire);
router.use('/preferences', apiPreference);
router.use('/rating', apiRating); 
router.use('/chatbot', apiChatbot); 
router.use('/accompaniments', apiAccompaniments);

module.exports = router;
