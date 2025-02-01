INSERT INTO consumer (
    first_name, last_name, email, mobile_number, password, state, city, pincode, consumer_type, imageName
) VALUES
('Raj', 'Patil', 'rahul.sharma@example.com', '9876543210', 'password123', 'Maharashtra', 'Mumbai', '400001', 'Individual', ''),
('Samarth', 'Zadbuke', 'priya.verma@example.com', '9876543211', 'securepass456', 'Delhi', 'New Delhi', '110001', 'Individual', ''),
('Dhanashri', 'Bhosale', 'ankit.singh@example.com', '9876543212', 'mypassword789', 'Uttar Pradesh', 'Lucknow', '226001', 'Organization', ''),
('Trupti', 'Dhone', 'meera.nair@example.com', '9876543213', 'passme1234', 'Kerala', 'Thiruvananthapuram', '695001', 'Individual', ''),
('Vikram', 'Patel', 'vikram.patel@example.com', '9876543214', 'passkey567', 'Gujarat', 'Ahmedabad', '380001', 'Government', ''),
('Aditi', 'Kulkarni', 'aditi.kulkarni@example.com', '9876543215', 'welcome@123', 'Maharashtra', 'Pune', '411001', 'Individual', ''),
('Karan', 'Malhotra', 'karan.malhotra@example.com', '9876543216', 'passme098', 'Haryana', 'Gurgaon', '122001', 'Organization', ''),
('Riya', 'Chatterjee', 'riya.chatterjee@example.com', '9876543217', 'password567', 'West Bengal', 'Kolkata', '700001', 'Individual', ''),
('Suresh', 'Reddy', 'suresh.reddy@example.com', '9876543218', 'mypwd456', 'Telangana', 'Hyderabad', '500001', 'Government', ''),
('Neha', 'Jain', 'neha.jain@example.com', '9876543219', 'admin123', 'Rajasthan', 'Jaipur', '302001', 'Individual', '');
----------------




RECYCLING CATEGOREY=
-- RecyclingCategories Table
INSERT INTO recyclingCategories (rp_category_name, rp_category_image, category_description) VALUES
('Plastic Recycling', 'plastic_recycling.jpg', 'Collection and Sorting, Cleaning and Preparation, Reprocessing, Forming New Products, Advanced Techniques'),
('Metal Recycling', 'metal_recycling.jpg', 'Collection & Sorting, Cleaning, Shredding/Crushing, Melting, Refining, Casting, Cooling & Solidifying, Forming New Products'),
('Paper Recycling', 'paper_recycling.jpg', 'Collection & Sorting, Shredding, Pulping, Screening & Cleaning, De-Inking, Bleaching, Refining & Mixing, Forming New Paper'),
('Electronics Recycling', 'electronics_recycling.jpg', 'Collection & Sorting, Dismantling, Shredding, Separation, Extraction, Purification, Reforming, Forming New Products'),
('Glass Recycling', 'glass_recycling.jpg', 'Collection & Sorting, Cleaning, Crushing, Melting, Refining, Forming, Cooling & Solidifying'),
('Biodegradable Waste Recycling', 'biodegradable_recycling.jpg', 'Collection & Sorting, Shredding, Composting, Decomposition, Maturation, Screening, Utilization'),
('Rubber Recycling', 'rubber_recycling.jpg', 'Collection & Sorting, Shredding, Grinding, Decontamination, Devulcanization, Reforming, Utilization');





RECYCLINGSUBCATEGOREY=
INSERT INTO recyclingSubcategories (rp_category_id, subcategory_name, subcategory_image, price_per_kg, category_description, created_at, updated_at, last_modified_by) 
VALUES
(1, 'Plastic Granules', 'plastic_granules.jpg', 40.0, 'Recycled plastic converted into granules or pellets, used for manufacturing new plastic products.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, current_user()),
(1, 'Plastic Powder', 'plastic_powder.jpg', 35.0, 'Recycled plastic ground into fine powder for industrial applications like coating and fabrication.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, current_user());

-- Metal Recycling
INSERT INTO RecyclingSubcategories (rp_category_id, subcategory_name, subcategory_image, price_per_kg, category_description, created_at, updated_at, last_modified_by) 
VALUES
(2, 'Metal Sheets', 'metal_sheets.jpg', 120.0, 'Recycled metal converted into sheets for manufacturing vehicles, appliances, and construction materials.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, current_user()),
(2, 'Metal Ingots', 'metal_ingots.jpg', 150.0, 'Pure metal blocks created from recycled metals, used in various industrial processes.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, current_user());

-- Paper Recycling
INSERT INTO RecyclingSubcategories (rp_category_id, subcategory_name, subcategory_image, price_per_kg, category_description, created_at, updated_at, last_modified_by) 
VALUES
(3, 'Recycled Pulp', 'recycled_pulp.jpg', 8.0, 'Recycled paper processed into pulp for producing new paper and packaging materials.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, current_user()),
(3, 'Recycled Cardboard', 'recycled_cardboard.jpg', 10.0, 'Processed cardboard sheets for packaging and shipping industries.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, current_user());

-- Electronics Recycling
INSERT INTO RecyclingSubcategories (rp_category_id, subcategory_name, subcategory_image, price_per_kg, category_description, created_at, updated_at, last_modified_by) 
VALUES
(4, 'Recovered Precious Metals', 'recovered_precious_metals.jpg', 3000.0, 'Metals like gold, silver, and platinum extracted from electronic waste for industrial and jewelry purposes.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, current_user()),
(4, 'Recycled Electronic Components', 'recycled_electronic_components.jpg', 500.0, 'Components like capacitors, chips, and circuits reclaimed from electronics for reuse.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, current_user());

-- Glass Recycling
INSERT INTO RecyclingSubcategories (rp_category_id, subcategory_name, subcategory_image, price_per_kg, category_description, created_at, updated_at, last_modified_by) 
VALUES
(5, 'Crushed Glass (Cullet)', 'crushed_glass.jpg', 12.0, 'Crushed glass particles used in manufacturing new glass products and construction materials.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, current_user()),
(5, 'Recycled Glass Powder', 'recycled_glass_powder.jpg', 15.0, 'Finely ground glass used in applications like road materials and decorative products.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, current_user());

-- Biodegradable Waste Recycling
INSERT INTO RecyclingSubcategories (rp_category_id, subcategory_name, subcategory_image, price_per_kg, category_description, created_at, updated_at, last_modified_by) 
VALUES
(6, 'Organic Compost', 'organic_compost.jpg', 3.0, 'Biodegradable waste processed into nutrient-rich compost for gardening and agriculture.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, current_user()),
(6, 'Biofertilizer', 'biofertilizer.jpg', 5.0, 'Organic fertilizer derived from composted waste, used to enrich soil in farming.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, current_user());

-- Rubber Recycling
INSERT INTO RecyclingSubcategories (rp_category_id, subcategory_name, subcategory_image, price_per_kg, category_description, created_at, updated_at, last_modified_by) 
VALUES
(7, 'Crumb Rubber', 'crumb_rubber.jpg', 20.0, 'Recycled rubber ground into small particles for use in construction and road surfaces.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, current_user()),
(7, 'Rubber Sheets', 'rubber_sheets.jpg', 25.0, 'Processed rubber converted into sheets for industrial applications like gaskets and mats.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, current_user());






CONSUMER SELECTION =
-- Insert data into ConsumerSelections
INSERT INTO consumerSelections(consumer_id, rp_category_id) VALUES
(1, 1),  -- Consumer 1 has selected category 1 (e.g., Hard Plastic)
(2, 3),  -- Consumer 2 has selected category 3 (e.g., Newspaper)
(3, 2),  -- Consumer 3 has selected category 2 (e.g., Ferrous Metals)
(4, 5),  -- Consumer 4 has selected category 5 (e.g., Glass)
(5, 6);  -- Consumer 5 has selected category 6 (e.g., Biodegradable Waste)




DELIVERYADDRESS =

INSERT INTO deliveryAddress(
    consumer_id, consumer_name, state, city, pincode, street_name, landmark
) VALUES
(1, 'Raj Patil', 'Maharashtra', 'Mumbai', '400001', 'Marine Drive', 'Near Gateway of India'),
(2, 'Dhanashri Bhosale', 'Delhi', 'New Delhi', '110001', 'Connaught Place', 'Opposite Palika Bazaar'),
(3, 'Trupti Dhone', 'Uttar Pradesh', 'Lucknow', '226001', 'Hazratganj', 'Near Sahara Ganj Mall'),
(4, 'Samarth Zadbuke', 'Kerala', 'Thiruvananthapuram', '695001', 'MG Road', 'Near Secretariat'),
(5, 'Vikram Patel', 'Gujarat', 'Ahmedabad', '380001', 'CG Road', 'Near Law Garden'),
(6, 'Aditi Kulkarni', 'Maharashtra', 'Pune', '411001', 'Shivaji Nagar', 'Opposite Deccan Gymkhana'),
(7, 'Karan Malhotra', 'Haryana', 'Gurgaon', '122001', 'DLF Phase 1', 'Near Cyber Hub'),
(8, 'Riya Chatterjee', 'West Bengal', 'Kolkata', '700001', 'Park Street', 'Beside Flury’s Cafe'),
(9, 'Suresh Reddy', 'Telangana', 'Hyderabad', '500001', 'Charminar Area', 'Close to Mecca Masjid'),
(10, 'Neha Jain', 'Rajasthan', 'Jaipur', '302001', 'MI Road', 'Opposite Raj Mandir Cinema');




-- CONSUMERORDER TABLE =
INSERT INTO consumerOrders(
    consumer_id, order_date, order_time, delivery_id, order_status
) VALUES
(1, '2024-12-15', '10:30:00', 1, 'completed'),
(2, '2024-12-16', '11:00:00', 2, 'pending'),
(3, '2024-12-17', '14:15:00', 3, 'completed'),
(4, '2024-12-18', '15:45:00', 4, 'cancelled'),
(5, '2024-12-19', '09:00:00', 5, 'pending'),
(6, '2024-12-20', '16:30:00', 6, 'completed'),
(7, '2024-12-21', '18:00:00', 7, 'cancelled'),
(8, '2024-12-22', '12:00:00', 8, 'pending'),
(9, '2024-12-23', '13:45:00', 9, 'completed'),
(10, '2024-12-24', '17:30:00', 10, 'pending');





ORDER_ITEM TABLE =
-- Insert data into OrderItems
insert into consumerOrderItems(item_id,order_id,subcategory_id,quantity_kg) values(1,1,1,1);

insert into consumerOrderItems(item_id,order_id,subcategory_id,quantity_kg) values(1,2,1,2);



CONSUMERORDERCART  TABLE =
-- Insert data into SHOWCART
INSERT INTO consumerOrderCart(subcategory_id, quantity_kg)  
VALUES 
  (13, 5.0),  
  (14, 2.5),  
  (15, 3.0),   
(16,33),
(17,22);



