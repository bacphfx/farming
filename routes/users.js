import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/update/:id", verifyUser, updateUser);

//DELETE
router.delete("/delete/:id", verifyAdmin, deleteUser);

//GET
router.get("/get/:id", verifyUser, getUser);

//GET ALL
router.get("/get-all", verifyAdmin, getUsers);

export default router;
