const express = require('express')
const dotenv = require("dotenv");
dotenv.config();
const app = express()
const port = 5000

const db = require('./db/models/index');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

db.sequelize.sync( {force:true}).then(() => {
  console.log('synced db.');
}).catch((err) => {
  console.log('Failed to sync db: ' + err.message);
})
