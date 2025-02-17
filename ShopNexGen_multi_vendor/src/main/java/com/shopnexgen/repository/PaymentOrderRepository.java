package com.shopnexgen.repository;

import com.shopnexgen.model.PaymentOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentOrderRepository extends JpaRepository<PaymentOrder,Long> {
    PaymentOrder findByPaymentLinkId(String paymentId);
}