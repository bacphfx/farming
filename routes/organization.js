const express = require("express");
const orgController = require("../controllers/organization");
const upload = require("../utils/file.js");
const verify = require("../utils/verifyToken.js");

const router = express.Router();

//CREATE
router.post("/create", verify.verifyToken, orgController.createOrganization);

//UPDATE
router.put("/update/:id", verify.verifyToken, orgController.updateOrganization);
//DELETE
router.delete(
  "/delete/:id",
  // verify.verifyToken,
  orgController.deleteOrganization
);
//GET

router.get(
  "/get/:id",
  //  verify.verifyToken,
  orgController.getOrganization
);
//GET ALL

router.get(
  "/get-all",
  // verify.verifyToken,
  // verify.verifyAdmin,
  orgController.getOrgs
);

router.post("/findByCode", orgController.findOrg);

router.get(
  "/get-my-org",
  //  verify.verifyToken,
  orgController.getMyOrgs
);

module.exports = router;
