// src/types/couponTypes.js

// Coupon represents a discount coupon
export const Coupon = {
  id: 0,
  code: '',
  discountPercentage: 0,
  validityStartDate: '',
  validityEndDate: '',
  minimumOrderValue: 0,
  active: false
};

// CouponState represents the state related to coupons
export const CouponState = {
  coupons: [], // Array of Coupon objects
  cart: null, // This can be a Cart object or null
  loading: false,
  error: null, // This can be a string or null
  couponCreated: false,
  couponApplied: false
};
