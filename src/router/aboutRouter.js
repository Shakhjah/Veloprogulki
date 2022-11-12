const express = require('express');
const session = require('express-session');
const router = require('express').Router();
const About = require('../views/About');
const renderTemplate = require('../lib/renderTemplate');
const { BikeTrack, User } = require('../../db/models');
const qrGenerate = require('../lib/qrGenerate');

router.get('/', async (req, res) => {
  try {
    const mapAbout = await BikeTrack.findOne({
      where: { id: req.query.id },
      include: { model: User },
    });

    const data = mapAbout.dataValues;
    // const userName = mapAbout.User.dataValues.name;
    const userSessionId = req.session.userid;
    const linkFrom = (JSON.parse(data.mapFrom)).join(',');
    const linkTo = (JSON.parse(data.mapTo)).join(',');
    const linkQr = `https://yandex.ru/maps/?z=7&l=map&rtext=${linkFrom}~${linkTo}&rtn=0&rtt=bc&rtm=atm&source=jsapi_2_1_79&from=api-maps&utm_source=api-maps`;
    const codeJson = await qrGenerate(linkQr);
    renderTemplate(About, {
      data, userSessionId, codeJson, linkQr,
    }, res);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
