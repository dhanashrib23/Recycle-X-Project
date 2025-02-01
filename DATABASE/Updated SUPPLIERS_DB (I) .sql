SUPPLIERS TABLE =

INSERT INTO supplier (
    supplier_id, first_name, last_name, mobile_number, password, state, city, pincode, supplier_type, imageName
) VALUES

(1, 'Samarth', 'Zadbuke', '8765432109', '123', 'Delhi', 'New Delhi', '110001', 'Government', ''),
(2, 'Samarth', 'Zadbuke', '8765432109', '123', 'Delhi', 'New Delhi', '110001', 'Government', ''),
(3, 'Dhanashri', 'Bhosale', '7654321098', '123', 'Karnataka', 'Bangalore', '560001', 'Organization', ''),
(4, 'Trupti', 'Dhone', '6543210987', 'mypassword', 'Maharashtra', 'Pune', '411001', 'Individual', ''),
(5, 'Rajesh', 'Kumar', '5432109876', 'admin@123', 'Tamil Nadu', 'Chennai', '600001', 'Organization', ''),
(6, 'Simran', 'Singh', '4321098765', 'welcome1', 'Punjab', 'Amritsar', '143001', 'Government', ''),
(7, 'Arjun', 'Desai', '3210987654', 'password!', 'Gujarat', 'Ahmedabad', '380001', 'Individual', ''),
(8, 'Neha', 'Agarwal', '2109876543', 'neha@2023', 'West Bengal', 'Kolkata', '700001', 'Organization', ''),
(9, 'Vikram', 'Joshi', '1098765432', 'vikram2023', 'Rajasthan', 'Jaipur', '302001', 'Government', ''),
(10, 'Swati', 'Pandey', '9876543201', 'swati#123', 'Uttar Pradesh', 'Lucknow', '226001', 'Individual', '');

SERVICEZONES_V TABLE=

INSERT INTO serviceZones (
    pincode, state, city, district, service_type
) VALUES
('400001', 'Maharashtra', 'Mumbai', 'Mumbai City', 'Delivery'),
('110001', 'Delhi', 'New Delhi', 'Central Delhi', 'Pickup'),
('560001', 'Karnataka', 'Bangalore', 'Bangalore Urban', 'Both'),
('411001', 'Maharashtra', 'Pune', 'Pune', 'Delivery'),
('600001', 'Tamil Nadu', 'Chennai', 'Chennai', 'Pickup'),
('700001', 'West Bengal', 'Kolkata', 'Kolkata', 'Both'),
('302001', 'Rajasthan', 'Jaipur', 'Jaipur', 'Delivery'),
('143001', 'Punjab', 'Amritsar', 'Amritsar', 'Pickup'),
('226001', 'Uttar Pradesh', 'Lucknow', 'Lucknow', 'Both'),
('500001', 'Telangana', 'Hyderabad', 'Hyderabad', 'Delivery');


TRASHCATEGORIES_V TABLE =
-- Insert categories into the TrashCategories table
INSERT INTO trashCategories (category_id, category_name, category_image, category_description) VALUES
(1, 'PLASTIC', 'plastic.jpg', 'Waste material that includes synthetic or semi-synthetic organic compounds.'),
(2, 'METAL', 'metal.jpg', 'Waste material that consists of metallic substances.'),
(3, 'PAPER', 'paper.jpg', 'Waste material that consists of paper products.'),
(4, 'ELECTRONICS', 'electronics.jpg', 'Waste material consisting of discarded electronic devices.'),
(5, 'GLASS', 'glass.jpg', 'Waste material made up of glass products.'),
(6, 'BIODEGRADABLE', 'biodegradable.jpg', 'Organic waste that can decompose naturally in the environment.'),
(7, 'RUBBER', 'rubber.jpg', 'Turning waste rubber into raw material for new products.'),
(8, 'MIX WASTE', 'mix_waste.jpg', 'A category for waste materials that include a combination of plastic, metal, paper, electronics, glass, biodegradable, and rubber waste. This category contains a variety of waste types that are collected together and require specialized processing for recycling and disposal.');





-- Plastics
INSERT INTO trashSubCategories (subcategory_id, category_id, subcategory_name, price_per_kg, subcategory_image, category_description) VALUES
(1, 1, 'Hard Plastics', 12.0, 'hard_plastics.jpg', 'Hard plastics, including HDPE and PET plastics, are processed by shredding, cleaning, and melting them into usable raw plastic pellets. These can be reused for manufacturing containers, packaging, and products like toys, reducing the need for virgin plastic.'),
(2, 1, 'Soft Plastics', 10.0, 'soft_plastics.jpg', 'Soft plastics are cleaned and shredded before being processed into pellets. These materials are used for packaging, consumer products, and textiles. They are recycled into flexible films, plastic bags, and other useful items.'),
(3, 1, 'Mixed Plastics', 12.0, 'mixed_plastics.jpg', 'Mixed plastics include a combination of soft and hard plastics, often found in packaging and household waste. These materials are sorted, shredded, and recycled into pellets for new products.'),

-- Metals
(4, 2, 'Iron-Based Metals', 18.0, 'iron_metals.jpg', 'Iron and steel are magnetically separated, cleaned, and melted down to form new ingots or billets for manufacturing construction materials, vehicles, and machinery.'),
(5, 2, 'Copper', 25.0, 'copper.jpg', 'Copper is separated, cleaned, and melted into ingots, which are commonly used for electrical wiring, plumbing, and electronics.'),
(6, 2, 'Brass', 22.0, 'brass.jpg', 'Brass is separated by type, cleaned, and melted into ingots for use in decorative items, musical instruments, and industrial components.'),
(7, 2, 'Mixed Metals', 20.0, 'mixed_metals.jpg', 'Mixed metals consist of both iron-based and non-iron-based waste, such as coated wires or multi-metal components. These are separated magnetically and melted down for reuse.'),

-- Paper
(8, 3, 'Newspapers', 4.0, 'newspapers.jpg', 'Newspapers are shredded, cleaned, and processed into pulp, which is then used to produce recycled paper products like packaging materials and insulation.'),
(9, 3, 'High-Quality Paper', 6.0, 'high_quality_paper.jpg', 'High-quality paper is cleaned and processed into pulp, which can then be reused to make new paper products such as stationery, office supplies, and packaging materials.'),
(10, 3, 'Mixed Paper', 5.0, 'mixed_paper.jpg', 'Mixed paper includes a variety of paper products such as newspapers, cardboard, and office paper. These materials are processed into pulp to create recycled paper products.'),

-- Glass
(11, 4, 'Flat Glass', 10.0, 'flat_glass.jpg', 'Flat glass is cleaned, crushed, and melted down to form raw glass material that can be reused in the construction industry for windows, mirrors, and other products.'),
(12, 4, 'Glass Bottles and Jars', 15.0, 'glass_bottles_jars.jpg', 'Glass bottles and jars are cleaned, crushed, and melted down into raw glass material that is used to make new containers, jars, and other packaging products.'),
(13, 4, 'Decorative Glass', 12.0, 'decorative_glass.jpg', 'Decorative glass is sorted, cleaned, and processed into usable raw materials, which are then reused in the production of new glassware and decorative items.'),
(14, 4, 'Mixed Glass', 10.0, 'mixed_glass.jpg', 'Mixed glass includes different types of glass, such as flat glass and bottles, often mixed with other materials. These are cleaned, crushed, and melted into new glass products.'),

-- Electronics
(15, 5, 'Small Electronics', 30.0, 'small_electronics.jpg', 'Small electronics such as phones and cameras are disassembled to recover valuable metals like gold and copper. These are melted and refined for reuse in manufacturing.'),
(16, 5, 'Large Appliances', 50.0, 'large_appliances.jpg', 'Large appliances are dismantled to recover metals, plastics, and other reusable components. These materials are cleaned, processed, and converted into raw materials for manufacturing new products.'),
(17, 5, 'IT Equipment', 40.0, 'it_equipment.jpg', 'Old IT equipment is dismantled, with components like circuit boards, metal parts, and plastics being separated, cleaned, and melted down for reuse in manufacturing.'),
(18, 5, 'Mixed Electronics', 25.0, 'mixed_electronics.jpg', 'Mixed electronics consist of devices containing multiple materials, including metals, plastics, and rubber components. These are disassembled, and valuable materials are extracted for reuse.'),

-- Organic Waste
(19, 6, 'Food Waste', 0.0, 'food_waste.jpg', 'Food waste is composted or converted into biogas, providing organic fertilizer or renewable energy. This waste is processed to reduce landfill impact and promote sustainable agricultural practices.'),
(20, 6, 'Yard Waste', 0.0, 'yard_waste.jpg', 'Yard waste such as grass clippings and leaves is composted, providing valuable organic material for gardening, landscaping, or energy production.'),
(21, 6, 'Other Biodegradable Waste', 0.0, 'other_biodegradable_waste.jpg', 'Other biodegradable waste, such as coffee grounds and paper towels, is composted to provide rich organic material for agriculture and reduce landfill waste.'),
(22, 6, 'Mixed Biodegradable Waste', 2.0, 'mixed_biodegradable_waste.jpg', 'Mixed biodegradable waste consists of food scraps, yard waste, and other organic materials. These are composted or converted into biogas for sustainable use.'),

-- Rubber
(23, 7, 'Tires', 25.0, 'tires.jpg', 'Tires are shredded and processed to reclaim rubber, which is then used for making new tires, road materials, or other industrial products.'),
(24, 7, 'Rubber Products', 20.0, 'rubber_products.jpg', 'Rubber products such as mats and shoes are ground into fine rubber powder, which is used to manufacture new rubber-based products and materials.'),
(25, 7, 'Mixed Rubber', 15.0, 'mixed_rubber.jpg', 'Mixed rubber includes items like tires and other rubber products combined with minor contaminants. These are processed to reclaim rubber for manufacturing.');




SUPPLIER SELECTION TABLE =
-- Example: Inserting data into SupplierSelections
INSERT INTO supplierSelections (supplier_id, category_id) VALUES
(1, 2),  
(3, 4),  
(5, 1);  



-- PickupAddress TABLE =

INSERT INTO pickupAddress (supplier_id, supplier_name, state, city, pincode, street_name, landmark)
VALUES
    (1, 'Samarth Enterprises', 'Maharashtra', 'Mumbai', '400001', 'Marine Drive', 'Near Gateway of India'),
    (2, 'Kumar Suppliers', 'Delhi', 'New Delhi', '110001', 'Connaught Place', 'Opposite Palika Bazaar'),
    (3, 'Bangalore Traders', 'Karnataka', 'Bangalore', '560001', 'MG Road', 'Next to Metro Station'),
    (4, 'Pune Distributors', 'Maharashtra', 'Pune', '411001', 'Shivaji Nagar', 'Near Railway Station'),
    (5, 'Chennai Exports', 'Tamil Nadu', 'Chennai', '600001', 'Anna Salai', 'Near LIC Building'),
    (6, 'Kolkata Imports', 'West Bengal', 'Kolkata', '700001', 'Park Street', 'Beside Flury’s Cafe'),
    (7, 'Jaipur Gems', 'Rajasthan', 'Jaipur', '302001', 'MI Road', 'Opposite Raj Mandir Cinema'),
    (8, 'Amritsar Supplies', 'Punjab', 'Amritsar', '143001', 'Golden Temple Road', 'Near Jallianwala Bagh'),
    (9, 'Lucknow Mart', 'Uttar Pradesh', 'Lucknow', '226001', 'Hazratganj', 'Near Sahara Ganj Mall'),
    (10, 'Hyderabad Depot', 'Telangana', 'Hyderabad', '500001', 'Charminar Area', 'Close to Mecca Masjid');


-- SUPPLIERORDERS TABLE =


INSERT INTO supplierOrders (supplier_id, order_date, order_time, pickup_id, order_status)
VALUES
    (1, '2024-12-01', '10:30:00', 11, 'completed'),
    (2, '2024-12-02', '14:45:00', 12, 'pending'),
    (3, '2024-12-03', '09:15:00', 13, 'completed'),
    (4, '2024-12-04', '16:00:00', 14, 'cancelled'),
    (5, '2024-12-05', '11:20:00', 15, 'completed'),
    (6, '2024-12-06', '13:10:00', 16, 'pending'),
    (7, '2024-12-07', '15:25:00', 17, 'completed'),
    (8, '2024-12-08', '10:00:00', 18, 'cancelled'),
    (9, '2024-12-09', '17:35:00', 19, 'completed'),
    (10, '2024-12-10', '12:05:00', 20, 'pending');




ORDER_ITEM TABLE =

-- Example: Inserting data into OrderItems
INSERT INTO supplierOrderItems (item_id ,order_id, subcategory_id, quantity_kg) VALUES
(1,21, 2, 5.0),-- Order ID 101 for Subcategory ID 2 with 5 kg
(2,22, 5, 3.5),  -- Order ID 102 for Subcategory ID 5 with 3.5 kg
(3,23, 3, 2.2);  -- Order ID 103 for Subcategory ID 3 with 2.2 kg






SUPPLIERORDERCART TABLE =
-- Insert data into SUPPLIERORDERCART
INSERT INTO supplierOrderCart(subcategory_id, quantity_kg)  
VALUES 
  (1, 5.0),  
  (2, 2.5),  
  (1, 3.0),   
(2,33),
(4,22);