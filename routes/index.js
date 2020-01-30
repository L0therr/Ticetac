var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//models
var connect = require('../models/connect');
var usersModel = require('../models/users');


/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('signin');
});


module.exports = router;
