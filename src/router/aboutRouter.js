const express = require('express');
const session = require('express-session');
const router = require('express').Router();
const About = require('../views/About');
const renderTemplate = require('../lib/renderTemplate');
const { BikeTrack, User } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const mapAbout = await BikeTrack.findOne({
      where: {
        id: req.query.id,
      },
      include: {
        model: User,
      },
    });
    const data = mapAbout.dataValues;
    const userName = mapAbout.User.dataValues.name;
    const userSessionId = req.session.userid;
    renderTemplate(About, { data, userName, userSessionId }, res);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
