const express = require("express");

const verify = require("../utils/verifyToken");
const uploadController = require("../controllers/upload.js");

const router = express.Router();

router.put(
  "/avata",
  verify.verifyToken,
  // upload.single("image"),
  uploadController.uploadAvatar
);

module.exports = router;
