const path = require('path');
const express = require('express');
const session = require('express-session');
// const helpers = require('./utils/helpers');
// const exphbs = require('express-handlebars');

const routes = require('./controllers');
const sequelize = require('./config/connection');
const session = require('express-session')

const app = express();

const PORT = 3001;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
