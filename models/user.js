var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  _id: String,
  pin: String,
  data: {}
})

module.exports = mongoose.model('User', UserSchema)
