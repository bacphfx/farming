const express = require("express");
const provinceController = require("../controllers/province");

const router = express.Router();

router.get("/get-provinces", provinceController.getProvinces);

router.get("/get-districts", provinceController.getDistricts);

router.get("/get-wards", provinceController.getWards);

module.exports = router;
