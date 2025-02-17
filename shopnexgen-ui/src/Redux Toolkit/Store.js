import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import sellerSlice from "./Seller/sellerSlice";
import sellerAuthenticationSlice from "./Seller/sellerAuthenticationSlice";
import sellerProductSlice from "./Seller/sellerProductSlice";
import ProductSlice from "./Customer/ProductSlice";
import CartSlice from "./Customer/CartSlice";
import AuthSlice from "./Customer/AuthSlice";
import UserSlice from "./Customer/UserSlice";
import OrderSlice from "./Customer/OrderSlice";
import sellerOrderSlice from "./Seller/sellerOrderSlice";
import payoutSlice from "./Seller/payoutSlice";
import transactionSlice from "./Seller/transactionSlice";
import CouponSlice from "./Customer/CouponSlice";
import AdminCouponSlice from "./Admin/AdminCouponSlice";
import ReviewSlice from "./Customer/ReviewSlice";
import WishlistSlice from "./Customer/WishlistSlice";
import AiChatBotSlice from "./Customer/AiChatBotSlice";
import revenueChartSlice from "./Seller/revenueChartSlice";
import CustomerSlice from "./Customer/Customer/CustomerSlice";
import DealSlice from "./Admin/DealSlice";
import AdminSlice from "./Admin/AdminSlice";

// Combine reducers
const rootReducer = combineReducers({
  // customer
  auth: AuthSlice,
  user: UserSlice,
  products: ProductSlice,
  cart: CartSlice,
  orders: OrderSlice,
  coupone: CouponSlice,
  review: ReviewSlice,
  wishlist: WishlistSlice,
  aiChatBot: AiChatBotSlice,
  homePage: CustomerSlice,

  // seller
  sellers: sellerSlice,
  sellerAuth: sellerAuthenticationSlice,
  sellerProduct: sellerProductSlice,
  sellerOrder: sellerOrderSlice,
  payouts: payoutSlice,
  transaction: transactionSlice,
  revenueChart: revenueChartSlice,

  // admin
  adminCoupon: AdminCouponSlice,
  adminDeals: DealSlice,
  admin: AdminSlice,
  deal: DealSlice
});

// Configure store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Export types for useDispatch and useSelector hooks
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Export the store
export default store;
