const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// id is auto-generated
const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
});

// create model called Book based on bookSchema above
// Book collection
module.exports = mongoose.model('Book', bookSchema);