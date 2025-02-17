package com.shopnexgen.service.impl;

import com.shopnexgen.exception.CartItemException;
import com.shopnexgen.exception.UserException;
import com.shopnexgen.model.CartItem;
import com.shopnexgen.model.User;
import com.shopnexgen.repository.CartItemRepository;
import com.shopnexgen.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CartItemServiceImpl implements CartItemService {
	
	private CartItemRepository cartItemRepository;

	@Autowired
	public CartItemServiceImpl(CartItemRepository cartItemRepository) {
		this.cartItemRepository=cartItemRepository;

	}

	@Override
	public CartItem updateCartItem(Long userId,
								   Long id, CartItem cartItem)
			throws CartItemException, UserException {
		
		CartItem item=findCartItemById(id);
		User cartItemUser=item.getCart().getUser();
		
		if(cartItemUser.getId().equals(userId)) {
			
			item.setQuantity(cartItem.getQuantity());
			item.setMrpPrice(item.getQuantity()*item.getProduct().getMrpPrice());
			item.setSellingPrice(item.getQuantity()*item.getProduct().getSellingPrice());
			
			return cartItemRepository.save(item);
				
			
		}
		else {
			throw new CartItemException("You can't update  another users cart_item");
		}
		
	}
	

	@Override
	public void removeCartItem(Long userId,Long cartItemId)
			throws CartItemException,
			UserException {
		
		System.out.println("userId- "+userId+" cartItemId "+cartItemId);
		
		CartItem cartItem=findCartItemById(cartItemId);
		
		User cartItemUser=cartItem.getCart().getUser();

		if(cartItemUser.getId().equals(userId)) {
			cartItemRepository.deleteById(cartItem.getId());
		}
		else {
			throw new UserException("you can't remove another users item");
		}
		
	}

	@Override
	public CartItem findCartItemById(Long cartItemId) throws CartItemException {
		Optional<CartItem> opt=cartItemRepository.findById(cartItemId);
		
		if(opt.isPresent()) {
			return opt.get();
		}
		throw new CartItemException("cartItem not found with id : "+cartItemId);
	}

}
