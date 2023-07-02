const express = require("express");
const landController = require("../controllers/land");
const upload = require("../utils/multer.js");

const router = express.Router();

//CREATE
router.post("/create", landController.createLand);

//UPDATE
router.put("/update/:id", upload.array("image"), landController.updateLand);
//DELETE
router.delete("/delete/:id", landController.deleteLand);
//GET

router.get("/get/:id", landController.getLand);
//GET ALL

router.get("/get-all", landController.getLands);

router.get("/tho-nhuong/:id", landController.getThoNhuong);

router.post("/update/tho-nhuong/:id", landController.updateThoNhuong);

router.get("/thoi-vu/:id", landController.getThoiVu);

router.post("/update/thoi-vu/:id", landController.updateThoiVu);

router.get("/tuoi-tieu/:id", landController.getTuoiTieu);

router.post("/update/tuoi-tieu/:id", landController.updateTuoiTieu);

module.exports = router;
