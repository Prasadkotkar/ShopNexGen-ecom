package com.shopnexgen.service;


import com.shopnexgen.exception.CartItemException;
import com.shopnexgen.exception.UserException;
import com.shopnexgen.model.CartItem;

public interface CartItemService {
	public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException;
	public void removeCartItem(Long userId,Long cartItemId) throws CartItemException, UserException;
	public CartItem findCartItemById(Long cartItemId) throws CartItemException;
	
}
