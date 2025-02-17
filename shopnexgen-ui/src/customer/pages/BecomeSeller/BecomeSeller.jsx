import { Alert, Button, Snackbar, Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";
import SellerLoginForm from "./SellerLoginForm";
import SellerAccountForm from "./SellerAccountForm";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";

const BecomeSeller = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoginPage, setIsLoginPage] = useState(false);
  const sellerAuth = useSelector((store) => store.sellerAuth);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  useEffect(() => {
    if (sellerAuth.sellerCreated || sellerAuth.error || sellerAuth.otpSent) {
      setSnackbarOpen(true);
      console.log("store ", sellerAuth.error);
    }
  }, [sellerAuth.sellerCreated, sellerAuth.error, sellerAuth.otpSent]);

  return (
    <div className="grid md:gap-10 grid-cols-3 min-h-screen">
      <section className="lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-b-md">
        {!isLoginPage ? <SellerAccountForm /> : <SellerLoginForm />}

        <div className="mt-10 space-y-2">
          <h1 className="text-center text-sm font-medium">
            {isLoginPage && "Don't"} have an account?
          </h1>
          <Button
            onClick={() => setIsLoginPage(!isLoginPage)}
            fullWidth
            sx={{ py: "11px" }}
            variant="outlined"
          >
            {isLoginPage ? "Register" : "Login"}
          </Button>
        </div>
      </section>

      <section className="hidden md:col-span-1 md:flex lg:col-span-2 justify-center items-center">
        <div className="lg:w-[70%] px-5 space-y-10">
          <div className="borderr rounded-md space-y-2 font-bold text-center">
            <p className="text-2xl">Join the Marketplace Revolution</p>
            <p className="text-lg text-indigo-700">Boost Your Sales Today</p>
          </div>
          <img className="" src="/seller.jpg" alt="" />
        </div>
      </section>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={sellerAuth.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {sellerAuth.error
            ? sellerAuth.error
            : sellerAuth.sellerCreated
            ? sellerAuth.sellerCreated
            : "OTP sent to your email!"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BecomeSeller;
