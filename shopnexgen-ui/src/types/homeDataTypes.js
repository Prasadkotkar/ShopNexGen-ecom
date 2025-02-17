// types.js

// HomeCategory represents a category with optional properties
export const HomeCategory = {
  id: undefined, // Optional field
  categoryId: '',
  section: undefined, // Optional field
  name: undefined, // Optional field
  image: '',
  parentCategoryId: undefined, // Optional field
};

// Deal represents a discount offer associated with a category
export const Deal = {
  category: HomeCategory, // A HomeCategory object
  discount: 0,
};

// HomeData represents the data related to a home page layout
export const HomeData = {
  id: 0, // Unique identifier
  grid: [], // Array of HomeCategory objects
  shopByCategories: [], // Array of HomeCategory objects
  electricCategories: [], // Array of HomeCategory objects
  deals: [Deal], // Array of Deal objects
  dealCategories: [], // Array of HomeCategory objects
};
