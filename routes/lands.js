const express = require("express");
const landController = require("../controllers/land");

const router = express.Router();

//CREATE
router.post("/create", landController.createLand);

//UPDATE
router.put("/update/:id", landController.updateLand);
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

router.get("/lam-co/:id", landController.getLamCo);

router.post("/update/lam-co/:id", landController.updateLamCo);

router.get("/dinh-duong/:id", landController.getDinhDuong);

router.post("/update/dinh-duong/:id", landController.updateDinhDuong);

router.get("/phan-bon/:id", landController.getPhanBon);

router.post("/update/phan-bon/:id", landController.updatePhanBon);

router.get("/dich-benh/:id", landController.getDichBenh);

router.post("/update/dich-benh/:id", landController.updateDichBenh);

router.get("/thuoc-BVTV/:id", landController.getThuocBVTV);

router.post("/update/thuoc-BVTV/:id", landController.updateThuocBVTV);

module.exports = router;
