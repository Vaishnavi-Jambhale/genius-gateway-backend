const express = require("express");
const { getAllStudyVisas, createStudyVisa } = require("../controllers/studyVisaController");
const upload = require("../middlewares/multer");

const router = express.Router();

router.get("/", getAllStudyVisas);
router.post("/", upload.single("image"), createStudyVisa);

module.exports = router;
