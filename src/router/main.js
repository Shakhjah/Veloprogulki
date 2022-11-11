const express = require('express');
const session = require('express-session');
const router = require('express').Router();
const Main = require('../views/Main');
const renderTemplate = require('../lib/renderTemplate');
const { BikeTrack, User } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const allMap = await BikeTrack.findAll({
      include: {
        model: User,
        raw: true,
      },
    });
    const dataMap = allMap.map((el) => el.dataValues);
    renderTemplate(Main, { dataMap }, res);
  } catch (error) {
    console.log('Ошибка при получении Карт');
  }
});

module.exports = router;
