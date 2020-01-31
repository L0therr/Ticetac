var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var session = require('express-session')

//models
var connect = require('../models/connect');
var usersModel = require('../models/users');
var tripsModel = require('../models/trips');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  if(!req.session.isLogged) {
    res.redirect('/signin');
  } else {
    res.render('dashboard');
  }
});

//post
router.post('/signin', async function(req, res, next) {
  var toTestMail = req.body.inmail.toLowerCase();
  var toTestPswd = req.body.inpswd;

  var testResult = await usersModel.findOne({
    email: toTestMail,
    password: toTestPswd
  })

  if(testResult) {
    req.session.currentUser = testResult;
    req.session.isLogged = true;
    console.log('====== logged');
    res.redirect('/');
  } else {
    req.session.isLogged = false;
    console.log('====== NOT LOGGED');
    res.redirect('/signin');
  }
});

router.post('/signup', async function(req, res, next) {
  var lastName = req.body.upln.toLowerCase();
  var firstName = req.body.upfn.toLowerCase();
  var mail = req.body.upmail.toLowerCase();
  var password = req.body.uppswd;

  var alreadyUseMail = await usersModel.find({
    email: mail,
  });

  //register the user
  if (!alreadyUseMail[0]) {
    console.log(',dks')
    var newUser = new usersModel({
      email: mail,
      lastName: lastName,
      firstName: firstName,
      password: password,
    })
    await newUser.save();
    req.session.isLogged = true;
  }
  res.redirect('/')
});
module.exports = router;
