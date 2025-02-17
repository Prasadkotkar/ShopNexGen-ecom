package com.shopnexgen.model;

import com.shopnexgen.model.enums.PayoutsStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Payouts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany
    private List<Transaction> transactions = new ArrayList<>();
    @ManyToOne
    private Seller seller;
    private Long amount;
    private PayoutsStatus status = PayoutsStatus.PENDING;
    private LocalDateTime data=LocalDateTime.now();
}
