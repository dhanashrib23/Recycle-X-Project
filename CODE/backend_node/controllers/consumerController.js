const db = require("../DBUtils/connection");
const { consumer } = require("../DBUtils/constants");
const config = require("../App/appConfig");
const reply = require("../models/responseStructure");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const otpStore = new Map();

// Consumer Controller
const registerConsumer = (request, response) => {
  const encryptPass = String(crypto.SHA256(request.body.password));

  const userData = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    mobileNumber: request.body.mobileNumber,
    encryptPass: encryptPass,
    state: request.body.state,
    city: request.body.city,
    pincode: request.body.pincode,
    consumerType: request.body.consumerType,
  };

  const otp = generateOTP();
  otpStore.set(userData.email, { ...userData, otp });

  sendOTPEmail(userData.email, otp)
    .then(() => {
      response.status(200).json(reply.onSuccess(200, null, "OTP sent to your email. Please verify."));
    })
    .catch((error) => {
      response.status(500).json(reply.onError(500, error, "Failed to send OTP. Please try again."));
    });
};

const verifyEmailThenRegister = (request, response) => {
  const otp = request.body.otp;

  if (!otp) {
    return response.status(400).json(reply.onError(400, null, "OTP is required to verify your email."));
  }

  let matchedEmail = null;
  for (const [email, data] of otpStore.entries()) {
    if (data.otp === otp) {
      matchedEmail = email;
      break;
    }
  }

  if (!matchedEmail) {
    return response.status(400).json(reply.onError(400, matchedEmail, "Invalid OTP. Please try again."));
  }

  const userData = otpStore.get(matchedEmail);

  // Insert into database
  const values = [
    userData.firstName,
    userData.lastName,
    userData.email,
    userData.mobileNumber,
    userData.encryptPass,
    userData.state,
    userData.city,
    userData.pincode,
    userData.consumerType,
  ];

  const statement = `CALL register_consumer(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.execute(statement, values, (error, result) => {
    if (error) {
      return response.status(400).json(reply.onError(400, error, "Failed to register consumer. Please try again."));
    }

    otpStore.delete(matchedEmail);
    return response.status(201).json(reply.onSuccess(201, result, "Consumer registered successfully."));
  });
};

const generateOTP = () => {
  return otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false
  });
};

const sendOTPEmail = (userEmail, otp) => {

  let configurationDetails = {
    service: "gmail",
    auth: {
      user: config.RECYCLE_X_EMAIL,
      pass: config.RECYCLE_X_PASSWD,
    },
  };

  let transporter = nodemailer.createTransport(configurationDetails);

  let message = {
    from: config.RECYCLE_X_EMAIL,
    to: userEmail,
    subject: "OTP Verification : Recycle_X",
    html: `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recycle X Verification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f6fb;">
    <div style="max-width: 480px; margin: 40px auto; background: linear-gradient(180deg, #ffffff 0%, #f8f9ff 100%); border-radius: 16px; box-shadow: 0 4px 24px rgba(46, 125, 50, 0.1); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
        <!-- Top Banner -->
        <div style="background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%); padding: 2px; border-radius: 16px;">
            <div style="background: #ffffff; border-radius: 15px;">
                <!-- Content Container -->
                <div style="padding: 32px 24px; text-align: center;">
                    <!-- Logo Container -->
                    <div style="background: #e8f5e9; width: 72px; height: 72px; border-radius: 20px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center;">
                        <img src="https://i.imghippo.com/files/Dk9642QMA.png" alt="Recycle X Logo" style="width: 55px; height: 55px; align : "center" />
                    </div>

                    <!-- Title -->
                    <h1 style="color: #2e7d32; font-size: 24px; font-weight: 600; margin: 0 0 24px 0; line-height: 1.3;">
                        Welcome to Recycle X
                    </h1>

                    <!-- Message -->
                    <div style="background: #f8f9ff; border-radius: 12px; padding: 20px; margin-bottom: 24px; text-align: left;">
                        <p style="color: #4a5568; font-size: 15px; line-height: 1.6; margin: 0;">
                            Thank you for registering with Recycle X. To complete your registration and verify your email address, please use the verification code below.
                        </p>
                    </div>

                    <!-- Timer Warning -->
                    <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
                        <div style="background: #fff4f4; border-radius: 8px; padding: 8px 16px;">
                            <p style="color: #ff4d4d; font-size: 14px; margin: 0; display: flex; align-items: center;">
                                ⏱️ Code expires in <span style="font-weight: 600; margin-left: 4px;">10 minutes</span>
                            </p>
                        </div>
                    </div>

                    <!-- OTP Container -->
                    <div style="background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%); padding: 2px; border-radius: 12px; margin-bottom: 24px;">
                        <div style="background: #ffffff; padding: 20px; border-radius: 10px;">
                            <h2 style="font-family: 'Courier New', monospace; font-size: 36px; font-weight: 700; letter-spacing: 8px; margin: 0; color: #1a202c;">
                                ${otp}
                            </h2>
                        </div>
                    </div>

                    <!-- Security Notice -->
                    <div style="background: #e8f5e9; border-radius: 12px; padding: 16px; text-align: left;">
                        <p style="color: #4a5568; font-size: 13px; line-height: 1.5; margin: 0;">
                            <span style="color: #2e7d32; font-weight: 600;">🔒 Security Notice:</span><br>
                            For your security, this verification code will expire in 10 minutes. Never share this code with anyone. The Recycle X team will never ask for your verification code.
                        </p>
                    </div>
                </div>

                <!-- Footer -->
                <div style="border-top: 1px solid #edf2f7; padding: 20px; text-align: center; border-radius: 0 0 16px 16px;">
                    <p style="color: #718096; font-size: 13px; margin: 0;">
                        Questions? Contact us at <a href="mailto:support@recyclex.com" style="color: #2e7d32; text-decoration: none; font-weight: 500;">support@recyclex.com</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `,
  };

  return transporter.sendMail(message);
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

const getConsumerByEmail = (request, response) => {
  const { email } = request.body;

  if (!email) {
    return response.status(400).json(reply.onError(400, null, "Email is required."));
  }

  const consumerQuery = `SELECT consumer_id AS id, first_name, last_name, email, mobile_number, state, city, pincode, imageName, consumer_type AS type, consumer_status AS status FROM consumer_v WHERE email = '${email}'`;

  db.execute(consumerQuery, (error, results) => {
    if (error) {
      return response
        .status(500)
        .json(reply.onError(500, error, "Database error while fetching consumer details."));
    }

    if (results.length > 0) {
      return response
        .status(200)
        .json(reply.onSuccess(200, results[0], "Consumer details retrieved successfully."));
    }

    return response
      .status(404)
      .json(reply.onError(404, null, "Consumer not found."));
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
  const quantity = request.body.quantity;
  const consumerId = request.body.consumer_id;

  const values = [subCategoryId, consumerId, quantity];

  const statement = `INSERT INTO ${consumer.CONSUMER_CART} (subcategory_id, consumer_id, quantity_kg) VALUES (?, ?, ?)`;

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
  const consumerId = request.params.id;

  const statement = `SELECT c.item_id, r.subcategory_name, r.price_per_kg, r.subcategory_image, r.category_description, c.quantity_kg FROM ${consumer.CONSUMER_CART} c JOIN recyclingsubcategories_v r ON c.subcategory_id = r.subcategory_id WHERE c.consumer_id = ${consumerId}`;

  db.execute(statement, (error, results) => {
    if (error) {
      return response
        .status(400)
        .json(
          reply.onError(
            400,
            error,
            "There was an error fetching the cart items. Please try again later."
          )
        );
    }

    if (results.length > 0) {
      return response
        .status(200)
        .json(
          reply.onSuccess(200, results, "Cart items fetched successfully.")
        );
    } else {
      return response
        .status(404)
        .json(reply.onError(404, null, "Your cart is currently empty."));
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

  const statement = `CALL create_consumer_order_from_cart(?,?)`;

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

      response
        .status(200)
        .json(reply.onSuccess(200, result, "Order placed successfully. We are processing your order."));
    }
  }
  );
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

const getCosumerById = (request, response) => {
  const consumerId = request.params.id;

  const statement = `SELECT consumer_id, first_name, last_name,email, mobile_number, state, city, pincode, imageName, consumer_type AS type, consumer_status AS status FROM consumer_v WHERE consumer_id = ?`;

  db.execute(statement, [consumerId], (error, results) => {
    if (error) {
      return response
        .status(500)
        .json(reply.onError(500, error, "Error fetching consumer details."));
    }

    if (results.length > 0) {
      return response
        .status(200)
        .json(reply.onSuccess(200, results[0], "consumer details fetched successfully."));
    }

    return response
      .status(404)
      .json(reply.onError(404, null, "consumer not found."));
  });
};

module.exports = {
  registerConsumer,
  loginConsumer,
  getConsumerByEmail,
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
  verifyEmailThenRegister,
  getCosumerById
};
