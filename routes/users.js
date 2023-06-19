const express = require("express");
const userController = require("../controllers/user.js");
const verify = require("../utils/verifyToken.js");

const router = express.Router();

//UPDATE
router.put("/update/:id", verify.verifyUser, userController.updateUser);

//DELETE
router.delete("/delete/:id", verify.verifyAdmin, userController.deleteUser);

//GET
router.get("/get/:id", verify.verifyUser, userController.getUser);

//GET ALL
router.get("/get-all", verify.verifyAdmin, userController.getUsers);

module.exports = router;
