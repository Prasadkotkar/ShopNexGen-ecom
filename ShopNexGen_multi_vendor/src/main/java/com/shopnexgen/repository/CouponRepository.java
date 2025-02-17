package com.shopnexgen.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopnexgen.model.Coupon;

public interface CouponRepository extends JpaRepository<Coupon, Long> {
	Coupon findByCode(String couponCode);

}
