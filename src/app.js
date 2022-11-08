require('dotenv').config(); // реквайрим .env

// Внешние импорты
const path = require('path'); // подключаем css
const express = require('express');
const ws = require('ws')
const morgan = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session); // хранилище для сессий

// Внутренние импорты
const { sequelize } = require('../db/models');
const renderTemplate = require('../src/lib/RenderTemplate');

const { SESSION_SECRET } = process.env;
const PORT = process.env.PORT || 3000;

const httpServer = app.listen(PORT, async () => {
    try {
      await sequelize.authenticate();
      console.log('Соединение с базой установлено!');
    } catch (err) {
      console.log(err, 'Error!');
    }
    console.log(`Сервер поднят на ${PORT} порту!`);
  });