var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var session = require('express-session')

//models
var connect = require('../models/connect');
var usersModel = require('../models/users');
var tripsModel = require('../models/trips');



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

router.get('/error', async function(req, res, next) {
  res.render('error', { session: req.session });
});

router.post('/searchTrip', async function(req, res, next) {
  
  var cityFormat = (toFormat) => {
    toFormat = toFormat.toLowerCase();
    toFormat = toFormat.charAt(0).toUpperCase() + toFormat.slice(1);
    return toFormat;
  }

  //get search with the first letter capitalized
  var fromCity  = cityFormat(req.body.from);
  var toCity = cityFormat(req.body.to);
  var date = req.body.on;

  //search our DB
  var searchTrip = await tripsModel.find({
    departure: fromCity,
    arrival: toCity,
    date: date,
  });

  //redirect
  if(searchTrip.length > 0) {

    res.render('results', {search: searchTrip});
  } else {
    req.session.errorSearch = {
      departure: fromCity,
      arrival: toCity,
      date: date,
    };
    res.redirect('/error');
  }
});

//ORDERS
router.get('/orders', async function(req, res, next) {
  var tripId = req.query.id;

  var trip = await tripsModel.findOne({
    _id: tripId,
  });
  
  req.session.currentOrder = [];
  req.session.currentOrder.push(trip)

  res.render('orders', {});
});









module.exports = router;
