package com.shopnexgen.service;

import com.shopnexgen.exception.OrderException;
import com.shopnexgen.model.Address;
import com.shopnexgen.model.Cart;
import com.shopnexgen.model.Order;
import com.shopnexgen.model.User;
import com.shopnexgen.model.enums.OrderStatus;

import java.util.List;
import java.util.Set;

public interface OrderService {
	
	public Set<Order> createOrder(User user, Address shippingAddress, Cart cart);
	public Order findOrderById(Long orderId) throws OrderException;
	public List<Order> usersOrderHistory(Long userId);
	public List<Order>getShopsOrders(Long sellerId);
	public Order updateOrderStatus(Long orderId,
								   OrderStatus orderStatus)
			throws OrderException;
	public void deleteOrder(Long orderId) throws OrderException;
	Order cancelOrder(Long orderId,User user) throws OrderException;
	
}
