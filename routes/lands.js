import express from "express";
import {
  createLand,
  deleteLand,
  getLand,
  getLands,
  updateLand,
} from "../controllers/land.js";
import upload from "../utils/multer.js";

const router = express.Router();

//CREATE
router.post("/create", createLand);

//UPDATE
router.put("/update/:id", upload.array("image"), updateLand);
//DELETE
router.delete("/delete/:id", deleteLand);
//GET

router.get("/get/:id", getLand);
//GET ALL

router.get("/get-all", getLands);

export default router;
