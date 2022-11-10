const router = require('express').Router();
const renderTemplate = require('../lib/renderTemplate');
const AddRise = require('../views/AddRise');
const { BikeTrack } = require('../../db/models');

router.get('/', (req, res) => {
  const userName = req.session.username;
  renderTemplate(AddRise, { userName }, res);
});
router.post('/', async (req, res) => {
  console.log('▶ ⇛ req.body', req.body);
  // Формирование
  // BikeTrack.mapFrom = JSON.stringify(req.body.from);
  // BikeTrack.mapTo = JSON.stringify(req.body.to);
  // BikeTrack.routeType = req.body.type;
  // BikeTrack.distanse = req.body.distanse;
  // BikeTrack.city = req.body.city;
  const newMap = await BikeTrack.create({
    mapFrom: JSON.stringify(req.body.from),
    mapTo: JSON.stringify(req.body.to),
    routeType: req.body.type,
    distanse: req.body.distanse,
    userId: 1,
    city: req.body.city,
  });
  console.log('▶ ⇛ newMap', newMap);

  res.send('OK');
  // renderTemplate(AddRise, { userName }, res);
});

module.exports = router;
