import * as React from "react";

import MailIcon from "@mui/icons-material/Mail";
import DrawerList from "../../../admin seller/components/drawerList/DrawerList";
import { AccountBox } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const menu = [
  {
    name: "Dashboard",
    path: "/seller",
    icon: <DashboardIcon className="text-primary-color" />,
    activeIcon: <DashboardIcon className="text-grey" />,
  },
  {
    name: "Orders",
    path: "/seller/orders",
    icon: <ShoppingBagIcon className="text-primary-color" />,
    activeIcon: <ShoppingBagIcon className="text-grey" />,
  },
  {
    name: "Products",
    path: "/seller/products",
    icon: <InventoryIcon className="text-primary-color" />,
    activeIcon: <InventoryIcon className="text-grey" />,
  },
  {
    name: "Add Product",
    path: "/seller/add-product",
    icon: <AddIcon className="text-primary-color" />,
    activeIcon: <AddIcon className="text-grey" />,
  },
  {
    name: "Payment",
    path: "/seller/payment",
    icon: <AccountBalanceWalletIcon className="text-primary-color" />,
    activeIcon: <AccountBalanceWalletIcon className="text-grey" />,
  },
  {
    name: "Transaction",
    path: "/seller/transaction",
    icon: <ReceiptIcon className="text-primary-color" />,
    activeIcon: <ReceiptIcon className="text-grey" />,
  },
];

const menu2 = [
  {
    name: "Account",
    path: "/seller/account",
    icon: <AccountBox className="text-primary-color" />,
    activeIcon: <AccountBox className="text-grey" />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <LogoutIcon className="text-primary-color" />,
    activeIcon: <LogoutIcon className="text-grey" />,
  },
];

const SellerDrawerList = ({ toggleDrawer }) => {
  return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
};

export default SellerDrawerList;
