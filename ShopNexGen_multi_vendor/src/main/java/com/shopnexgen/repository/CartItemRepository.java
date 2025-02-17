package com.shopnexgen.repository;

import com.shopnexgen.model.Cart;
import com.shopnexgen.model.CartItem;
import com.shopnexgen.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    CartItem findByCartAndProductAndSize(Cart cart, Product product, String size);

}
