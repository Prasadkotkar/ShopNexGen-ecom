package com.shopnexgen.service;

import com.shopnexgen.model.VerificationCode;

public interface VerificationService {
    VerificationCode createVerificationCode(String otp, String email);
}
