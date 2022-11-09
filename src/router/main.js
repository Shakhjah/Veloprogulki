const express = require('express');
const session = require('express-session');
const router = require('express').Router();
const Main = require('../views/Main');
const renderTemplate = require('../lib/renderTemplate');

router.get('/', (req, res) => {
  // const userName = req.session.username;
  renderTemplate(Main, null, res);
});

module.exports = router;
