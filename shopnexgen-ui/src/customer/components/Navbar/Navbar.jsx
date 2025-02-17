import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import "./Navbar.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { mainCategory } from "../../../data/category/mainCategory";
import CategorySheet from "./CategorySheet";
import DrawerList from "./DrawerList";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Navbar = () => {
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const dispatch = useAppDispatch();
  const { user, cart, sellers } = useAppSelector((store) => store);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  const becomeSellerClick = () => {
    if (sellers.profile?.id) {
      navigate("/seller");
    } else {
      navigate("/become-seller");
    }
  };

  return (
    <Box sx={{ zIndex: 2 }} className="sticky top-0 left-0 right-0 bg-white blur-bg bg-opacity-80">
      <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
        <div className="flex items-center gap-9">
          <div className="flex items-center gap-2">
            {!isLarge && (
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon className="text-gray-700" sx={{ fontSize: 29 }} />
              </IconButton>
            )}
            <h1 onClick={() => navigate("/")} className="logo cursor-pointer text-lg md:text-4xl text-[#303f9f]">
              ShopNexGen
            </h1>
          </div>

          {isLarge && (
            <ul className="flex items-center font-medium text-gray-800">
              {mainCategory.map((item) => (
                <li
                  key={item.categoryId}
                  onMouseEnter={() => {
                    setSelectedCategory(item.categoryId);
                    setShowSheet(true);
                  }}
                  onMouseLeave={() => setShowSheet(false)}
                  className="mainCategory hover:text-[#3f51b5] cursor-pointer hover:border-b-2 h-[70px] px-4 border-[#3f51b5] flex items-center"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-1 lg:gap-6 items-center">
          <IconButton onClick={() => navigate("/search-products")}>
            <SearchIcon className="text-gray-700" sx={{ fontSize: 29 }} />
          </IconButton>

          {user.user ? (
            <Button onClick={() => navigate("/account/orders")} className="flex items-center gap-2">
              <Avatar
                sx={{ width: 29, height: 29 }}
                src="https://cdn.pixabay.com/photo/2015/04/15/09/28/head-723540_640.jpg"
              />
              <h1 className="font-semibold hidden lg:block">{user.user?.fullName?.split(" ")[0]}</h1>
            </Button>
          ) : (
            <Button variant="contained" startIcon={<AccountCircleIcon sx={{ fontSize: "12px" }} />} onClick={() => navigate("/login")}>
              Login
            </Button>
          )}

          <IconButton onClick={() => navigate("/wishlist")}>
            <FavoriteBorderIcon sx={{ fontSize: 29 }} className="text-gray-700" />
          </IconButton>

          <IconButton onClick={() => navigate("/cart")}>
            <Badge badgeContent={cart.cart?.cartItems.length} color="primary">
              <AddShoppingCartIcon sx={{ fontSize: 29 }} className="text-gray-700" />
            </Badge>
          </IconButton>

          {isLarge && (
            <Button onClick={becomeSellerClick} startIcon={<StorefrontIcon />} variant="outlined">
              Become Seller
            </Button>
          )}
        </div>
      </div>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>

      {showSheet && selectedCategory && (
        <div onMouseEnter={() => setShowSheet(true)} onMouseLeave={() => setShowSheet(false)} className="categorySheet absolute top-[4.41rem] left-20 right-20">
          <CategorySheet setShowSheet={setShowSheet} selectedCategory={selectedCategory} />
        </div>
      )}
    </Box>
  );
};

export default Navbar;
