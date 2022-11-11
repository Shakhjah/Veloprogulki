const router = require('express').Router();
const renderTemplate = require('../lib/renderTemplate');

router.post('/', async (req, res) => {
  console.log('req.body------------>', req.body);
  // const newMap = await BikeTrack.create({
  //   mapFrom: JSON.stringify(req.body.from),
  //   mapTo: JSON.stringify(req.body.to),
  //   routeType: req.body.type,
  //   distanse: req.body.distanse,
  //   userId: req.body.userId,
  //   city: req.body.city,
  //   title: req.body.title || 'Без названия',
  // });
  res.send('OK');
});

module.exports = router;
