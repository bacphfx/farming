const express = require("express");
const landController = require("../controllers/land");
const verify = require("../utils/verifyToken.js");

const router = express.Router();

//CREATE
router.post("/create", verify.verifyToken, landController.createLand);

//UPDATE
router.put("/update/:id", verify.verifyToken, landController.updateLand);
//DELETE
router.delete("/delete/:id", verify.verifyToken, landController.deleteLand);
//GET

router.get("/get/:id", verify.verifyToken, landController.getLand);
//GET ALL

router.get(
  "/get-all",
  verify.verifyToken,
  verify.verifyAdmin,
  landController.getLands
);

router.get("/tho-nhuong/:id", verify.verifyToken, landController.getThoNhuong);

router.post(
  "/update/tho-nhuong/:id",
  verify.verifyToken,
  landController.updateThoNhuong
);

router.get("/thoi-vu/:id", verify.verifyToken, landController.getThoiVu);

router.post(
  "/update/thoi-vu/:id",
  verify.verifyToken,
  landController.updateThoiVu
);

router.get("/tuoi-tieu/:id", verify.verifyToken, landController.getTuoiTieu);

router.post(
  "/update/tuoi-tieu/:id",
  verify.verifyToken,
  landController.updateTuoiTieu
);

router.get("/lam-co/:id", verify.verifyToken, landController.getLamCo);

router.post(
  "/update/lam-co/:id",
  verify.verifyToken,
  landController.updateLamCo
);

router.get("/dinh-duong/:id", verify.verifyToken, landController.getDinhDuong);

router.post(
  "/update/dinh-duong/:id",
  verify.verifyToken,
  landController.updateDinhDuong
);

router.get("/phan-bon/:id", verify.verifyToken, landController.getPhanBon);

router.post(
  "/update/phan-bon/:id",
  verify.verifyToken,
  landController.updatePhanBon
);

router.get("/dich-benh/:id", verify.verifyToken, landController.getDichBenh);

router.post(
  "/update/dich-benh/:id",
  verify.verifyToken,
  landController.updateDichBenh
);

router.get("/thuoc-BVTV/:id", verify.verifyToken, landController.getThuocBVTV);

router.post(
  "/update/thuoc-BVTV/:id",
  verify.verifyToken,
  landController.updateThuocBVTV
);

router.get(
  "/sinh-truong/:id",
  verify.verifyToken,
  landController.getSinhTruong
);

router.post(
  "/update/sinh-truong/:id",
  verify.verifyToken,
  landController.updateSinhTruong
);

router.get(
  "/ky-thuat-cham-soc/:id",
  verify.verifyToken,
  landController.getChamSoc
);

router.post(
  "/update/ky-thuat-cham-soc/:id",
  verify.verifyToken,
  landController.updateChamSoc
);

router.get("/thu-hoach/:id", verify.verifyToken, landController.getThuHoach);

router.post(
  "/update/thu-hoach/:id",
  verify.verifyToken,
  landController.updateThuHoach
);

router.post("/reset/:id", verify.verifyToken, landController.resetLand);

module.exports = router;
