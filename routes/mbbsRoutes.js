const express = require("express");
const { getAllMbbs, createMbbs } = require("../controllers/mbbsController");
const upload = require("../middlewares/multer");

const router = express.Router();

router.get("/", getAllMbbs);
router.post("/", upload.single("image"), createMbbs);

module.exports = router;
