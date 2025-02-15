const express = require("express");
const { getAllBlogs, createBlog } = require("../controllers/blogController");
const upload = require("../middlewares/multer");

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/", upload.single("image"), createBlog);

module.exports = router;
