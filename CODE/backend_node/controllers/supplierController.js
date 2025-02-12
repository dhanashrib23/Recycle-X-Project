const db = require("../DBUtils/connection");
const { supplier } = require("../DBUtils/constants");
const config = require("../App/appConfig");
const reply = require("../models/responseStructure");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");

// Suppiler Controller
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
    return response
      .status(201)
      .json(reply.onSuccess(201, result, "Supplier registered successfully."));
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
          reply.onError(500, error, "An error occurred while processing the request.")
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

const getSupplierByMobile = (request, response) => {
  const mobile = request.body.mobile;

  if (!mobile) {
    return response
      .status(400)
      .json(reply.onError(400, null, "Mobile number is required."));
  }

  const supplierQuery = `SELECT supplier_id , first_name, last_name, mobile_number, state, city, pincode, imageName, supplier_type AS type, supplier_status AS status FROM ${supplier.SUPPLIER} WHERE mobile_number = '${mobile}'`;

  db.execute(supplierQuery, (error, results) => {
    if (error) {
      return response
        .status(500)
        .json(reply.onError(500, error, "Database error while fetching supplier details."));
    }

    if (results.length > 0) {
      return response
        .status(200)
        .json(reply.onSuccess(200, results[0], "Supplier details retrieved successfully."));
    }

    return response
      .status(404)
      .json(reply.onError(404, null, "Supplier not found."));
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
        .json(reply.onError(500, error, "Error updating the supplier. Please try again."));
    }

    if (result.affectedRows === 0) {
      return response
        .status(404)
        .json(reply.onError(404, null, "Supplier not found or no changes made."));
    }

    return response
      .status(200)
      .json(reply.onSuccess(200, result, "Supplier updated successfully."));
  });
};

const addToCart = (request, response) => {
  const subCategoryId = request.params.id;
  const quantity = request.body.quantity;
  const supplierId = request.body.supplier_id;

  // Check if the required fields are provided
  if (!subCategoryId || !quantity) {
    return response.status(400).json(
      reply.onError(400, null, "Missing required fields: subCategoryId or quantity.")
    );
  }

  const values = [subCategoryId, quantity, supplierId];
  const statement = `INSERT INTO ${supplier.SUPPLIER_CART} (subcategory_id, quantity_kg, supplier_id) VALUES (?, ?, ?)`;

  db.execute(statement, values, (error, result) => {
    if (error) {
      return response.status(500).json(
        reply.onError(500, error, "Error adding item to cart. Please try again.")
      );
    } else {
      return response.status(201).json(
        reply.onSuccess(201, result, "Order item added to cart successfully.")
      );
    }
  });
};

const removeFromCart = (request, response) => {
  const cartId = request.params.id;

  if (!cartId) {
    return response.status(400).json(
      reply.onError(400, null, "Cart item ID is required.")
    );
  }

  const statement = `DELETE FROM ${supplier.SUPPLIER_CART} WHERE item_id = ?`;

  db.execute(statement, [cartId], (error, result) => {
    if (error) {
      return response.status(500).json(
        reply.onError(500, error, "Error removing item from cart.")
      );
    }

    if (result.affectedRows === 1) {
      return response.status(200).json(
        reply.onSuccess(200, result, "Order item removed from cart successfully.")
      );
    } else {
      return response.status(404).json(
        reply.onError(404, result, "Item not found in the cart.")
      );
    }
  });
};

const showCart = (request, response) => {
  const supplierId = request.params.id;

  if (!supplierId) {
    return response
      .status(400)
      .json(reply.onError(400, null, "Supplier ID is required."));
  }

  const statement = `SELECT s.item_id, t.subcategory_name, t.price_per_kg, t.subcategory_image, t.category_description, s.quantity_kg FROM ${supplier.SUPPLIER_CART} s JOIN ${supplier.TRASH_SUBCATEGORIES} t ON s.subcategory_id = t.subcategory_id WHERE s.supplier_id = ${supplierId}`;

  db.execute(statement, (error, results) => {
    if (error) {
      return response
        .status(500)
        .json(reply.onError(500, error, "Error fetching the supplier cart items."));
    }

    if (results.length > 0) {
      return response
        .status(200)
        .json(reply.onSuccess(200, results, "Supplier cart items fetched successfully."));
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
      .json(reply.onError(400, null, "Missing supplierId or pickupId in request body."));
  }

  const statement = `CALL create_supplier_order_from_cart(?, ?)`;

  db.execute(statement, [supplierId, pickupId], (error, result) => {
    if (error) {
      return response
        .status(500)
        .json(reply.onError(500, error, "Failed to place order. Please try again."));
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
      response.status(500).json(reply.onError(500, error, "Failed to retrieve orders"));
    } else {
      if (result.length === 0) {
        response.status(200).json(reply.onSuccess(200, [], "No orders found"));
      } else {
        response.status(200).json(reply.onSuccess(200, result, "Orders retrieved successfully"));
      }
    }
  });
};

const getSupplierById = (request, response) => {
  const supplierId = request.params.id;

  const statement = `SELECT supplier_id, first_name, last_name, mobile_number, state, city, pincode, imageName, supplier_type AS type, supplier_status AS status FROM supplier_v WHERE supplier_id = ?`;

  db.execute(statement, [supplierId], (error, results) => {
    if (error) {
      return response
        .status(500)
        .json(reply.onError(500, error, "Error fetching supplier details."));
    }

    if (results.length > 0) {
      return response
        .status(200)
        .json(reply.onSuccess(200, results[0], "Supplier details fetched successfully."));
    }

    return response
      .status(404)
      .json(reply.onError(404, null, "Supplier not found."));
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
      response.status(500).json(reply.onError(500, error, "Failed to retrieve order details"));
    } else {
      if (result.length === 0) {
        response.status(200).json(reply.onSuccess(200, [], "No order details found"));
      } else {
        response.status(200).json(reply.onSuccess(200, result, "Order details retrieved successfully"));
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


module.exports = {
  registerSupplier,
  loginSupplier,
  getSupplierByMobile,
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
  getSupplierById
};
