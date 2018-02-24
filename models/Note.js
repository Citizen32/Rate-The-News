// Model for Notes to DB
// Set up dependencies
const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Create a new NoteSchema object
const NoteSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  }
});

// Create model from above Schema using mongoose's model method
const Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
