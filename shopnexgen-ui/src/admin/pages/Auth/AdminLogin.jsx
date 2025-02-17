import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { useNavigate } from 'react-router-dom';
import { sendLoginSignupOtp, signin } from '../../../Redux Toolkit/Customer/AuthSlice';
import OTPInput from '../../../customer/components/OtpFild/OTPInput';

const AdminLoginForm = () => {

    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [timer, setTimer] = useState(30); // Timer state
    const [isTimerActive, setIsTimerActive] = useState(false);
    const dispatch = useAppDispatch();
    const { auth } = useAppSelector(store => store);

    const formik = useFormik({
        initialValues: {
            email: '',
            otp: ''
        },
        onSubmit: (values) => {
            dispatch(signin({ email: values.email, otp, navigate }));
        },
    });

    const handleOtpChange = (otp) => {
        setOtp(otp);
    };

    const handleResendOTP = () => {
        dispatch(sendLoginSignupOtp({ email: formik.values.email }));
        console.log('Resend OTP');
        setTimer(30);
        setIsTimerActive(true);
    };

    const handleSentOtp = () => {
        setIsOtpSent(true);
        handleResendOTP();
    };

    useEffect(() => {
        let interval;
        if (isTimerActive) {
            interval = setInterval(() => {
                setTimer(prev => {
                    if (prev === 1) {
                        clearInterval(interval);
                        setIsTimerActive(false);
                        return 30; // Reset timer for next OTP request
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isTimerActive]);

    return (
        <div>
            <h1 className='text-center font-bold text-xl text-primary-color pb-8'>Login</h1>
            <form onSubmit={formik.handleSubmit} className="space-y-5">
                <TextField
                    fullWidth
                    name="email"
                    label="Enter Your Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email ? formik.errors.email : undefined}
                />

                {auth.otpSent && <div className="space-y-2">
                    <p className="font-medium text-sm">
                        * Enter OTP sent to your mobile number
                    </p>
                    <OTPInput
                        length={6}
                        onChange={handleOtpChange}
                        error={false}
                    />
                    <p className="text-xs space-x-2">
                        {isTimerActive ? (
                            <span>Resend OTP in {timer} seconds</span>
                        ) : (
                            <>
                                Didn’t receive OTP?{" "}
                                <span
                                    onClick={handleResendOTP}
                                    className="text-teal-600 cursor-pointer hover:text-teal-800 font-semibold"
                                >
                                    Resend OTP
                                </span>
                            </>
                        )}
                    </p>
                </div>}

                {auth.otpSent && <div>
                    <Button type="submit" disabled={auth.loading} fullWidth variant='contained' sx={{ py: "11px" }}>
                        {auth.loading ? <CircularProgress /> : "Login"}
                    </Button>
                </div>}

                {!auth.otpSent && <Button
                    disabled={auth.loading}
                    fullWidth
                    variant='contained'
                    onClick={handleSentOtp}
                    sx={{ py: "11px" }}>
                    {auth.loading ? <CircularProgress /> : "Send OTP"}
                </Button>}
            </form>
        </div>
    );
};

export default AdminLoginForm;
