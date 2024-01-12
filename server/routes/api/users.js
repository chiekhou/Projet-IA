const router = require('express').Router();
const bcrypt = require('bcrypt');
const {Users} = require('../../db/models')

router.post('/', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.json(newUser);
  } catch (err) {
    console.error(err);

    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json('Email déjà utilisé');
    } else {
      res.status(400).json('Une erreur s\'est produite lors de la création d\'un nouvel utilisateur');
    }
  }
});


module.exports = router;