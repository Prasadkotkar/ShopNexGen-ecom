package com.shopnexgen.model;

import com.shopnexgen.model.enums.OrderStatus;
import com.shopnexgen.model.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String orderId;
    @ManyToOne
    private User user;
    private Long sellerId;
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();
    @ManyToOne
    private Address shippingAddress;
    @Embedded
    private PaymentDetails paymentDetails = new PaymentDetails();
    private double totalMrpPrice;
    private Integer totalSellingPrice;
    private Integer discount;
    private OrderStatus orderStatus;
    private int totalItem;
    private PaymentStatus paymentStatus=PaymentStatus.PENDING;
    private LocalDateTime orderDate = LocalDateTime.now();
    private LocalDateTime deliverDate = orderDate.plusDays(7);
}
