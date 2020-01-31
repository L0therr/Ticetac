var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var session = require('express-session')

//models
var connect = require('../models/connect');
var usersModel = require('../models/users');
var tripsModel = require('../models/trips');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  if(!req.session.isLogged) {
    res.redirect('/signin');
  } else {
    var user = req.session.currentUser;
    var userOrders = [];
    var toDisplay = [];
    
    for(var i=0;i<user.orders.length;i++) {
      userOrders.push(user.orders[i])
    }

    for(var i=0;i<userOrders.length;i++) {
      var one = [];
      for(var j=0;j<userOrders[i].order.length;j++) {
        var key = userOrders[i].order[j].fk_trip;
        var trip = await tripsModel.findOne({
          _id: key,
        });
        one.push(trip);
      }
      toDisplay.push(one);
    }

    console.log(toDisplay)
    res.render('dashboard', {orders: toDisplay, user: req.session.currentUser, isLogged: req.session.isLogged});
  }
});


//post
router.post('/signin', async function(req, res, next) {
  var toTestMail = req.body.inmail.toLowerCase();
  var toTestPswd = req.body.inpswd;

  var testResult = await usersModel.findOne({
    email: toTestMail,
    password: toTestPswd
  });

  if(testResult) {
    req.session.currentUser = testResult;
    req.session.isLogged = true;
    console.log('====== logged', req.session.isLogged);

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
    var newUser = new usersModel({
      email: mail,
      lastName: lastName,
      firstName: firstName,
      password: password,
    })
    await newUser.save();
  }
  res.redirect('/')
});





router.get('/disconnect', async function(req, res, next){
  req.session.currentUser = [];
  req.session.isLogged = false;
  res.redirect('/home');
});
module.exports = router;
