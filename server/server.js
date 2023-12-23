const express = require('express')
const cookie = require('cookie-parser')
const dotenv = require("dotenv");
dotenv.config();
const app = express()
const routes = require('./routes')
app.use(cookie())
app.use(express.json())
const port = 5000

const db = require('./db/models/index');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(routes)
app.use('*', (req,res) => {
  res.status(404).end()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

db.sequelize.sync().then(() => {
  console.log('synced db.');
}).catch((err) => {
  console.log('Failed to sync db: ' + err.message);
})

