const router = require('express').Router();
const Layout = require('../views/Layout');
const renderTemplate = require('../lib/renderTemplate');

router.get('/', (req, res) => {
  renderTemplate(Layout, null, res);
});

module.exports = router;