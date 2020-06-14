const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// id is auto-generated
const authorSchema = new Schema({
  name: String,
  age: Number
});

// create model called Author based on authorSchema above
// Author collection
module.exports = mongoose.model('Author', authorSchema);