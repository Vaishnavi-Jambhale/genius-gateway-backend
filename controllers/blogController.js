const Blog = require("../models/Blog");
const cloudinary = require("../config/cloudinary");

exports.getAllBlogs = async (req, res) => {
  console.log("hii")
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, uploadedFile) => {
        if (error) reject(error);
        else resolve(uploadedFile);
      });
      stream.end(req.file.buffer);
    });

    const newBlog = new Blog({ title, description, imageUrl: result.secure_url });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
