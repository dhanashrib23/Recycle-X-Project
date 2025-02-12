const db = {
  LOCAL_HOST: "localhost",
  USER_NAME: "W2_87325_Rajvardhan",
  DB_NAME: "recycle_x",
  PASSWORD: "manager",
};

// Supplier-related views
const supplier = {
  SUPPLIER: "supplier",
  TRASH_CATEGORIES: "trashCategories",
  TRASH_SUBCATEGORIES: "trashSubCategories",
  SUPPLIER_SELECTIONS: "supplierSelections",
  SUPPLIER_ORDERS: "supplierOrders",
  SUPPLIER_ORDER_ITEMS: "supplierOrderItems",
  SUPPLIER_CART: "supplierCart",
  PICKUP_ADDRESS: "pickupAddress",
};

// Consumer-related views
const consumer = {
  CONSUMER: "consumer",
  RECYCLING_CATEGORIES: "recyclingCategories",
  RECYCLING_SUBCATEGORIES: "recyclingSubcategories",
  CONSUMER_SELECTIONS: "consumerSelections",
  CONSUMER_ORDERS: "consumerOrders",
  CONSUMER_ORDER_ITEMS: "consumerOrderitems",
  CONSUMER_CART: "consumerCart",
  DELIVERY_ADDRESS: "deliveryAddress",
};

// Common views
const common = {
  SERVICE_ZONES: "servicezones",
};

module.exports = { db, supplier, consumer, common };
