const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const router = require('express').Router();
const { User } = require('../../db/models');

router.post('/signIn', async (req, res) => {
  const { email, password } = req.body;
  console.log('▶ ⇛ req.body', req.body);
  try {
    const findUser = await User.findOne({ where: { email } });
    console.log('▶ ⇛ findUser', findUser);
    if (findUser) {
      const isUserAuth = await bcrypt.compare(password, findUser.password);
      console.log('▶ ⇛ isUserAuth', isUserAuth);
      if (isUserAuth) {
        req.session.username = findUser.name;
        res.status(200);
        res.json({ user: findUser.name });
      } else {
        res.json({ answer: 'Неправильный логин или пароль' });
      }
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
  console.log('▶ ⇛ req.session?.name', req.session.username);
  if (req.session?.username) {
    res.json({ user: req.session.username });
  } else {
    res.json(false);
  }
});

module.exports = router;
