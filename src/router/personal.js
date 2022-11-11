const express = require('express');
const session = require('express-session');
const router = require('express').Router();
const Personal = require('../views/Personal');
const renderTemplate = require('../lib/renderTemplate');
const { BikeTrack } = require('../../db/models');


router.get('/', async (req, res) => {
  const userid = req.session.userid;
  const findCard = await BikeTrack.findAll({ where: { userId: userid }})
  // console.log(findCard);
  renderTemplate(Personal, { findCard }, res);
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
