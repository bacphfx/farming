const express = require("express");
const orgController = require("../controllers/organization");
const upload = require("../utils/multer.js");
const verify = require("../utils/verifyToken.js");

const router = express.Router();

//CREATE
router.post("/create", verify.verifyUser, orgController.createOrganization);

//UPDATE
router.put("/update/:id", orgController.updateOrganization);
//DELETE
router.delete("/delete/:id", orgController.deleteOrganization);
//GET

router.get("/get/:id", orgController.getOrganization);
//GET ALL

router.get("/get-all", orgController.getOrgs);

module.exports = router;
