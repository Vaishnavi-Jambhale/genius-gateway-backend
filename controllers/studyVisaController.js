const StudyVisa = require("../models/StudyVisa");
const cloudinary = require("../config/cloudinary");

exports.getAllStudyVisas = async (req, res) => {
  try {
    const studyVisas = await StudyVisa.find();
    res.status(200).json(studyVisas);
  } catch (error) {
    res.status(500).json({ error: "Error fetching study visa data" });
  }
};

exports.createStudyVisa = async (req, res) => {
  try {
    const { title, country, details } = req.body;
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, uploadedFile) => {
        if (error) reject(error);
        else resolve(uploadedFile);
      });
      stream.end(req.file.buffer);
    });

    const newStudyVisa = new StudyVisa({ title, country, details, imageUrl: result.secure_url });
    await newStudyVisa.save();
    res.status(201).json(newStudyVisa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

