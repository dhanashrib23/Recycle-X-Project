const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  registerConsumer,
  loginConsumer,
  updateConsumer,
  addToCart,
  removeFromCart,
  showCart,
  addDeliveryAddress,
  updateDeliveryAddress,
  getDeliveryAddress,
  deleteDeliveryAddress,
  placeOrder,
  getAllOrders,
  getOrderItemDetails,
  uploadProfileImg,
} = require("../controllers/consumerController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Uploads/Consumer_Images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Request to Controller
router.post("/signup", registerConsumer);
router.post("/signin", loginConsumer);
router.put("/update/:id", updateConsumer);
router.post("/addcart/:id", addToCart);
router.delete("/removecart/:id", removeFromCart);
router.get("/showcart", showCart);
router.post("/delivery", addDeliveryAddress);
router.put("/delivery/:id", updateDeliveryAddress);
router.delete("/delivery/:id", deleteDeliveryAddress);
router.get("/delivery", getDeliveryAddress);
router.post("/placeorder", placeOrder);
router.get("/orders/:id", getAllOrders);
router.post("/orderdetail", getOrderItemDetails);
router.patch("/uploadimg/:id", upload.single("image"), uploadProfileImg);

module.exports = router;
