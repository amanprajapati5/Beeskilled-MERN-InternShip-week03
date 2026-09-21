const express = require("express");
const multer = require("multer");
const path = require("path");

const Image = require("../models/Image");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;

  const extension = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimeType = allowedTypes.test(file.mimetype);

  if (extension && mimeType) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, JPEG, PNG and WEBP images are allowed"
      )
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

// UPLOAD IMAGE
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Please select an image"
        });
      }

      const imageUrl = `${req.protocol}://${req.get(
        "host"
      )}/uploads/${req.file.filename}`;

      const image = await Image.create({
        user: req.user.userId,
        filename: req.file.filename,
        imageUrl
      });

      res.status(201).json({
        message: "Image uploaded successfully",
        image: image
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

// GET USER'S IMAGES
router.get("/", authMiddleware, async (req, res) => {
  try {
    const images = await Image.find({
      user: req.user.userId
    }).sort({
      createdAt: -1
    });

    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;