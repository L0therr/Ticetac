var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var session = require('express-session')

//models
var connect = require('../models/connect');
var usersModel = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/dashboard');
});

router.post('/signin', async function(req, res, next) {
  res.redirect('/')
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
  }
  res.redirect('/')
});



//     //register the user
//     if (alreadyUseMail === null) {
//         var newUser = new signupModel({
//             username: name,
//             email: mail,
//             password: pswd,
//             cityId: [56, 78, ],
//         })
//         await newUser.save();
//         logged = true;
//         req.session.currentUser = newUser;
//         req.session.isLogged = true;
//     } else {
//         req.session.error.signup = true;
//     }

module.exports = router;
