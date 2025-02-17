// orderTypes.js
import { Product } from './productTypes';
import { Address, User } from './userTypes';

// OrderStatus Enum definition in JavaScript
const OrderStatus = {
  PENDING: 'PENDING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
};

// OrderItem represents a single item in an order
const OrderItem = {
  id: 0, // Unique identifier for the order item
  order: {}, // An Order object
  product: Product, // A Product object
  size: '', // Size of the product
  quantity: 0, // Quantity of the product
  mrpPrice: 0, // Manufacturer's retail price
  sellingPrice: 0, // Selling price after any discount
  userId: 0, // ID of the user placing the order
};

// Order represents the details of an order placed by the user
const Order = {
  id: 0, // Unique identifier for the order
  orderId: '', // Unique order identifier
  user: User, // A User object representing the customer
  sellerId: 0, // ID of the seller
  orderItems: [OrderItem], // Array of OrderItem objects
  orderDate: '', // Date when the order was placed
  shippingAddress: Address, // Shipping Address object
  paymentDetails: null, // Payment details (can be any data type)
  totalMrpPrice: 0, // Total MRP price of the order
  totalSellingPrice: 0, // Total selling price (optional)
  discount: 0, // Discount on the order (optional)
  orderStatus: OrderStatus.PENDING, // Status of the order
  totalItem: 0, // Total number of items in the order
  deliverDate: '', // Date when the order is expected to be delivered
};

// OrderState represents the state of orders in the application
const OrderState = {
  orders: [Order], // Array of Order objects
  orderItem: OrderItem, // Single OrderItem object or null
  currentOrder: Order, // Current Order object or null
  paymentOrder: null, // Payment details for the order or null
  loading: false, // Loading state
  error: null, // Error message or null
  orderCanceled: false, // Boolean indicating if the order was canceled
};
