const express = require("express");
const router = express.Router();
const {
  getAllServiceZones,
  findServiceByPincode,
  getAllTrashCategories,
  getAllRecyclingCategories,
  getAllTrashSubCategories,
  getAllRecyclingSubCategories,
  getAllSubCatByCatId,
  getAllRecySubCatByCatId,
} = require("../controllers/commonController");

// Request to Controller
router.get("/getServiceZones", getAllServiceZones);
router.post("/findServiceByPincode", findServiceByPincode);

// Supplier
router.get("/getAllTrashCategories", getAllTrashCategories);
router.get("/getAllTrashSubCategories", getAllTrashSubCategories);
router.get("/getTrashSubCategoriesByCatId/:categoryId", getAllSubCatByCatId);

// Consumer
router.get("/getAllRecyclingCategories", getAllRecyclingCategories);
router.get("/getAllRecyclingSubCategories", getAllRecyclingSubCategories);
router.get("/getRecySubCategoriesByCatId/:categoryId", getAllRecySubCatByCatId);

module.exports = router;
