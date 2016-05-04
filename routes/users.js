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
      return next(error)
    }
    res.json(users[0].data[collection])
  }
})

router.delete('/:stdId/:collection', function (req, res, next) {
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
      return next(error)
    }
    var userData = users[0].data
    if (!userData[collection]) {
      error = new Error('Record not found.')
      error.status = 401
      return next(error)
    }
    delete userData[collection]
    var set = {data: userData}
    User.update(
      {_id: _id, pin: pin},
      { $set: set},
      function (err, result) {
        if (err) {
          return next(err)
        }
        res.json('updated', {
          message: 'Record [' + collection + '] is deleted'
        })
      }
    )
  }
})

router.post('/:stdId/:collection', function (req, res, next) {
  var _id = req.params.stdId
  var pin = req.param('pin')

  var collection = req.params.collection
  var newData = req.body[collection]

  User.find({_id: _id, pin: pin}, authUser)

  function authUser (err, users) {
    if (err) {
      return next(err)
    }
    if (!newData) {
      var error = new Error('Cannot found your collection')
      error.status = 400
      return next(error)
    }
    if (users.length !== 1) {
      error = new Error('Student ID and PIN are incorrect.')
      error.status = 404
      return next(error)
    }
    console.log(newData)
    var userData = users[0].data[collection]
    console.log(users[0].data[collection])
    if (!userData) {
      userData = {}
    }
    var mergeData = { }
    mergeData[collection] = Object.assign(newData, userData)
    var set = { data: mergeData }

    User.update(
      {_id: _id, pin: pin},
      { $set: set},
      function (err, result) {
        if (err) {
          return next(err)
        }
        res.json(result)
      }
    )
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
      return next(error)
    }
    res.json(users[0].data)
  }
})

router.post('/:stdId', function (req, res, next) {
  var _id = req.params.stdId
  var pin = req.param('pin')

  var body = req.body
  console.log('/:stdId')
  User.find({_id: _id, pin: pin}, authUser)

  function authUser (err, users) {
    if (err) {
      return next(err)
    }
    if (users.length !== 1) {
      var error = new Error('Student ID and PIN are incorrect.')
      error.status = 404
      return next(error)
    }
    var set = Object.assign(users[0].data, body)
    User.findByIdAndUpdate({_id: _id}, {$set: {data: set}}, function (err, user) {
      if (err) {
        return next(err)
      }
      res.json(users[0].data)
    })
  }
})

router.get('/', function (req, res, next) {
  User.find({}, function (err, users) {
    res.json(users)
  })
})

module.exports = router
