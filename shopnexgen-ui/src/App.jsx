import './App.css';
import AOS from "aos";
import "aos/dist/aos.css";
import React from 'react';
// import { ThemeProvider } from '@emotion/react';
import customeTheme from './Theme/customeTheme';
import { Button } from '@mui/material';
import Navbar from './customer/components/Navbar/Navbar';
import Home from './customer/pages/Home/Home';
import Footer from './customer/components/Footer/Footer';
import Products from './customer/pages/Products/Products';
import { Route, Routes, useNavigate } from 'react-router-dom';

import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
import CustomerRoutes from './routes/CustomerRoutes';
import AdminDashboard from './admin/pages/Dashboard/Dashboard';
import SellerAccountForm from './customer/pages/BecomeSeller/SellerAccountForm';
import SellerAccountVerification from './seller/pages/SellerAccountVerification';
import SellerAccountVerified from './seller/pages/SellerAccountVerified';
import { useAppDispatch, useAppSelector } from './Redux Toolkit/Store';
import { useEffect } from 'react';
import { fetchSellerProfile } from './Redux Toolkit/Seller/sellerSlice';
import BecomeSeller from './customer/pages/BecomeSeller/BecomeSeller';
import AdminLoginForm from './admin/pages/Auth/AdminLogin';
import AdminAuth from './admin/pages/Auth/AdminAuth';
import { fetchUserProfile } from './Redux Toolkit/Customer/UserSlice';
import { createHomeCategories, fetchHomePageData } from './Redux Toolkit/Customer/Customer/AsyncThunk';
import { homeCategories } from './data/homeCategories';
import Mobile from './data/Products/mobile';

function App() {
  const dispatch = useAppDispatch()
  const { auth, sellerAuth, sellers, user } = useAppSelector(store => store)
const navigate=useNavigate();

const [orderPopup, setOrderPopup] = React.useState(false);
  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
   React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(fetchUserProfile({jwt:localStorage.getItem("jwt") || auth.jwt || "",navigate}));
      dispatch(fetchSellerProfile(localStorage.getItem("jwt") || sellerAuth.jwt))
    }

  }, [auth.jwt, sellerAuth.jwt])

  useEffect(() => {
    // dispatch(fetchHomePageData())
    dispatch(createHomeCategories(homeCategories))
    
  }, [dispatch])

  return (
  //  <ThemeProvider theme={customeTheme}>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200" >


        <Routes>
          {sellers.profile && <Route path='/seller/*' element={<SellerDashboard />} />}
          {user.user?.role === "ROLE_ADMIN" && <Route path='/admin/*' element={<AdminDashboard />} />}
          <Route path='/verify-seller/:otp' element={<SellerAccountVerification />} />
          <Route path='/seller-account-verified' element={<SellerAccountVerified />} />
          <Route path='/become-seller' element={<BecomeSeller />} />
          <Route path='/admin-login' element={<AdminAuth />} />

          <Route path='/dummy' element={<Mobile />} />

          <Route path='*' element={<CustomerRoutes />} />

        </Routes>
        {/* <Footer/> */}
      </div>



   // </ThemeProvider>
  );
}

export default App;
