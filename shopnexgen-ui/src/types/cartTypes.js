// src/types/cartTypes.js

// CartItem represents an item in the shopping cart
export const CartItem = {
    id: 0,
    cart: null,  // This can be null or a Cart object
    product: {}, // This should reference a Product object
    size: '',
    quantity: 0,
    mrpPrice: 0,
    sellingPrice: 0,
    userId: 0
};

// Cart represents the user's shopping cart
export const Cart = {
    id: 0,
    user: {}, // This should reference a User object
    cartItems: [], // Array of CartItem objects
    totalSellingPrice: 0,
    totalItem: 0,
    totalMrpPrice: 0,
    discount: 0,
    couponCode: null // This can be a string or null
};
