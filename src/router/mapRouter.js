const express = require('express');
const session = require('express-session');
const router = require('express').Router();
const Map = require('../views/demoMap');
const renderTemplate = require('../lib/renderTemplate');

router.get('/', (req, res) => {
  // const userName = req.session.username;
  renderTemplate(Map, null, res);
});

module.exports = router;
