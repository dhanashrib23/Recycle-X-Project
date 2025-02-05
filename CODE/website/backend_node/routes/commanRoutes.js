const express = require("express");
const router = express.Router();
const {
  getAllServiceZones,
  findServiceByPincode,
  getAllTrashCategories,
  getAllRecyclingCategories,
  getAllTrashSubCategories,
  getAllRecyclingSubCategories,
  getAllTrashSubCategoriesbycatid,
} = require("../controllers/commonController");

// Request to Controller
router.get("/getServiceZones", getAllServiceZones);
router.post("/findServiceByPincode", findServiceByPincode);

// Supplier
router.get("/getAllTrashCategories", getAllTrashCategories);
router.get("/getAllTrashSubCategories", getAllTrashSubCategories);
router.get(
  "/getAllTrashSubCategoriesbycatid/:categoryId",
  getAllTrashSubCategoriesbycatid
);

// Consumer
router.get("/getAllRecyclingCategories", getAllRecyclingCategories);
router.get("/getAllRecyclingSubCategories", getAllRecyclingSubCategories);

module.exports = router;
