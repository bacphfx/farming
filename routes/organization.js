const express = require("express");
const orgController = require("../controllers/organization");
const upload = require("../utils/multer.js");
const verify = require("../utils/verifyToken.js");

const router = express.Router();

//CREATE
router.post("/create", verify.verifyUser, orgController.createOrganization);

// //UPDATE
// router.put("/update/:id", upload.array("image"), landController.updateLand);
// //DELETE
// router.delete("/delete/:id", landController.deleteLand);
// //GET

// router.get("/get/:id", landController.getLand);
// //GET ALL

// router.get("/get-all", landController.getLands);

module.exports = router;
