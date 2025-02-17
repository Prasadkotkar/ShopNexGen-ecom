package com.shopnexgen.response;

import com.shopnexgen.model.enums.USER_ROLE;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
	private String jwt;
	private boolean status;
	private String message;
	private USER_ROLE role;
}
