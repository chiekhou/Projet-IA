const fs = require('fs');

module.exports = {
  key: fs.readFileSync(`${__dirname}/jwtRS256.pem`),
  keyPub: fs.readFileSync(`${__dirname}/jwtRS256.pem.pub`),
};