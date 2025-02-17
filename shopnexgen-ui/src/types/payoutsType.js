// payoutsTypes.js
import { Order } from "./orderTypes";
import { Seller } from "./sellerTypes";
import { Transaction } from "./Transaction";
import { User } from "./userTypes";

// Payouts represents the payout details for a seller
const Payouts = {
  id: 0, // Unique identifier for the payout
  transactions: [Transaction], // Array of Transaction objects
  seller: Seller, // A Seller object
  amount: 0, // Amount of the payout
  status: "PENDING", // Status of the payout (can be 'PENDING', 'SUCCESS', or 'REJECTED')
  date: "", // Date of the payout
};
