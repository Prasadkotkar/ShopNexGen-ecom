package com.shopnexgen.repository;

import com.shopnexgen.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order>findByUserId(Long userId);
    List<Order> findBySellerIdOrderByOrderDateDesc(Long sellerId);
    List<Order> findBySellerIdAndOrderDateBetween(Long sellerId, LocalDateTime startDate, LocalDateTime endDate);

}
