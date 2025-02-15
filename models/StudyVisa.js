const mongoose = require("mongoose");

const StudyVisaSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
});

module.exports = mongoose.model("StudyVisa", StudyVisaSchema);
