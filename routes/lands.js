import express from "express";
import {
  createLand,
  deleteLand,
  getLand,
  getLands,
  updateLand,
} from "../controllers/land.js";

const router = express.Router();

//CREATE
router.post("/create", createLand);

//UPDATE
router.put("/update/:id", updateLand);
//DELETE
router.delete("/delete/:id", deleteLand);
//GET

router.get("/get/:id", getLand);
//GET ALL

router.get("/get-all", getLands);

export default router;
