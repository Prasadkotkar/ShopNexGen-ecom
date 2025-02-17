// src/types/addressTypes.js

// Enum for user roles
const UserRole = {
    ROLE_CUSTOMER: 'ROLE_CUSTOMER',
    ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_SELLER: 'ROLE_SELLER',
  };
  
  // Address object representing a user's address
  const Address = {
    id: 0, // Optional address ID
    name: "", // Name associated with the address
    mobile: "", // Mobile number associated with the address
    pinCode: "", // Pin code of the address
    address: "", // Detailed address
    locality: "", // Locality of the address
    city: "", // City of the address
    state: "", // State of the address
  };
  
  // User object representing a user in the system
  const User = {
    id: 0, // Optional user ID
    password: "", // Optional user password
    email: "", // Email of the user
    fullName: "", // Full name of the user
    mobile: "", // Optional mobile number
    role: UserRole.ROLE_CUSTOMER, // Role of the user (could be ROLE_CUSTOMER, ROLE_ADMIN, ROLE_SELLER)
    addresses: [], // Optional array of addresses associated with the user
  };
  
  // UserState object representing the user's state in the application
  const UserState = {
    user: null, // The user object, can be null if no user is logged in
    loading: false, // Loading state for user data
    error: null, // Error message if any occurs
    profileUpdated: false, // Flag indicating if the user's profile was updated
  };
  