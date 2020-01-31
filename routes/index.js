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
    res.render('home', {user: req.session.currentUser, isLogged: req.session.isLogged});
  }
});

router.get('/signin', async function(req, res, next) {
  if(!req.session.isLogged) {
    res.render('signin', {user:[], isLogged: req.session.isLogged});
  } else {
    res.redirect('/home');
  }
});

router.get('/error', async function(req, res, next) {
  res.render('error', { session: req.session, user: req.session.currentUser, isLogged: req.session.isLogged });
});

router.post('/search', async function(req, res, next) {
  
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
    res.render('results', {search: searchTrip, isLogged: req.session.isLogged, user: req.session.currentUser});
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
  if (req.session.currentOrder == undefined) {
    req.session.currentOrder = [];
  }

  var tripId = req.query.id;

  var trip = await tripsModel.findOne({
    _id: tripId,
  });

  req.session.currentOrder.push(trip);
  
  res.redirect('/checkout');
});


router.get('/checkout', async function(req, res, next) {
  res.render('orders', {orders: req.session.currentOrder, user: req.session.currentUser});
});

router.post('/pay', async function(req, res, next) {

  var user = await usersModel.findOne({
    _id: req.session.currentUser._id,
  });


  var tokill = req.body.id.shift();

  var ids = req.body.id;
  var toSave = [];

  


  for(var i=0;i<ids.length;i++){
    toSave.push({ fk_trip: ids[i]});
  }

  user.orders.push({order: toSave});
  await user.save();
  req.session.currentOrder = [];

  user = await usersModel.findOne({
    _id: req.session.currentUser._id,
  });
  
  req.session.currentUser = user;

  console.log(toSave)
  res.redirect('/home');
});

module.exports = router;
