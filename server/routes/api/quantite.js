const router = require('express').Router();
const {Quantite} = require('../../db/models')

router.post('/', async (req, res) => {
  const {type ,quantity} = req.body;

  try {

    const newQuantite = await Quantite.create({
        type,
        quantity,
    });

    res.json(newQuantite);
  } catch (err) {
    console.error(err);
  }
});


module.exports = router;