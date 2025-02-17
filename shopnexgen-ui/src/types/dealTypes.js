// src/types/dealTypes.js

// Deal represents a discount offer associated with a category
export const Deal = {
  id: undefined, // Optional field
  discount: 0,
  category: {} // Assuming HomeCategory is defined elsewhere
};

// ApiResponse represents a generic API response
export const ApiResponse = {
  message: '',
  status: false
};

// DealsState represents the state related to deals
export const DealsState = {
  deals: [], // Array of Deal objects
  loading: false,
  error: null, // This can be a string or null
  dealCreated: false,
  dealUpdated: false
};
