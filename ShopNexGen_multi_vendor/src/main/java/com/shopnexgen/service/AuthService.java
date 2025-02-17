package com.shopnexgen.service;


import com.shopnexgen.exception.SellerException;
import com.shopnexgen.exception.UserException;
import com.shopnexgen.request.LoginRequest;
import com.shopnexgen.request.SignupRequest;
import com.shopnexgen.response.AuthResponse;
import jakarta.mail.MessagingException;

public interface AuthService {
    void sentLoginOtp(String email) throws UserException, MessagingException;
    String createUser(SignupRequest req) throws SellerException;
    AuthResponse signin(LoginRequest req) throws SellerException;

}
