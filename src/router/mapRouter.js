const express = require('express');
const session = require('express-session');
const router = require('express').Router();
const Map = require('../views/demoMap');
const renderTemplate = require('../lib/renderTemplate');

router.get('/', (req, res) => {
  // const userName = req.session.username;
  renderTemplate(Map, null, res);
});
router.post('/', (req, res) => {
  // const userName = req.session.username;
  res.send('OK MAP ADD');
});

module.exports = router;
