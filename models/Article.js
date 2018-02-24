// Model for Articles to DB
// Set up dependencies
const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Create a new ArticleSchema object
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  // 'note' is an object that stores a Note id, for populating Article with associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// Create model from above Schema using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
