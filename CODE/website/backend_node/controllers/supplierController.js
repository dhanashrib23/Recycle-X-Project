const db = require("../DBUtils/connection");
const { supplier } = require("../DBUtils/constants");
const config = require("../App/appConfig");
const reply = require("../models/responseStructure");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

// Suppiler Controller
// const registerSupplier = (request, response) => {
//   const encryptPass = String(crypto.SHA256(request.body.password));
//   const values = [
//     request.body.firstName,
//     request.body.lastName,
//     request.body.mobileNumber,
//     encryptPass,
//     request.body.state,
//     request.body.city,
//     request.body.pincode,
//     request.body.supplierType,
//   ];

//   const statement = `CALL register_supplier(?, ?, ?, ?, ?, ?, ?, ?)`;

//   db.execute(statement, values, (error, result) => {
//     if (error) {
//       return response
//         .status(400)
//         .json(
//           reply.onError(
//             400,
//             error,
//             "There was an error with the request. Some fields may be missing or incorrect."
//           )
//         );
//     }

//     if (result.affectedRows === 0) {
//       return response
//         .status(500)
//         .json(
//           reply.onError(
//             500,
//             null,
//             "Supplier registration failed. Please try again."
//           )
//         );
//     }

//     return response
//       .status(201)
//       .json(reply.onSuccess(201, result, "Supplier registered successfully."));
//   });
// };

const registerSupplier = (request, response) => {
  const encryptPass = String(crypto.SHA256(request.body.password));
  const values = [
    request.body.firstName,
    request.body.lastName,
    request.body.mobileNumber,
    encryptPass,
    request.body.state,
    request.body.city,
    request.body.pincode,
    request.body.supplierType,
  ];

  const statement = `CALL register_supplier(?, ?, ?, ?, ?, ?, ?, ?)`;

  db.execute(statement, values, (error, result) => {
    if (error) {
      console.error("Error during supplier registration:", error); // Log the error for debugging
      return response
        .status(400)
        .json(
          reply.onError(
            400,
            error,
            "There was an error with the request. Some fields may be missing or incorrect."
          )
        );
    }

    // Log the result to understand what is returned
    console.log("Database result:", result);

    // Check if the result contains the success status
    if (
      result &&
      result[0] &&
      result[0][0] &&
      result[0][0].status === "success"
    ) {
      return response
        .status(201)
        .json(
          reply.onSuccess(201, result, "Supplier registered successfully.")
        );
    }

    // If status is not 'success'
    return response
      .status(500)
      .json(
        reply.onError(
          500,
          null,
          "Supplier registration failed. Please try again."
        )
      );
  });
};

const loginSupplier = (request, response) => {
  const encryptPass = String(crypto.SHA256(request.body.password));
  const values = [request.body.mobileNumber, encryptPass];
  const statement = `SELECT first_name, last_name, mobile_number, supplier_status 
                     FROM ${supplier.SUPPLIER} 
                     WHERE mobile_number = ? AND password = ? AND supplier_status = 'Active'`;

  db.execute(statement, values, (error, result) => {
    if (error) {
      return response
        .status(500)
        .json(
          reply.onError(
            500,
            error,
            "An error occurred while processing the request."
          )
        );
    }

    if (result.length > 0) {
      const user = result[0];
      const payload = {
        firstName: user["first_name"],
        lastName: user["last_name"],
        mobileNumber: user["mobile_number"],
        status: user["supplier_status"],
      };
      const token = jwt.sign(payload, config.SECRET_KEY);

      return response
        .status(200)
        .json(
          reply.onLoginSuccess(
            200,
            token,
            "Logged in successfully. Welcome to the application."
          )
        );
    } else {
      return response
        .status(401)
        .json(
          reply.onError(
            401,
            null,
            "Invalid credentials or your account is inactive. Please contact support if needed."
          )
        );
    }
  });
};

const updateSupplier = (request, response) => {
  const supplierId = request.params.id;
  const encryptPass = String(crypto.SHA256(request.body.password));
  const values = [
    request.body.firstName,
    request.body.lastName,
    request.body.mobileNumber,
    encryptPass,
    request.body.state,
    request.body.city,
    request.body.pincode,
    request.body.supplierType,
    supplierId,
  ];

  const statement = `UPDATE ${supplier.SUPPLIER} SET 
    first_name = ?, 
    last_name = ?, 
    mobile_number = ?, 
    password = ?, 
    state = ?, 
    city = ?, 
    pincode = ?, 
    supplier_type = ? 
    WHERE supplier_id = ?`;

  db.execute(statement, values, (error, result) => {
    if (error) {
      return response
        .status(500)
        .json(
          reply.onError(
            500,
            error,
            "Error updating the supplier. Please try again."
          )
        );
    }

    if (result.affectedRows === 0) {
      return response
        .status(404)
        .json(
          reply.onError(404, null, "Supplier not found or no changes made.")
        );
    }

    return response
      .status(200)
      .json(reply.onSuccess(200, result, "Supplier updated successfully."));
  });
};

const addToCart = (request, response) => {
  const subCategoryId = request.params.id; // Get ID from URL
  const { quantity_kg } = request.body; // Get quantity from body

  if (!subCategoryId || !quantity_kg) {
    return response
      .status(400)
      .json(
        reply.onError(
          400,
          error,
          "Missing required fields: subCategoryId or quantity."
        )
      );
  }

  const values = [subCategoryId, quantity_kg];
  const statement = `INSERT INTO ${supplier.SUPPLIER_CART} (subcategory_id, quantity_kg) VALUES (?, ?)`;

  db.execute(statement, values, (error, result) => {
    if (error) {
      return response
        .status(500)
        .json(
          reply.onError(
            400,
            error,
            "Error adding item to cart. Please try again."
          )
        );
    } else {
      return response
        .status(201)
        .json(
          reply.onSuccess(400, error, "Order item added to cart successfully.")
        );
    }
  });
};

// const addToCart = (request, response) => {
//   const subCategoryId = request.params.id; // Get ID from URL
//   const { quantity_kg, price_per_kg } = request.body; // Get quantity and price from body

//   if (!subCategoryId || !quantity_kg || !price_per_kg) {
//     return response.status(400).json({
//       status: "error",
//       message: "Missing required fields: subCategoryId, quantity, or price.",
//     });
//   }

//   const total_price = quantity_kg * price_per_kg;
//   const values = [subCategoryId, quantity_kg, price_per_kg, total_price];
//   const statement = `INSERT INTO ${supplier.SUPPLIER_CART} (subcategory_id, quantity_kg, price_per_kg, total_price) VALUES (?, ?, ?, ?)`;

//   db.execute(statement, values, (error, result) => {
//     if (error) {
//       return response.status(500).json({
//         status: "error",
//         message: "Error adding item to cart. Please try again.",
//       });
//     } else {
//       return response.status(201).json({
//         status: "success",
//         message: "Order item added to cart successfully.",
//       });
//     }
//   });
// };

const removeFromCart = (request, response) => {
  const cartId = request.params.id;

  if (!cartId) {
    return response
      .status(400)
      .json(reply.onError(400, null, "Cart item ID is required."));
  }

  const statement = `DELETE FROM ${supplier.SUPPLIER_CART} WHERE item_id = ?`;

  db.execute(statement, [cartId], (error, result) => {
    if (error) {
      return response
        .status(500)
        .json(reply.onError(500, error, "Error removing item from cart."));
    }

    if (result.affectedRows === 1) {
      return response
        .status(200)
        .json(
          reply.onSuccess(
            200,
            result,
            "Order item removed from cart successfully."
          )
        );
    } else {
      return response
        .status(404)
        .json(reply.onError(404, result, "Item not found in the cart."));
    }
  });
};

const showCart = (request, response) => {
  const statement = `SELECT * FROM ${supplier.SUPPLIER_CART}`;

  db.execute(statement, (error, results) => {
    if (error) {
      return response
        .status(500)
        .json(
          reply.onError(500, error, "Error fetching the supplier cart items.")
        );
    }

    if (results.length > 0) {
      return response
        .status(200)
        .json(
          reply.onSuccess(
            200,
            results,
            "Supplier cart items fetched successfully."
          )
        );
    }

    return response
      .status(404)
      .json(reply.onError(404, null, "Supplier cart is empty."));
  });
};

const addPickupAddress = (request, response) => {
  const values = [
    request.body.supplierId,
    request.body.supplierName,
    request.body.state,
    request.body.city,
    request.body.pincode,
    request.body.street_name,
    request.body.landmark,
  ];

  const statement = `INSERT INTO ${supplier.PICKUP_ADDRESS} (supplier_id, supplier_name, state, city, pincode, street_name, landmark) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.execute(statement, values, (error, result) => {
    if (error) {
      return response
        .status(500)
        .json(reply.onError(500, error, "Failed to add pickup address."));
    }

    return response
      .status(201)
      .json(reply.onSuccess(201, result, "PickUp Address added successfully."));
  });
};

const updatePickupAddress = (request, response) => {
  const pickupId = request.params.id;
  const values = [
    request.body.supplierId,
    request.body.supplierName,
    request.body.state,
    request.body.city,
    request.body.pincode,
    request.body.street_name,
    request.body.landmark,
    pickupId,
  ];

  const statement = `UPDATE ${supplier.PICKUP_ADDRESS} SET 
    supplier_id = ?, 
    supplier_name = ?, 
    state = ?, 
    city = ?, 
    pincode = ?, 
    street_name = ?, 
    landmark = ? 
  WHERE pickup_id = ?`;

  db.execute(statement, values, (error, result) => {
    if (error) {
      return response
        .status(500)
        .json(reply.onError(500, error, "Failed to update pickup address."));
    }

    return response
      .status(200)
      .json(reply.onSuccess(200, result, "Address updated successfully."));
  });
};

const deletePickupAddress = (request, response) => {
  const pickupId = request.params.id;

  const statement = `DELETE FROM ${supplier.PICKUP_ADDRESS} WHERE pickup_id = ?`;

  db.execute(statement, [pickupId], (error, result) => {
    if (error) {
      return response
        .status(500)
        .json(reply.onError(500, error, "Failed to delete pickup address."));
    }

    if (result.affectedRows > 0) {
      return response
        .status(200)
        .json(reply.onSuccess(200, result, "Address deleted successfully."));
    } else {
      return response
        .status(404)
        .json(reply.onError(404, null, "Address not found."));
    }
  });
};

const getPickupAddress = (request, response) => {
  const statement = `SELECT * FROM ${supplier.PICKUP_ADDRESS}`;

  db.execute(statement, (error, result) => {
    if (error) {
      return response
        .status(500)
        .json(reply.onError(500, error, "Failed to fetch pickup addresses."));
    }

    if (result.length > 0) {
      return response
        .status(200)
        .json(reply.onSuccess(200, result, "All addresses are shown here."));
    } else {
      return response
        .status(404)
        .json(reply.onError(404, null, "No pickup addresses found."));
    }
  });
};

const placeOrder = (request, response) => {
  const { supplierId, pickupId } = request.body;

  if (!supplierId || !pickupId) {
    return response
      .status(400)
      .json(
        reply.onError(
          400,
          null,
          "Missing supplierId or pickupId in request body."
        )
      );
  }

  const statement = `CALL create_supplier_order_from_cart(?, ?)`;

  db.execute(statement, [supplierId, pickupId], (error, result) => {
    if (error) {
      return response
        .status(500)
        .json(
          reply.onError(500, error, "Failed to place order. Please try again.")
        );
    } else {
      return response
        .status(200)
        .json(reply.onSuccess(200, result, "Order placed successfully"));
    }
  });
};

const getAllOrders = (request, response) => {
  const supplierId = request.params.id;

  const statement = `
    SELECT DISTINCT
      co.order_id,
      co.supplier_id,
      co.order_date, 
      coi.subcategory_id,
      rs.subcategory_image,
      rs.subcategory_name,
      rs.category_description
    FROM 
      ${supplier.SUPPLIER_ORDERS} co
    LEFT JOIN 
      ${supplier.SUPPLIER_ORDER_ITEMS} coi ON co.order_id = coi.order_id
    LEFT JOIN 
      ${supplier.TRASH_SUBCATEGORIES} rs ON coi.subcategory_id = rs.subcategory_id
    WHERE 
      co.supplier_id = ?
    ORDER BY 
      co.order_date DESC, 
      co.order_id DESC;
  `;

  db.execute(statement, [supplierId], (error, result) => {
    if (error) {
      response
        .status(500)
        .json(reply.onError(500, error, "Failed to retrieve orders"));
    } else {
      if (result.length === 0) {
        response.status(200).json(reply.onSuccess(200, [], "No orders found"));
      } else {
        response
          .status(200)
          .json(reply.onSuccess(200, result, "Orders retrieved successfully"));
      }
    }
  });
};

const getOrderItemDetails = (request, response) => {
  const { orderId, itemId } = request.body;

  const statement = `
  SELECT 
    co.order_id,
    co.supplier_id,
    co.order_date,
    co.order_time,
    co.order_status,
    coi.item_id,
    coi.subcategory_id,
    rs.subcategory_name,
    rs.subcategory_image,
    rs.price_per_kg,
    rs.category_description,
    da.supplier_name,
    da.state,
    da.city,
    da.pincode,
    da.street_name,
    da.landmark
  FROM 
    ${supplier.SUPPLIER_ORDERS} co
  LEFT JOIN 
    ${supplier.SUPPLIER_ORDER_ITEMS} coi ON co.order_id = coi.order_id
  LEFT JOIN 
    ${supplier.TRASH_SUBCATEGORIES} rs ON coi.subcategory_id = rs.subcategory_id
  LEFT JOIN 
    ${supplier.PICKUP_ADDRESS} da ON co.pickup_id = da.pickup_id
  WHERE 
    co.order_id = ? AND coi.item_id = ?;
  `;

  db.execute(statement, [orderId, itemId], (error, result) => {
    if (error) {
      response
        .status(500)
        .json(reply.onError(500, error, "Failed to retrieve order details"));
    } else {
      if (result.length === 0) {
        response
          .status(200)
          .json(reply.onSuccess(200, [], "No order details found"));
      } else {
        response
          .status(200)
          .json(
            reply.onSuccess(200, result, "Order details retrieved successfully")
          );
      }
    }
  });
};

const uploadProfileImg = (request, response) => {
  if (!request.file) {
    return response
      .status(400)
      .json(reply.onError(400, null, "No file provided."));
  }

  const imagePath = `Uploads/Supplier_Images/${request.file.filename}`;
  const supplierId = request.params.id;

  if (!supplierId || isNaN(supplierId)) {
    return response
      .status(400)
      .json(reply.onError(400, null, "Invalid supplier ID."));
  }

  const statement = `UPDATE ${supplier.SUPPLIER} SET imageName = ? WHERE supplier_id = ?`;
  db.execute(statement, [imagePath, supplierId], (error, result) => {
    if (error) {
      return response
        .status(500)
        .json(reply.onError(500, error, "Failed to upload profile image."));
    }

    if (result.affectedRows === 0) {
      return response
        .status(404)
        .json(reply.onError(404, null, "Supplier not found. Update failed."));
    }

    response
      .status(200)
      .json(
        reply.onSuccess(
          200,
          { imagePath },
          "Profile image uploaded successfully."
        )
      );
  });
};

const getOTPByEmail = (request, response) => {
  const { userEmail } = request.body;
  let config = {
    service: "gmail",
    auth: {
      user: supplier.EMAIL,
      pass: supplier.PASSWORD,
    },
  };
  let transporter = nodemailer.createTransport(config);

  const otp = generateOTP();

  let message = {
    from: supplier.EMAIL,
    to: userEmail,
    subject: "OTP from recycle_X",
    text: `Your OTP is : ${otp}`,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return response.status(201).json({
        msg: "you should receive an email",
      });
    })
    .catch((error) => {
      return response.status(500).json({ error });
    });

  // response.status(201).json("opt send successfully");
};

const generateOTP = () => {
  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  return OTP;
};

module.exports = {
  registerSupplier,
  loginSupplier,
  updateSupplier,
  addToCart,
  removeFromCart,
  showCart,
  addPickupAddress,
  updatePickupAddress,
  deletePickupAddress,
  getPickupAddress,
  placeOrder,
  getAllOrders,
  getOrderItemDetails,
  uploadProfileImg,
  getOTPByEmail,
};
