package com.shopnexgen.response;

import com.shopnexgen.dto.OrderHistory;
import com.shopnexgen.model.Cart;
import com.shopnexgen.model.Product;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FunctionResponse {
    private String functionName;
    private Cart userCart;
    private OrderHistory orderHistory;
    private Product product;
}
