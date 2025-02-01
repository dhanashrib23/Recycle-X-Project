
-- ======================= CONSUMER CART=========================
DELIMITER //
-- Create a procedure to handle the entire order process
CREATE PROCEDURE create_consumer_order_from_cart(
    IN p_consumer_id INT,
    IN p_delivery_id INT
)
BEGIN
    DECLARE new_order_id INT;
    
    -- Start transaction
    START TRANSACTION;
    
    -- Insert the order
    INSERT INTO consumerOrders(consumer_id, delivery_id)
    VALUES (p_consumer_id, p_delivery_id);
    
    -- Get the new order ID
    SET new_order_id = LAST_INSERT_ID();
    
    -- Transfer cart items to order items
    INSERT INTO consumerOrderItems (item_id, order_id, subcategory_id, quantity_kg)
    SELECT 
        item_id,
        new_order_id,
        subcategory_id,
        quantity_kg
    FROM consumerCart;
    
    -- Truncate the cart (this works in a procedure)
    TRUNCATE TABLE consumerCart;
    
    -- Commit the transaction
    COMMIT;
END //
DELIMITER ;

-- ================= CONSUMER REGISTRATION=======================
DELIMITER //

CREATE PROCEDURE register_consumer(
    IN p_first_name VARCHAR(255),
    IN p_last_name VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_mobile_number VARCHAR(15),
    IN p_password VARCHAR(255),
    IN p_state VARCHAR(255),
    IN p_city VARCHAR(255),
    IN p_pincode VARCHAR(20),
    IN p_consumer_type ENUM('Individual', 'Organization', 'Government')
)
BEGIN
    DECLARE new_consumer_id INT;
    DECLARE full_name VARCHAR(511);

    -- Start transaction to ensure both inserts succeed or none does
    START TRANSACTION;
    
    -- Insert into consumer table
    INSERT INTO consumer (
        first_name,
        last_name,
        email,
        mobile_number,
        password,
        state,
        city,
        pincode,
        consumer_type
    ) VALUES (
        p_first_name,
        p_last_name,
        p_email,
        p_mobile_number,
        p_password,
        p_state,
        p_city,
        p_pincode,
        p_consumer_type
    );
    
    -- Get the new consumer_id
    SET new_consumer_id = LAST_INSERT_ID();
    
    -- Concatenate first_name and last_name
    SET full_name = CONCAT(p_first_name, ' ', p_last_name);
    
    -- Insert into deliveryAddress table
    INSERT INTO deliveryAddress (
        consumer_id,
        consumer_name,
        state,
        city,
        pincode,
        street_name,
        landmark
    ) VALUES (
        new_consumer_id,
        full_name,
        p_state,
        p_city,
        p_pincode,
        '',  -- Empty string for street_name
        ''   -- Empty string for landmark
    );
    
    -- If everything is successful, commit the transaction
    COMMIT;

END //

DELIMITER ;

-- ================= SUPPLIER REGISTRATION=======================
DELIMITER //

CREATE PROCEDURE register_supplier(
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_mobile_number VARCHAR(15),
    IN p_password VARCHAR(255),
    IN p_state VARCHAR(50),
    IN p_city VARCHAR(50),
    IN p_pincode CHAR(6),
    IN p_supplier_type ENUM('Individual', 'Organization', 'Government')
)
BEGIN
    DECLARE new_supplier_id INT;
    DECLARE full_name VARCHAR(101);

    -- Start transaction to ensure both inserts succeed or none does
    START TRANSACTION;
    
    -- Insert into supplier table
    INSERT INTO supplier (
        first_name,
        last_name,
        mobile_number,
        password,
        state,
        city,
        pincode,
        supplier_type
    ) VALUES (
        p_first_name,
        p_last_name,
        p_mobile_number,
        p_password,
        p_state,
        p_city,
        p_pincode,
        p_supplier_type
    );
    
    -- Get the new supplier_id
    SET new_supplier_id = LAST_INSERT_ID();
    
    -- Concatenate first_name and last_name
    SET full_name = CONCAT(p_first_name, ' ', p_last_name);
    
    -- Insert into pickupAddress table
    INSERT INTO pickupAddress (
        supplier_id,
        supplier_name,
        state,
        city,
        pincode,
        street_name,
        landmark
    ) VALUES (
        new_supplier_id,
        full_name,
        p_state,
        p_city,
        p_pincode,
        '',  -- Empty string for street_name
        ''   -- Empty string for landmark
    );
    
    -- If everything is successful, commit the transaction
    COMMIT;

END //

DELIMITER ;

-- ======================= SUPPLIER CART=========================
DELIMITER //

CREATE PROCEDURE create_supplier_order_from_cart(
    IN p_supplier_id INT,
    IN p_pickup_id INT
)
BEGIN
    DECLARE new_order_id INT;
    
    -- Start transaction
    START TRANSACTION;
    
    -- Create new supplier order with default status 'pending'
    INSERT INTO supplierOrders(supplier_id, pickup_id)
    VALUES (p_supplier_id, p_pickup_id);
    
    -- Get the new order ID
    SET new_order_id = LAST_INSERT_ID();
    
    -- Transfer items from cart to order items
    INSERT INTO supplierOrderItems (
        item_id,
        order_id,
        subcategory_id,
        quantity_kg
    )
    SELECT 
        item_id,
        new_order_id,
        subcategory_id,
        quantity_kg
    FROM supplierCart;
    
    -- Clear the cart after successful transfer
    TRUNCATE TABLE supplierCart;
    
    -- Commit the transaction
    COMMIT;
    
    -- Return the new order ID for reference
    SELECT new_order_id AS order_id;
    
END //

DELIMITER ;