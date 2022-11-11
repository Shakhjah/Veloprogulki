const router = require('express').Router();
const renderTemplate = require('../lib/renderTemplate');
const AddRise = require('../views/AddRise');
const { BikeTrack } = require('../../db/models');

router.get('/', (req, res) => {
  const userName = req.session.username;
  // eslint-disable-next-line prefer-destructuring
  const userId = req.session.userid;
  console.log('IN ROUTE INADDRISE userId', userId);
  renderTemplate(AddRise, { userName, userId }, res);
});

router.post('/', async (req, res) => {
  console.log('req.body------------>', req.body);
  const newMap = await BikeTrack.create({
    mapFrom: JSON.stringify(req.body.from),
    mapTo: JSON.stringify(req.body.to),
    routeType: req.body.type,
    distanse: req.body.distanse,
    userId: req.body.userId,
    city: req.body.city,
    title: req.body.title,
  });
  console.log('▶ ⇛ newMap', newMap);

  res.send('OK');
  // renderTemplate(AddRise, { userName }, res);
});

module.exports = router;
