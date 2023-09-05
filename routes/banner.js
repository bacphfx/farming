const express = require("express");
const bannerController = require("../controllers/banner");
const verify = require("../utils/verifyToken.js");

const router = express.Router();

//CREATE
router.post(
  "/create",
  verify.verifyToken,
  verify.verifyAdmin,
  bannerController.createBanner
);

//UPDATE
router.put(
  "/update/:id",
  verify.verifyToken,
  verify.verifyAdmin,
  bannerController.updateBanner
);
//DELETE
router.delete(
  "/delete/:id",
  verify.verifyToken,
  verify.verifyAdmin,
  bannerController.deleteBanner
);
//GET

router.get(
  "/get/:id",
  verify.verifyToken,
  verify.verifyAdmin,
  bannerController.getBanner
);
//GET ALL

router.get(
  "/get-all",
  verify.verifyToken,
  verify.verifyAdmin,
  bannerController.getBanners
);

module.exports = router;
