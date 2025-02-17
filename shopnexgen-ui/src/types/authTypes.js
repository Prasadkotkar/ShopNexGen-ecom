// src/types/authTypes.js

// AuthResponse object contains JWT, message, and role
export const AuthResponse = {
    jwt: '',
    message: '',
    role: ''
};

// ApiResponse contains a message and a boolean status
export const ApiResponse = {
    message: '',
    status: false
};

// LoginRequest object contains email, OTP, and navigate function
export const LoginRequest = {
    email: '',
    otp: '',
    navigate: null
};

// SignupRequest object contains email, fullName, OTP, and navigate function
export const SignupRequest = {
    email: '',
    fullName: '',
    otp: '',
    navigate: null
};

// ResetPasswordRequest contains token and password
export const ResetPasswordRequest = {
    token: '',
    password: ''
};

// AuthState manages the JWT, role, loading state, error, and OTP sent flag
export const AuthState = {
    jwt: null,
    role: null,
    loading: false,
    error: null,
    otpSent: false
};
