const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const router = require('express').Router();
const { where } = require('sequelize');
const { User } = require('../../db/models');

router.post('/signIn', async (req, res) => {

});

router.post('/signUp', async (req, res) => {
  const { name, email, passsword } = req.body;
  const checkEmail = await User.findOne({ where: { email } });
  console.log('checkEmail ===>>>>', checkEmail);
  try {
    console.log(' asdasd');
    // if (1 === 1) {
    //   const newUser = await User.create({ name, email, passsword });
    //   console.log('');
    //   res.redirect('/');
    // } else {
    //     console.log();
    // }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
