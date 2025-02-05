const db = {
  LOCAL_HOST: "localhost",
  USER_NAME: "W2_87323_Dhanashri",
  DB_NAME: "recycle_x",
  PASSWORD: "manager",
};

// Supplier-related views
const supplier = {
  SUPPLIER: "supplier_v",
  TRASH_CATEGORIES: "trashCategories_v",
  TRASH_SUBCATEGORIES: "trashSubCategories_v",
  SUPPLIER_SELECTIONS: "supplierSelections_v",
  SUPPLIER_ORDERS: "supplierOrders_v",
  SUPPLIER_ORDER_ITEMS: "supplierOrderItems_v",
  SUPPLIER_CART: "supplierCart_v",
  PICKUP_ADDRESS: "pickupAddress_v",
  EMAIL: "codergirl233@gmail.com",
  PASSWORD: "vdzx waty nkvr ujiy",
};

// Consumer-related views
const consumer = {
  CONSUMER: "consumer_v",
  RECYCLING_CATEGORIES: "recyclingCategories_v",
  RECYCLING_SUBCATEGORIES: "recyclingSubcategories_v",
  CONSUMER_SELECTIONS: "consumerSelections_v",
  CONSUMER_ORDERS: "consumerOrders_v",
  CONSUMER_ORDER_ITEMS: "consumerOrderitems_v",
  CONSUMER_CART: "consumerCart_v",
  DELIVERY_ADDRESS: "deliveryAddress_v",
};

// Common views
const common = {
  SERVICE_ZONES: "servicezones_v",
};

module.exports = { db, supplier, consumer, common };
