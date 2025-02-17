// seller.js

// PickupAddress represents the address details for a pickup location
const PickupAddress = {
    name: "", // Name of the person at the pickup location
    mobile: "", // Mobile number of the person
    pincode: "", // Pincode of the address
    address: "", // Full address
    locality: "", // Locality of the address
    city: "", // City name
    state: "", // State name
  };
  
  // BankDetails represents the seller's bank account information
  const BankDetails = {
    accountNumber: "", // Bank account number
    ifscCode: "", // IFSC code for the bank branch
    accountHolderName: "", // Account holder's name
  };
  
  // BusinessDetails represents the business details of the seller
  const BusinessDetails = {
    businessName: "", // Name of the business
  };
  
  // Seller represents the seller's information
  const Seller = {
    id: undefined, // Seller ID (optional, since it's auto-generated)
    mobile: "", // Mobile number of the seller
    otp: "", // OTP sent to the seller
    gstin: "", // GSTIN number of the seller
    pickupAddress: PickupAddress, // Pickup address for the seller
    bankDetails: BankDetails, // Bank details of the seller
    sellerName: "", // Name of the seller
    email: "", // Email address of the seller
    businessDetails: BusinessDetails, // Business details of the seller
    password: "", // Seller's password
    accountStatus: "", // Account status (optional)
  };
  
  // SellerReport represents the report details for a seller
  const SellerReport = {
    id: 0, // Report ID
    seller: Seller, // The seller this report belongs to
    totalEarnings: 0, // Total earnings of the seller
    totalSales: 0, // Total sales of the seller
    totalRefunds: 0, // Total refunds processed by the seller
    totalTax: 0, // Total tax applicable on the sales
    netEarnings: 0, // Seller's net earnings after deductions
    totalOrders: 0, // Total orders placed by the seller
    canceledOrders: 0, // Total canceled orders
    totalTransactions: 0, // Total transactions completed
  };
  