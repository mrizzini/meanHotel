var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
   username: {
       type: String,
       unique: true,
       required: true
   }, 
   name: {
       type: String
   },
   password: {
       type: String,
       required: true
   }
});

mongoose.model('User', userSchema);

// this file creates Schema for users.
// then we need to go to db.js and bring in schema and model to app