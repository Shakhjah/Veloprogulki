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
    function countValidate(arr) {
      if (arr.length === 1) return 'маршрут';
      if (arr.length > 1 && arr.length < 5) return 'маршрута';
      if (arr.length === 0 || arr.length > 4) return 'маршрутов';
    }
    const text = countValidate(dataMap);
    console.log('▶ ⇛ text', text);
    renderTemplate(Personal, { dataMap, text }, res);
  } catch (error) {
    console.log(error);
  }
});

router.post('/saveMap', (req, res) => {
  // console.log('IN SAVEMAP', req.body);
  // const userName = req.session.username;
  res.send('OK');
});

router.delete('/delete', async (req, res) => {
  try {
    await BikeTrack.findByPk(req.body.id, { raw: true });
    await BikeTrack.destroy({ where: { id: req.body.id } });
    res.json({ re: 'запись удалена' });
  } catch (error) {
    console.log('errdelete', error);
  }
});

module.exports = router;
