const router = require("express").Router();
const bcrypt = require("bcrypt");
const { Users } = require("../../db/models");
const jsonwebtoken = require('jsonwebtoken');
const {key , keyPub}= require("../../keys");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email: email } });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jsonwebtoken.sign({},key , {
            subject: user.id_user.toString(),
            expiresIn: 3600 * 24 * 30 * 6,
            algorithm : 'RS256'
        });
        res.cookie('token',token, {httpOnly: true,secure: false})
        res.json(user)
      } else {
        res.status(400).json("Mauvai email/password");
      }
    } else {
      res.status(400).json("Mauvai email/password");
    }
  } catch (e) {
    console.log(e)
    res.status(400).json("Mauvais email/password");
  }
});

router.get('/current', async (req, res) => {
  const { token } = req.cookies;
  try {
    console.log('Token:', token);

    if (token) {
      const decodedToken = jsonwebtoken.verify(token, keyPub);
   

      const currentUser = await Users.findByPk(decodedToken.sub, { attributes: { exclude: ['password'] } });
    

      if (currentUser) {
        return res.json(currentUser);
      } else {
        return res.json(null);
      }
    } else {
      return res.json(null);
    }
  } catch (e) {
    console.log('Error:', e);
    return res.json(null);
  }
});

router.delete('/', (req, res) => {
  res.clearCookie('token');
  res.end();
});





module.exports = router;
