const db = require("../DBUtils/connection");
const { consumer } = require("../DBUtils/constants");
const config = require("../App/appConfig");
const reply = require("../models/responseStructure");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");

// Consumer Controller
const registerConsumer = (request, response) => {
  const encryptPass = String(crypto.SHA256(request.body.password));
  const values = [
    request.body.firstName,
    request.body.lastName,
    request.body.email,
    request.body.mobileNumber,
    encryptPass,
    request.body.state,
    request.body.city,
    request.body.pincode,
    request.body.consumerType,
  ];

  const statement = `CALL register_consumer(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.execute(statement, values, (error, result) => {
    if (error) {
      response
        .status(400)
        .json(
          reply.onError(
            400,
            error,
            "Invalid request. Required fields are missing or incorrect."
          )
        );
    } else {
      if (result.affectedRows === 0) {
        response
          .status(500)
          .json(
            reply.onError(
              500,
              null,
              "Failed to register the consumer. Please try again."
            )
          );
      } else {
        response
          .status(201)
          .json(
            reply.onSuccess(201, result, "Consumer registered successfully.")
          );
      }
    }
  });
};

const loginConsumer = (request, response) => {
  const encryptPass = String(crypto.SHA256(request.body.password));
  const values = [request.body.email, encryptPass];
  const statement = `SELECT first_name, last_name, email, consumer_status 
                     FROM ${consumer.CONSUMER} 
                     WHERE email = ? AND password = ? AND consumer_status = 'Active'`;

  db.execute(statement, values, (error, result) => {
    if (error) {
      response
        .status(500)
        .json(
          reply.onError(
            500,
            error,
            "An error occurred while processing your request. Please try again later."
          )
        );
    } else {
      if (result.length > 0) {
        const user = result[0];
        const payload = {
          firstName: user["first_name"],
          lastName: user["last_name"],
          email: user["email"],
          status: user["consumer_status"],
        };
        const token = jwt.sign(payload, config.SECRET_KEY);

        response
          .status(200)
          .json(
            reply.onLoginSuccess(
              200,
              token,
              "Logged in successfully. Welcome to the application."
            )
          );
      } else {
        response
          .status(401)
          .json(
            reply.onError(
              401,
              null,
              "Invalid credentials or your account is inactive. Please contact support if needed."
            )
          );
      }
    }
  });
};


const updateConsumer = (request, response) => {
  const consumerId = request.params.id;
  const encryptPass = String(crypto.SHA256(request.body.password));
  const values = [
    request.body.firstName,
    request.body.lastName,
    request.body.email,
    request.body.mobileNumber,
    encryptPass,
    request.body.state,
    request.body.city,
    request.body.pincode,
    request.body.consumerType,
    consumerId,
  ];

  const statement = `UPDATE ${consumer.CONSUMER} SET 
    first_name = ?, 
    last_name = ?, 
    email = ?, 
    mobile_number = ?, 
    password = ?, 
    state = ?, 
    city = ?, 
    pincode = ?, 
    consumer_type = ? 
    WHERE consumer_id = ?`;

  db.execute(statement, values, (error, result) => {
    if (error) {
      response
        .status(400)
        .json(
          reply.onError(
            400,
            error,
            "Failed to update consumer details. Please check the data and try again."
          )
        );
    } else if (result.affectedRows === 0) {
      response
        .status(404)
        .json(
          reply.onError(
            404,
            null,
            "Consumer not found with the provided ID. Please verify the consumer ID."
          )
        );
    } else {
      response
        .status(200)
        .json(reply.onSuccess(200, result, "Consumer updated successfully."));
    }
  });
};

const addToCart = (request, response) => {
  const subCategoryId = request.params.id;
  const { quantity } = request.body;
  const values = [subCategoryId, quantity];
  const statement = `INSERT INTO ${consumer.CONSUMER_CART} (subcategory_id, quantity_kg) VALUES (?, ?)`;

  db.execute(statement, values, (error, result) => {
    if (error) {
      response
        .status(400)
        .json(
          reply.onError(
            400,
            error,
            "There was an error in the request. Please ensure all required fields are provided correctly."
          )
        );
    } else {
      response
        .status(201)
        .json(
          reply.onSuccess(201, result, "Order item has been successfully added to the cart.")
        );
    }
  });
};

const removeFromCart = (request, response) => {
  const cartId = request.params.id;
  const statement = `DELETE FROM ${consumer.CONSUMER_CART} WHERE item_id = ${cartId}`;

  db.execute(statement, (error, result) => {
    if (error) {
      response
        .status(400)
        .json(
          reply.onError(
            400,
            error,
            "There was an error with the request. Please verify the input and try again."
          )
        );
    } else {
      console.log(result.affectedRows);
      if (result.affectedRows == 1) {
        response
          .status(200)
          .json(
            reply.onSuccess(
              200,
              result,
              "Order item has been successfully removed from the cart."
            )
          );
      } else {
        response
          .status(404)
          .json(
            reply.onError(
              404,
              result,
              "The item was not found in the cart or the cart is already empty."
            )
          );
      }
    }
  });
};

const showCart = (request, response) => {
  const statement = `SELECT * FROM ${consumer.CONSUMER_CART}`;

  db.execute(statement, (error, results) => {
    if (error) {
      response
        .status(400)
        .json(
          reply.onError(
            400,
            error,
            "There was an error fetching the cart items. Please try again later."
          )
        );
    } else {
      if (results.length > 0) {
        response
          .status(200)
          .json(
            reply.onSuccess(200, results, "Cart items fetched successfully.")
          );
      } else {
        response
          .status(404)
          .json(reply.onError(404, null, "Your cart is currently empty."));
      }
    }
  });
};

const addDeliveryAddress = (request, response) => {
  const values = [
    request.body.consumerId,
    request.body.consumerName,
    request.body.state,
    request.body.city,
    request.body.pincode,
    request.body.streetName,
    request.body.landmark,
  ];

  const statement = `INSERT INTO ${consumer.DELIVERY_ADDRESS} (consumer_id, consumer_name, state, city, pincode, street_name, landmark) VALUES
  (?,?,?,?,?,?,?)`;

  db.execute(statement, values, (error, result) => {
    if (error) {
      response
        .status(400)
        .json(
          reply.onError(
            400,
            error,
            "There was an issue with the request. Please ensure all required fields are provided correctly."
          )
        );
    } else {
      response
        .status(201)
        .json(
          reply.onSuccess(201, result, "Delivery address has been successfully added.")
        );
    }
  });
};


const updateDeliveryAddress = (request, response) => {
  const deliveryId = request.params.id;
  const values = [
    request.body.consumerId,
    request.body.consumerName,
    request.body.state,
    request.body.city,
    request.body.pincode,
    request.body.streetName,
    request.body.landmark,
    deliveryId,
  ];

  const statement = `UPDATE ${consumer.DELIVERY_ADDRESS} SET 
    consumer_id = ?, 
    consumer_name = ?, 
    state = ?, 
    city = ?, 
    pincode = ?, 
    street_name = ?,
    landmark = ? 
    WHERE  delivery_id = ?`;

  db.execute(statement, values, (error, result) => {
    if (error) {
      response
        .status(400)
        .json(
          reply.onError(
            400,
            error,
            "Failed to update address. Please ensure the delivery ID is correct and all required fields are provided."
          )
        );
    } else {
      if (result.affectedRows === 0) {
        response
          .status(404)
          .json(
            reply.onError(404, null, "Address not found or no changes were made.")
          );
      } else {
        response
          .status(200)
          .json(
            reply.onSuccess(200, result, "Delivery address updated successfully.")
          );
      }
    }
  });
};


const getDeliveryAddress = (request, response) => {
  const statement = `SELECT * FROM ${consumer.DELIVERY_ADDRESS}`;

  db.execute(statement, (error, result) => {
    if (error) {
      response
        .status(500)
        .json(
          reply.onError(
            500,
            error,
            "There was an issue retrieving the delivery addresses. Please try again later."
          )
        );
    } else {
      if (result.length > 0) {
        response
          .status(200)
          .json(reply.onSuccess(200, result, "All delivery addresses fetched successfully."));
      } else {
        response
          .status(404)
          .json(reply.onError(404, null, "No delivery addresses found."));
      }
    }
  });
};


const deleteDeliveryAddress = (request, response) => {
  const deliveryId = request.params.id;

  const statement = `DELETE FROM ${consumer.DELIVERY_ADDRESS} WHERE delivery_id=${deliveryId}`;

  db.execute(statement, (error, result) => {
    if (error) {
      response
        .status(500)
        .json(
          reply.onError(
            500,
            error,
            "There was an issue deleting the delivery address. Please try again later."
          )
        );
    } else {
      if (result.affectedRows > 0) {
        response
          .status(200)
          .json(reply.onSuccess(200, result, "Delivery address deleted successfully."));
      } else {
        response
          .status(404)
          .json(reply.onError(404, null, "No delivery address found with the provided ID."));
      }
    }
  });
};


const placeOrder = (request, response) => {
  const consumer_id = request.body.consumerId;
  const delivery_id = request.body.deliveryId;

  const statement = `CALL create_order_from_cart(?,?)`;

  db.execute(statement, [consumer_id, delivery_id], (error, result) => {
    if (error) {
      response
        .status(500)
        .json(
          reply.onError(
            500,
            error,
            "There was an error processing your order. Please try again later."
          )
        );
    } else {
      if (result.affectedRows > 0) {
        response
          .status(200)
          .json(reply.onSuccess(200, result, "Order placed successfully. We are processing your order."));
      } else {
        response
          .status(400)
          .json(
            reply.onError(
              400,
              null,
              "Unable to place the order. Please ensure your cart is not empty and try again."
            )
          );
      }
    }
  });
};


const getAllOrders = (request, response) => {
  const consumerId = request.params.id;

  const statement = `SELECT DISTINCT
    co.order_id,
    co.consumer_id,
    co.order_date, 
    coi.subcategory_id,
    rs.subcategory_image,
    rs.subcategory_name,
    rs.category_description
FROM 
    ${consumer.CONSUMER_ORDERS} co
LEFT JOIN 
    ${consumer.CONSUMER_ORDER_ITEMS} coi ON co.order_id = coi.order_id
LEFT JOIN 
    ${consumer.RECYCLING_SUBCATEGORIES} rs ON coi.subcategory_id = rs.subcategory_id
WHERE 
    co.consumer_id = ${consumerId}
ORDER BY 
    co.order_date DESC, 
    co.order_id DESC;  
`;

  db.execute(statement, (error, result) => {
    if (error) {
      response
        .status(500)
        .json(
          reply.onError(
            500,
            error,
            "There was an issue retrieving the orders. Please try again later."
          )
        );
    } else {
      if (result.length > 0) {
        response
          .status(200)
          .json(reply.onSuccess(200, result, "Orders retrieved successfully."));
      } else {
        response
          .status(404)
          .json(
            reply.onError(
              404,
              null,
              "No orders found for this consumer. Please check back later."
            )
          );
      }
    }
  });
};


const getOrderItemDetails = (request, response) => {
  const { orderId, itemId } = request.body;

  const statement = `
  SELECT 
    co.order_id,
    co.consumer_id,
    co.order_date,
    co.order_time,
    co.order_status,
    coi.item_id,
    coi.subcategory_id,
    rs.subcategory_name,
    rs.subcategory_image,
    rs.price_per_kg,
    rs.category_description,
    da.consumer_name,
    da.state,
    da.city,
    da.pincode,
    da.street_name,
    da.landmark
  FROM 
    ${consumer.CONSUMER_ORDERS} co
  LEFT JOIN 
    ${consumer.CONSUMER_ORDER_ITEMS} coi ON co.order_id = coi.order_id
  LEFT JOIN 
    ${consumer.RECYCLING_SUBCATEGORIES} rs ON coi.subcategory_id = rs.subcategory_id
  LEFT JOIN 
    ${consumer.DELIVERY_ADDRESS} da ON co.delivery_id = da.delivery_id
  WHERE 
    co.order_id = ? AND coi.item_id = ?;
`;

  db.execute(statement, [orderId, itemId], (error, result) => {
    if (error) {
      response
        .status(500)
        .json(reply.onError(500, error, "Error retrieving order item details. Please try again later."));
    } else {
      if (result.length > 0) {
        response
          .status(200)
          .json(reply.onSuccess(200, result, "Order details retrieved successfully."));
      } else {
        response
          .status(404)
          .json(reply.onError(404, null, "No order item found with the provided details."));
      }
    }
  });
};


const uploadProfileImg = (request, response) => {
  if (!request.file) {
    return response
      .status(400)
      .json(reply.onError(400, null, "No file provided. Please upload a file."));
  }

  const imagePath = `Uploads/Consumer_Images/${request.file.filename}`;
  const consumerId = request.params.id;

  const statement = `UPDATE ${consumer.CONSUMER} SET imageName = ? WHERE consumer_id = ?`;

  db.execute(statement, [imagePath, consumerId], (error, result) => {
    if (error) {
      return response
        .status(500)
        .json(reply.onError(500, error, "Failed to upload profile image. Please try again."));
    }

    if (result.affectedRows === 0) {
      return response
        .status(404)
        .json(reply.onError(404, null, "Consumer not found. Profile image update failed."));
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
  registerConsumer,
  loginConsumer,
  updateConsumer,
  addToCart,
  removeFromCart,
  showCart,
  addDeliveryAddress,
  updateDeliveryAddress,
  deleteDeliveryAddress,
  getDeliveryAddress,
  placeOrder,
  getAllOrders,
  getOrderItemDetails,
  uploadProfileImg,
};
