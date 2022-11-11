const router = require('express').Router();
const Layout = require('../views/Layout');
const renderTemplate = require('../lib/renderTemplate');

router.get('/', (req, res) => {
  const userName = req.session.username;
  const userId = req.session.userid;
  renderTemplate(Layout, { userName }, res);
});

module.exports = router;
