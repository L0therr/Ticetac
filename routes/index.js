var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//models
var connect = require('../models/connect');
var usersModel = require('../models/users');


/* GET home page. */
router.get('/', async function(req, res, next) {
  if (!req.session.isLogged) {
    res.redirect('/user/signin');
} else {
  res.redirect('/home')
}
});

router.get('/home', async function(req, res, next) {
  res.render('home', {session: req.session});
});



module.exports = router;
