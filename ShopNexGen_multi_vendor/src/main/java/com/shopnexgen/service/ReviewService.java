package com.shopnexgen.service;

import com.shopnexgen.exception.ReviewNotFoundException;
import com.shopnexgen.model.Product;
import com.shopnexgen.model.Review;
import com.shopnexgen.model.User;
import com.shopnexgen.request.CreateReviewRequest;
import javax.naming.AuthenticationException;
import java.util.List;

public interface ReviewService {
    Review createReview(CreateReviewRequest req,
                        User user,
                        Product product);
    List<Review> getReviewsByProductId(Long productId);
    Review updateReview(Long reviewId,
                        String reviewText,
                        double rating,
                        Long userId) throws ReviewNotFoundException, AuthenticationException;
    void deleteReview(Long reviewId, Long userId) throws ReviewNotFoundException, AuthenticationException;

}
