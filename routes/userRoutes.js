var express = require('express');
var router = express.Router();
var logger = require('../modules/logger')
var User = require('../models/user');
var Promise = require("bluebird");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Create
router.post('/register', (req, res, next) => {

  const body = req.body

  const registerUser = Promise.coroutine(function* (userData) {

    //create User
    var newUser = User({
      name: userData.name,
      username: userData.userName,
      password: userData.password,
      admin: userData.isAdmin,
      location: userData.location,
      meta: {
        age: userData.age,
        sectorOfInterest: userData.sectorOfInterest,
        linkedInProfile: userData.linkedInProfile
      },
      created_at: Date,
      updated_at: Date
    });
    //save User, if not throw error, and send status
    newUser.save(function(err) {
      if (err) {
        res.sendStatus(404)
        throw err;
      } else {
        console.log(newUser)
        res.sendStatus(200, 'User Created!')
      }
    });
  });

  try {
    registerUser(body)
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }
});

//Find
router.get('/find/:id', (req, res, next) => {
  var id = req.param('id')
  var targetUser;
  var findUser = Promise.coroutine(function* (targetId) {
    try {
      let targetUser = yield User.findOne({ '_id': targetId })
      console.log(targetUser)
      res.send(200, JSON.stringify(targetUser))
    } catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
    return targetUser
  })
  findUser(id);
});

//Update
//Delete

module.exports = router;
