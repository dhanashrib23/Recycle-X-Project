const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  registerSupplier,
  loginSupplier,
  updateSupplier,
  addToCart,
  removeFromCart,
  showCart,
  addPickupAddress,
  updatePickupAddress,
  getPickupAddress,
  deletePickupAddress,
  placeOrder,
  getAllOrders,
  getOrderItemDetails,
  uploadProfileImg,
  getOTPByEmail,
} = require("../controllers/supplierController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Uploads/Supplier_Images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Request to controller
router.post("/signup", registerSupplier);
router.post("/signin", loginSupplier);
router.put("/update/:id", updateSupplier);
router.post("/addcart/:id", addToCart);
router.delete("/removecart/:id", removeFromCart);
router.get("/showcart", showCart);
router.post("/pickup", addPickupAddress);
router.put("/pickup/:id", updatePickupAddress);
router.delete("/pickup/:id", deletePickupAddress);
router.get("/pickup", getPickupAddress);
router.post("/placeorder", placeOrder);
router.get("/orders/:id", getAllOrders);
router.post("/orderdetail", getOrderItemDetails);
router.patch("/uploadimg/:id", upload.single("image"), uploadProfileImg);
router.post("/getOTP", getOTPByEmail);

module.exports = router;
