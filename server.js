require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const blogRoutes = require("./routes/blogRoutes");
const mbbsRoutes = require("./routes/mbbsRoutes");
const studyVisaRoutes = require("./routes/studyVisaRoutes");

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.use("/api/blogs", blogRoutes);
app.use("/api/mbbs", mbbsRoutes);
app.use("/api/studyVisa", studyVisaRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
