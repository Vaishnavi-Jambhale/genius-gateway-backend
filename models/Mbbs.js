const mongoose = require("mongoose");

const MbbsSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
});

module.exports = mongoose.model("Mbbs", MbbsSchema);
