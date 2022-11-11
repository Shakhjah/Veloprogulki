const router = require('express').Router();
const renderTemplate = require('../lib/renderTemplate');
const { Comment } = require('../../db/models');

router.post('/', async (req, res) => {
  const { userId, routeId, comment } = req.body;
  if (userId && routeId && comment) {
    try {
      const [newComment, created] = await Comment.findOrCreate({
        where: { biketrackId: routeId, userId },
        defaults: { biketrackId: routeId, userId, text: comment },
      });
      console.log('▶ ⇛ created', created);

      if (created) {
        res.json({ answer: 'Комментарий создан' });
      } else {
        res.json({ possibly: 'У вас уже есть комментарий к этому маршруту' });
      }
    } catch (error) {
      console.log('Ошибка при создании комментария - ', error);
    }
  } else {
    res.json({ error: 'Ошибка при создании комментария' });
  }
});
module.exports = router;
