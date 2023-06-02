import express from "express";
import {
  getDistricts,
  getProvinces,
  getWards,
} from "../controllers/province.js";

const router = express.Router();

router.get("/get-provinces", getProvinces);

router.get("/get-districts", getDistricts);

router.get("/get-wards", getWards);

export default router;
