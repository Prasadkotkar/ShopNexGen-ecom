package com.shopnexgen.repository;

import com.shopnexgen.model.Seller;
import com.shopnexgen.model.enums.AccountStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SellerRepository extends JpaRepository<Seller, Long> {
    Seller findByEmail(String email);
    List<Seller> findByAccountStatus(AccountStatus status);
}
