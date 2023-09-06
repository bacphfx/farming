const express = require("express");
const authController = require("../controllers/auth.js");
const verify = require("../utils/verifyToken.js");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post(
  "/change-password",
  verify.verifyToken,
  authController.changePassword
);

router.post("/send-email", authController.sendEmail);
router.post("/reset-password", authController.resetPassword);

router.post("/delete-account", verify.verifyToken, authController.deleteUser);

module.exports = router;
