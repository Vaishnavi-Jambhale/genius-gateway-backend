const Mbbs = require("../models/Mbbs");
const cloudinary = require("../config/cloudinary");

exports.getAllMbbs = async (req, res) => {
  try {
    const mbbsEntries = await Mbbs.find();
    res.status(200).json(mbbsEntries);
  } catch (error) {
    res.status(500).json({ error: "Error fetching MBBS data" });
  }
};

exports.createMbbs = async (req, res) => {
  try {
    const { title, details } = req.body;
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, uploadedFile) => {
        if (error) reject(error);
        else resolve(uploadedFile);
      });
      stream.end(req.file.buffer);
    });

    const newMbbs = new Mbbs({ title, details, imageUrl: result.secure_url });
    await newMbbs.save();
    res.status(201).json(newMbbs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
