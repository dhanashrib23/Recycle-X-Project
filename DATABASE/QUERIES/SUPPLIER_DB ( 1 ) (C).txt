-- Supplier Table
CREATE TABLE supplier (
    supplier_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    mobile_number VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    state VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    imageName VARCHAR(50) DEFAULT 'default.jpg',
    pincode CHAR(6) NOT NULL,
    supplier_type ENUM('Individual', 'Organization', 'Government') NOT NULL DEFAULT 'Individual',
    
    -- Maintaining the logs of Operations
    supplier_status ENUM('Active','InActive') NOT NULL DEFAULT 'Active',
    registered_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP  INVISIBLE,
    last_modified_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP INVISIBLE,
    last_modified_by VARCHAR(255)  DEFAULT (CURRENT_USER) INVISIBLE,

    -- Extra column for future use
    extra_col1 VARCHAR(255)  DEFAULT NULL INVISIBLE,
    extra_col2 VARCHAR(255)  DEFAULT NULL INVISIBLE,
    extra_col3 VARCHAR(255)  DEFAULT NULL INVISIBLE,
    extra_col4 VARCHAR(255)  DEFAULT NULL INVISIBLE,
    extra_col5 VARCHAR(255)  DEFAULT NULL INVISIBLE
);

-- Indexes on the Supplier Table
CREATE INDEX idx_supplier_first_name ON supplier (first_name);

-- ServiceZones table (Common for both Supplier & Consumer)
CREATE TABLE serviceZones (
    pincode VARCHAR(10) PRIMARY KEY,
    state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    service_type ENUM('Delivery', 'Pickup', 'Both') NOT NULL,

    -- Extra column for future use
    extra_col1 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col2 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col3 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col4 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col5 VARCHAR(255) DEFAULT NULL INVISIBLE
);


-- Trash Categories Table
CREATE TABLE trashCategories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255) NOT NULL UNIQUE,
    category_image VARCHAR(50) NOT NULL,
    category_description TEXT NOT NULL,

    -- Maintaining the logs of Operations
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP INVISIBLE,
    last_modified_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP INVISIBLE,
    last_modified_by VARCHAR(255)  NOT NULL DEFAULT (CURRENT_USER) INVISIBLE,

    -- Extra column for future use
    extra_col1 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col2 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col3 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col4 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col5 VARCHAR(255) DEFAULT NULL INVISIBLE
);

-- Trash Sub-Categories Table
CREATE TABLE trashSubCategories (
    subcategory_id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    subcategory_name VARCHAR(255) NOT NULL UNIQUE,
    price_per_kg FLOAT NOT NULL,
    subcategory_image VARCHAR(50) NOT NULL,
    category_description TEXT NOT NULL,

    -- Maintaining the logs of Operations    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP INVISIBLE,
    last_modified_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP INVISIBLE,
    last_modified_by VARCHAR(255)  NOT NULL DEFAULT (CURRENT_USER) INVISIBLE,

    -- Extra column for future use
    extra_col1 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col2 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col3 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col4 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col5 VARCHAR(255) DEFAULT NULL INVISIBLE,

    -- Foreign key 
    FOREIGN KEY (category_id) REFERENCES trashCategories(category_id) ON DELETE SET NULL
);


-- (Many to Many Relationship table) Supplier & Categories
CREATE TABLE supplierSelections (
    selection_id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_id INT ,
    category_id INT ,

    -- Extra column for future use
    extra_col1 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col2 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col3 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col4 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col5 VARCHAR(255) DEFAULT NULL INVISIBLE,

    -- Foreign key 
    FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES trashCategories(category_id) ON DELETE SET NULL
);


-- Pickup Address for each order
CREATE TABLE pickupAddress (
    pickup_id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_id INT,
    supplier_name VARCHAR(255) NOT NULL,
    state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    street_name VARCHAR(255),
    landmark VARCHAR(255),

    -- Maintaining the logs of Operations   
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP INVISIBLE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP INVISIBLE,

    -- Extra column for future use
    extra_col1 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col2 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col3 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col4 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col5 VARCHAR(255) DEFAULT NULL INVISIBLE,

    -- Foreign key 
    FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id) ON DELETE SET NULL
);

-- Supplier Order table
CREATE TABLE supplierOrders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_id INT,
    order_date DATE NOT NULL DEFAULT (CURRENT_DATE),  
    order_time TIME NOT NULL DEFAULT (CURRENT_TIME), 
    pickup_id INT,
    order_status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    -- Maintaining the logs of Operations
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP INVISIBLE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP INVISIBLE,

    -- Extra column for future use
    extra_col1 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col2 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col3 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col4 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col5 VARCHAR(255) DEFAULT NULL INVISIBLE,

    -- Foreign key
    FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id) ON DELETE SET NULL,
    FOREIGN KEY (pickup_id) REFERENCES pickupAddress(pickup_id) ON DELETE SET NULL
);


-- Supplier Order Item table
CREATE TABLE supplierOrderItems (
    item_id INT NOT NULL,
    order_id INT NOT NULL,
    subcategory_id INT,
    -- Quantity must be greater than 1Kg
    quantity_kg FLOAT NOT NULL CHECK(quantity_kg >=1),

    -- Extra column for future use
    extra_col1 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col2 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col3 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col4 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col5 VARCHAR(255) DEFAULT NULL INVISIBLE,

       -- Composite primary key
    PRIMARY KEY (item_id, order_id),

    -- Foreign key 
    FOREIGN KEY (order_id) REFERENCES supplierOrders(order_id),
    FOREIGN KEY (subcategory_id) REFERENCES trashSubCategories(subcategory_id) ON DELETE SET NULL
);

-- Supplier Order Cart table
CREATE TABLE supplierCart (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    subcategory_id INT,
    -- Quantity must be greater than 1Kg
    quantity_kg FLOAT NOT NULL CHECK(quantity_kg > 1),

    -- Extra column for future use
    extra_col1 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col2 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col3 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col4 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col5 VARCHAR(255) DEFAULT NULL INVISIBLE,

    -- Foreign key 
    FOREIGN KEY (subcategory_id) REFERENCES trashSubCategories(subcategory_id) ON DELETE SET NULL
);



-- View for Supplier Table
CREATE VIEW supplier_v AS
SELECT 
    supplier_id,
    first_name,
    last_name,
    mobile_number,
    password,
    state,
    city,
    pincode,
    imageName,
    supplier_type,
    supplier_status
FROM supplier;

-- View for ServiceZones Table
CREATE VIEW serviceZones_v AS
SELECT 
    pincode,
    state,
    city,
    district,
    service_type
FROM serviceZones;

-- View for TrashCategories Table
CREATE VIEW trashCategories_v AS
SELECT 
    category_id,
    category_name,
    category_image,
    category_description
FROM trashCategories;

-- View for TrashSubCategories Table
CREATE VIEW trashSubCategories_v AS
SELECT 
    subcategory_id,
    category_id,
    subcategory_name,
    price_per_kg,
    subcategory_image,
    category_description
FROM trashSubCategories;

-- View for SupplierSelections Table
CREATE VIEW supplierSelections_v AS
SELECT 
    selection_id,
    supplier_id,
    category_id
FROM supplierSelections;

-- View for Supplier OrderItems Table
CREATE VIEW supplierOrderItems_v AS
SELECT 
    item_id,
    order_id,
    subcategory_id,
    quantity_kg
FROM supplierOrderItems;

CREATE VIEW supplierCart_v AS
SELECT 
    item_id,
    subcategory_id,
    quantity_kg
FROM supplierCart;

-- View for SupplierOrders Table
CREATE VIEW supplierOrders_v AS
SELECT 
    order_id,
    supplier_id,
    order_date,
    order_time,
    pickup_id,
    order_status
FROM supplierOrders;

-- View for PickupAddress Table
CREATE VIEW pickupAddress_v AS
SELECT 
    pickup_id,
    supplier_id,
    supplier_name,
    state,
    city,
    pincode,
    street_name,
    landmark
FROM pickupAddress;
 