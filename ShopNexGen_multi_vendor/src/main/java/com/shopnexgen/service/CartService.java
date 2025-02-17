package com.shopnexgen.service;


import com.shopnexgen.exception.ProductException;
import com.shopnexgen.model.Cart;
import com.shopnexgen.model.CartItem;
import com.shopnexgen.model.Product;
import com.shopnexgen.model.User;

public interface CartService {
	
	public CartItem addCartItem(User user,
								Product product,
								String size,
								int quantity) throws ProductException;
	public Cart findUserCart(User user);

}
