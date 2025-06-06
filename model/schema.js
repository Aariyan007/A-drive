const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    // Remove unique from name - names can be duplicate
    minlength: [3, "Username is Short"]
  },
  number: {
    type: String, // Changed from Number to String
    required: true,
    trim: true,
    unique: true,
    minlength: [10, "Not Valid"]
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [6, "Not Valid"]
  },
  password: {
    type: String, 
    required: true,
    trim: true,
    minlength: [5, "Make it Big"]
  }
});

const user = mongoose.model('user', userSchema);
module.exports = user;