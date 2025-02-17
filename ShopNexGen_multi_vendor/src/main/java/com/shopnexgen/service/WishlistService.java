package com.shopnexgen.service;

import com.shopnexgen.exception.WishlistNotFoundException;
import com.shopnexgen.model.Product;
import com.shopnexgen.model.User;
import com.shopnexgen.model.Wishlist;
import java.util.Optional;

public interface WishlistService {
    Wishlist createWishlist(User user);
    Wishlist getWishlistByUserId(User user);
    Wishlist addProductToWishlist(User user, Product product) throws WishlistNotFoundException;

}

