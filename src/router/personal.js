const express = require('express');
const session = require('express-session');
const router = require('express').Router();
const Personal = require('../views/Personal');
const renderTemplate = require('../lib/renderTemplate');
const { BikeTrack, User } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const allMap = await BikeTrack.findAll({
      where: {
        userId: req.session.userid,
      },
      include: {
        model: User,
        raw: true,
      },

    });
    const dataMap = allMap.map((el) => el.dataValues);
    // console.log('сюда смотри ===>>>>', dataMap[0]);

    renderTemplate(Personal, { dataMap }, res);
  } catch (error) {
    console.log(error);
  }
});

router.post('/saveMap', (req, res) => {
  console.log('IN SAVEMAP', req.body);
  // const userName = req.session.username;
  res.send('OK');
});

module.exports = router;
