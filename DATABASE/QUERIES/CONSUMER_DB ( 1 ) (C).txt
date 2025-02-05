-- Consumer Table
CREATE TABLE consumer (
    consumer_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    mobile_number VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    imageName VARCHAR(50) DEFAULT 'default.jpg',
    pincode VARCHAR(20) NOT NULL,
    consumer_type ENUM('Individual', 'Organization', 'Government') NOT NULL DEFAULT 'Individual',

    -- Maintaining logs (Timestamps and user modification tracking)
    consumer_status ENUM('Active','InActive') NOT NULL DEFAULT 'Active',
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP INVISIBLE,
    last_modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP INVISIBLE,
    last_modified_by VARCHAR(255) DEFAULT (CURRENT_USER) INVISIBLE,

    -- Hidden columns for future use 
    extra_col1 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col2 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col3 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col4 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col5 VARCHAR(255) DEFAULT NULL INVISIBLE
);

-- Create separate indexes after Consumer creation
CREATE INDEX idx_consumer_first_name ON consumer (first_name);

-- RecyclingCategories Table
CREATE TABLE recyclingCategories (
    rp_category_id INT PRIMARY KEY AUTO_INCREMENT,
    rp_category_name VARCHAR(255) NOT NULL UNIQUE,
    rp_category_image VARCHAR(50) NOT NULL,
    category_description TEXT NOT NULL,

    -- Maintaining the logs of operations
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP INVISIBLE,
    last_modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP INVISIBLE,
    last_modified_by VARCHAR(255) NOT NULL DEFAULT (CURRENT_USER) INVISIBLE,

    -- Extra columns for future use
    extra_col1 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col2 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col3 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col4 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col5 VARCHAR(255) DEFAULT NULL INVISIBLE
);

-- RecyclingSubcategories
CREATE TABLE recyclingSubcategories (
    subcategory_id INT AUTO_INCREMENT PRIMARY KEY,
    rp_category_id INT,
    subcategory_name VARCHAR(255) NOT NULL UNIQUE,
    subcategory_image VARCHAR(50) NOT NULL,
    price_per_kg FLOAT NOT NULL CHECK (price_per_kg >=1),
    category_description TEXT NOT NULL,

    -- Maintaining the logs of Operations
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP INVISIBLE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP INVISIBLE,
    last_modified_by VARCHAR(255) NOT NULL DEFAULT (CURRENT_USER) INVISIBLE,

        -- Hidden columns for future use 
    extra_col1 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col2 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col3 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col4 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col5 VARCHAR(255) DEFAULT NULL INVISIBLE,

    -- Foreign key
    FOREIGN KEY (rp_category_id) REFERENCES recyclingCategories(rp_category_id) ON DELETE SET NULL
);

-- ConsumerSelection Table (many to many relationship with consumer and recycling categories)
CREATE TABLE consumerSelections (
    selection_id INT AUTO_INCREMENT PRIMARY KEY,
    consumer_id INT,
    rp_category_id INT,
  
    -- Foreign key constraints
    FOREIGN KEY (consumer_id) REFERENCES consumer(consumer_id) ON DELETE SET NULL,
    FOREIGN KEY (rp_category_id) REFERENCES recyclingCategories(rp_category_id) ON DELETE SET NULL
);

-- DeliveryAddress
CREATE TABLE deliveryAddress (
    delivery_id INT PRIMARY KEY AUTO_INCREMENT,
    consumer_id INT,
    consumer_name VARCHAR(255) NOT NULL,
    state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    street_name VARCHAR(255),
    landmark VARCHAR(255),

    -- Maintaining the logs of operations
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP INVISIBLE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP INVISIBLE,

            -- Hidden columns for future use 
    extra_col1 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col2 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col3 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col4 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col5 VARCHAR(255) DEFAULT NULL INVISIBLE,

    -- Foreign key
    FOREIGN KEY (consumer_id) REFERENCES consumer(consumer_id) ON DELETE SET NULL
);

-- ConsumerOrder table
CREATE TABLE consumerOrders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    consumer_id INT ,
    order_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    order_time TIME NOT NULL DEFAULT (CURRENT_TIME),
    delivery_id INT,
    order_status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',

    -- Maintaining the logs of Operations
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP INVISIBLE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP INVISIBLE,

            -- Hidden columns for future use 
    extra_col1 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col2 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col3 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col4 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col5 VARCHAR(255) DEFAULT NULL INVISIBLE,

    -- Foreign key
    FOREIGN KEY (consumer_id) REFERENCES consumer(consumer_id) ON DELETE SET NULL,
    FOREIGN KEY (delivery_id) REFERENCES deliveryAddress(delivery_id) ON DELETE SET NULL
);

-- Consumer Order Item table
CREATE TABLE consumerOrderItems (
    item_id INT NOT NULL,
    order_id INT NOT NULL,
    subcategory_id INT,
    -- Quantity must be greater than equal to 1Kg
    quantity_kg FLOAT NOT NULL CHECK(quantity_kg >= 1),

    -- Hidden columns for future use
    extra_col1 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col2 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col3 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col4 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col5 VARCHAR(255) DEFAULT NULL INVISIBLE,

    -- Composite primary key
    PRIMARY KEY (item_id, order_id),

    -- Foreign keys
    FOREIGN KEY (order_id) REFERENCES consumerOrders(order_id),
    FOREIGN KEY (subcategory_id) REFERENCES recyclingSubcategories(subcategory_id) ON DELETE SET NULL
);


-- Consumer Order Cart table
CREATE TABLE consumerCart ( 
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    subcategory_id INT,
    -- Quantity must be greater than 1Kg
    quantity_kg FLOAT NOT NULL CHECK(quantity_kg > 1),

    -- Hidden columns for future use 
    extra_col1 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col2 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col3 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col4 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col5 VARCHAR(255) DEFAULT NULL INVISIBLE,
    -- Foreign keys
    FOREIGN KEY (subcategory_id) REFERENCES recyclingSubcategories(subcategory_id) ON DELETE SET NULL
);

-- View for Consumer
CREATE VIEW consumer_v AS
SELECT 
    consumer_id,
    first_name,
    last_name,
    email,
    mobile_number,
    password,
    state,
    city,
    pincode,
    imageName,
    consumer_type,
    consumer_status
FROM consumer;

-- View for Recycling Categories
CREATE VIEW recyclingCategories_v AS
SELECT 
    rp_category_id,
    rp_category_name,
    rp_category_image,
    category_description
FROM recyclingCategories;

-- View for Recycling Subcategories
CREATE VIEW recyclingSubcategories_v AS
SELECT 
    subcategory_id,
    rp_category_id,
    subcategory_name,
    price_per_kg,
    subcategory_image,
    category_description
FROM recyclingSubcategories;

-- View for Consumer Selections
CREATE VIEW consumerSelections_v AS
SELECT 
    selection_id,
    consumer_id,
    rp_category_id
FROM consumerSelections;

-- View for Consumer Order Items
CREATE VIEW consumerOrderitems_v AS
SELECT 
    item_id,
    order_id,
    subcategory_id,
    quantity_kg
FROM consumerOrderItems;

-- View for Consumer Order Items
CREATE VIEW consumerCart_v AS
SELECT 
    item_id,
    subcategory_id,
    quantity_kg
FROM consumerCart;

-- View for Consumer Orders
CREATE VIEW consumerOrders_v AS
SELECT 
    order_id,
    consumer_id,
    order_date,
    order_time,
    delivery_id,
    order_status
FROM consumerOrders;

-- View for Delivery Address
CREATE VIEW deliveryAddress_v AS
SELECT 
    delivery_id,
    consumer_id,
    consumer_name,
    state,
    city,
    pincode,
    street_name,
    landmark
FROM deliveryAddress;
