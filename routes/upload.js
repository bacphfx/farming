const express = require("express");

const verify = require("../utils/verifyToken");
const uploadController = require("../controllers/upload.js");

const router = express.Router();

router.post(
  "/image",
  verify.verifyToken,
  // upload.single("image"),
  uploadController.uploadImage
);

router.post(
  "/images",
  verify.verifyToken,
  // upload.single("image"),
  uploadController.uploadImages
);

module.exports = router;
