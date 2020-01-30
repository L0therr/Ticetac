var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var session = require('express-session')

//models
var connect = require('../models/connect');
var usersModel = require('../models/users');



/* GET home page. */
router.get('/', async function(req, res, next) {
  if(!req.session.isLogged) {
    res.redirect('/signin');
  } else {
    res.redirect('/home');
  }
});

router.get('/home', async function(req, res, next) {
  if(!req.session.isLogged) {
    res.redirect('/signin');
  } else {
    res.render('home');
  }
});

router.get('/signin', async function(req, res, next) {
  if(!req.session.isLogged) {
    res.render('signin');
  } else {
    res.redirect('/home');
  }
});



module.exports = router;
