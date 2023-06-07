import express from "express";
import upload from "../utils/multer.js";
import { uploadAvatar } from "../controllers/upload.js";
import { verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.put("/avata", verifyUser, upload.single("image"), uploadAvatar);

router.put("/images", upload.array("images", 5), (req, res) => {
  if (req.files) {
    res.send("Muliple files uploaded successfully");
  } else {
    res.status(400).send("Please upload a valid images");
  }
});

export default router;
