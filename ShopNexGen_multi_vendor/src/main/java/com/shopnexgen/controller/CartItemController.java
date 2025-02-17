package com.shopnexgen.controller;

import com.shopnexgen.service.CartItemService;
import com.shopnexgen.service.UserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cart_items")
public class CartItemController {

	private CartItemService cartItemService;
	private UserService userService;
	
	public CartItemController(CartItemService cartItemService, UserService userService) {
		this.cartItemService=cartItemService;
		this.userService=userService;
	}
	

}
