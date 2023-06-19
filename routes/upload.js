const express = require("express");
const upload = require("../utils/multer.js");
const verify = require("../utils/verifyToken");
const uploadController = require("../controllers/upload.js");

const router = express.Router();

router.put(
  "/avata",
  verify.verifyUser,
  upload.single("image"),
  uploadController.uploadAvatar
);

router.put("/images", upload.array("images", 5), (req, res) => {
  if (req.files) {
    res.send("Multiple files uploaded successfully");
  } else {
    res.status(400).send("Please upload a valid images");
  }
});

module.exports = router;
