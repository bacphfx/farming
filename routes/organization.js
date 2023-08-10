const express = require("express");
const orgController = require("../controllers/organization");
const upload = require("../utils/file.js");
const verify = require("../utils/verifyToken.js");

const router = express.Router();

//CREATE
router.post("/create", verify.verifyToken, orgController.createOrganization);

//UPDATE
router.put("/update/:id", orgController.updateOrganization);
//DELETE
router.delete("/delete/:id", orgController.deleteOrganization);
//GET

router.get("/get/:id", orgController.getOrganization);
//GET ALL

router.get("/get-all", orgController.getOrgs);

router.post("/findByCode", orgController.findOrg);

module.exports = router;
