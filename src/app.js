require('dotenv').config(); // реквайрим .env

// Внешние импорты
const express = require('express');

const app = express();
const path = require('path'); // подключаем css
const morgan = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session); // хранилище для сессий

// Внутренние импорты
const { sequelize } = require('../db/models');
const renderTemplate = require('./lib/RenderTemplate');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public/')));

// Добавляем ручки из папки lib

const firstPage = require('./router/firstPage');
const auth = require('./router/auth');

app.use('/', firstPage);
app.use('/auth', auth);

const { SESSION_SECRET } = process.env;
const { PORT } = process.env;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой установлено!');
  } catch (err) {
    console.log(err, 'Error!');
  }
  console.log(`Сервер поднят на ${PORT} порту!`);
});
