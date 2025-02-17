package com.shopnexgen.repository;

import com.shopnexgen.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}

