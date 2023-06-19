const express = require("express");
const userController = require("../controllers/user.js");
const verify = require("../utils/verifyToken.js");

const router = express.Router();

//UPDATE
router.put(
  "/update/:id",
  verify.verifyToken,
  verify.verifyUser,
  userController.updateUser
);

//DELETE
router.delete(
  "/delete/:id",
  verify.verifyToken,
  verify.verifyAdmin,
  userController.deleteUser
);

//GET
router.get(
  "/get/:id",
  verify.verifyToken,
  verify.verifyUser,
  userController.getUser
);

//GET ALL
router.get(
  "/get-all",
  verify.verifyToken,
  verify.verifyAdmin,
  userController.getUsers
);

module.exports = router;
