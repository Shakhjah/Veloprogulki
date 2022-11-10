const express = require('express');
const session = require('express-session');
const router = require('express').Router();
const About = require('../views/About');
const renderTemplate = require('../lib/renderTemplate');
const { BikeTrack, User } = require('../../db/models');

router.get('/:id', async (req, res) => {
  const usName = 'QWEr';
  console.log('ABOUT--ROUT------', req.params);
  renderTemplate(About, { usName }, res);

  // try {
  //   const mapAbout = await BikeTrack.findOne({
  //     where: {
  //       id: req.query.id,
  //     },
  //     include: {
  //       model: User,
  //     },
  //   });
  //   console.log('FROM ABOUT DB -----', mapAbout.dataValues);
  //   renderTemplate(About, {}, res);
  // } catch (error) {
  //   console.log(error);
  // }
});

module.exports = router;
