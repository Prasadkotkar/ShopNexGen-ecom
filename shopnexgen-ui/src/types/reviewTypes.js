// reviewTypes.js
import { Product } from "./productTypes";
import { User } from "./userTypes";

// Review represents a product review
const Review = {
  id: 0, // ID of the review
  reviewText: "", // Text of the review
  rating: 0, // Rating of the product (usually a number between 1 and 5)
  user: User, // User object representing the reviewer
  product: Product, // Product being reviewed
  productImages: [], // Array of image URLs related to the review
  createdAt: "", // Date when the review was created
  updatedAt: "", // Date when the review was last updated
};

// CreateReviewRequest represents a request to create a review
const CreateReviewRequest = {
  reviewText: "", // Text of the review
  reviewRating: 0, // Rating of the review
};

// ApiResponse represents a standard API response
const ApiResponse = {
  message: "", // Message from the API
  status: false, // Success or failure of the request (true/false)
};

// ReviewState represents the state of reviews in the application
const ReviewState = {
  reviews: [], // Array of reviews
  loading: false, // Boolean to indicate loading state
  error: null, // Error message if any (could be a string or null)
  reviewCreated: false, // Boolean to indicate if a review was created
  reviewUpdated: false, // Boolean to indicate if a review was updated
  reviewDeleted: false, // Boolean to indicate if a review was deleted
};
