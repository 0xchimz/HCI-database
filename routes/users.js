var express = require('express')
var router = express.Router()

var User = require('../models/user.js')

router.get('/:stdId/:collection', function (req, res, next) {
  var _id = req.params.stdId
  var pin = req.param('pin')

  var collection = req.params.collection

  User.find({_id: _id, pin: pin}, authUser)

  function authUser (err, users) {
    if (err) {
      return next(err)
    }
    if (users.length !== 1) {
      var error = new Error('Student ID and PIN are incorrect.')
      error.status = 404
      next(error)
    } else {
      res.json(users[0].data[collection])
    }
  }
})

router.get('/:stdId', function (req, res, next) {
  var _id = req.params.stdId
  var pin = req.param('pin')
  User.find({_id: _id, pin: pin}, authUser)

  function authUser (err, users) {
    if (err) {
      return next(err)
    }
    if (users.length !== 1) {
      var error = new Error('Student ID and PIN are incorrect.')
      error.status = 404
      next(error)
    } else {
      res.json(users[0].data)
    }
  }
})

router.get('/', function (req, res, next) {
  User.find({}, function (err, users) {
    res.json(users)
  })
})

module.exports = router
