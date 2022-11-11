const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const router = require('express').Router();
const { User } = require('../../db/models');

router.post('/signIn', async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ where: { email } });
    if (findUser) {
      const isUserAuth = await bcrypt.compare(password, findUser.password);
      if (isUserAuth) {
        req.session.username = findUser.name;
        req.session.userid = findUser.id;
        res.status(200);
        res.json({ user: findUser.name });
      } else {
        res.json({ answer: 'Неправильный логин или пароль' });
      }
    } else {
      res.json({ answer: 'Неправильный логин или пароль' });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/signUp', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const checkEmail = await User.findOne({ where: { email } });
    if (!checkEmail) {
      const newUser = await User.create({ name, email, password: hashedPassword });
      req.session.username = newUser.name;
      const newUserId = await User.findOne({ where: { email } });
      req.session.userid = newUserId.id;
      res.json({ user: newUser.name });
    } else {
      res.json({ answer: 'Такой юзер существует' });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('../');
});

router.post('/sess', (req, res) => {
  if (req.session?.username) {
    res.json({ user: req.session.username });
  } else {
    res.json(false);
  }
});

router.get('/personal', (req, res) => {
  console.log('hello world');
});
module.exports = router;
