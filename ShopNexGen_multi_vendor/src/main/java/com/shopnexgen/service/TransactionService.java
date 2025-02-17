package com.shopnexgen.service;

import com.shopnexgen.model.Order;
import com.shopnexgen.model.Seller;
import com.shopnexgen.model.Transaction;
import java.util.List;

public interface TransactionService {
    Transaction createTransaction(Order order);
    List<Transaction> getTransactionBySeller(Seller seller);
    List<Transaction>getAllTransactions();
}
