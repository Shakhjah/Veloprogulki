const express = require('express');
const session = require('express-session');
const router = require('express').Router();
const Personal = require('../views/Personal');
const renderTemplate = require('../lib/renderTemplate');

router.get('/', (req, res) => {
  // const userName = req.session.username;
  renderTemplate(Personal, null, res);
});

router.post('/saveMap', (req, res) => {
  console.log('IN SAVEMAP', req.body);
  // const userName = req.session.username;
  res.send('OK');
});

module.exports = router;
