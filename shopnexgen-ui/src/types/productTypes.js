// productTypes.js
import { Seller } from "./sellerTypes";

// Category represents a product category with optional parent category
const Category = {
  id: 0, // Optional ID, assumed to be auto-generated
  name: "", // Name of the category
  categoryId: "", // Unique identifier for the category
  parentCategory: null, // Optional parent category (could be null or another Category object)
  level: 0, // Level of the category (e.g., top-level, subcategory, etc.)
};

// Product represents a product with optional seller and category information
const Product = {
  id: 0, // Optional ID, assumed to be auto-generated
  title: "", // Title of the product
  description: "", // Description of the product
  mrpPrice: 0, // MRP price of the product
  sellingPrice: 0, // Selling price of the product
  discountPercent: null, // Optional discount percentage
  quantity: null, // Optional quantity available
  color: "", // Color of the product
  images: [], // Array of image URLs
  numRatings: null, // Optional number of ratings
  category: null, // Optional category (could be null or a Category object)
  seller: Seller, // Seller object (assuming Seller is a predefined object)
  createdAt: new Date(), // Creation date of the product (mapped from LocalDateTime to Date)
  sizes: [], // Array of available sizes for the product
};
