// Wishlist object representing a user's wishlist
const Wishlist = {
  id: 0, // Wishlist ID
  user: {}, // User object, typically imported from userTypes.js
  products: [], // Array of products in the wishlist
};

// WishlistState object representing the state of the wishlist
const WishlistState = {
  wishlist: null, // The wishlist object, can be null if the user has no wishlist
  loading: false, // Loading state for wishlist data
  error: null, // Error message if any occurs
};

// Payload object for adding a product to the wishlist
const AddProductToWishlistPayload = {
  wishlistId: 0, // Wishlist ID
  productId: 0, // Product ID
};
