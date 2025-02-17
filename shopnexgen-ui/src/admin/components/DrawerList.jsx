import React from "react";

import DrawerList from "../../admin seller/components/drawerList/DrawerList";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import { Category } from "@mui/icons-material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

const menu = [
    {
        name: "Dashboard",
        path: "/admin",
        icon: <DashboardIcon className="text-primary-color" />,
        activeIcon: <DashboardIcon className="text-grey" />,
    },
    {
        name: "Coupons",
        path: "/admin/coupon",
        icon: <IntegrationInstructionsIcon className="text-primary-color" />,
        activeIcon: <IntegrationInstructionsIcon className="text-grey" />,
    },
    {
        name: <span class="text-grey">"Add New Coupon"</span>,
        path: "/admin/add-coupon",
        icon: <AddIcon className="text-primary-color" />,
        activeIcon: <AddIcon className="text-grey" />,
    },
    {
        name: "Home Page",
        path: "/admin/home-grid",
        icon: <HomeIcon className="text-primary-color" />,
        activeIcon: <HomeIcon className="text-grey" />,
    },
    {
        name: "Electronics Category",
        path: "/admin/electronics-category",
        icon: <ElectricBoltIcon className="text-primary-color" />,
        activeIcon: <ElectricBoltIcon className="text-grey" />,
    },
    {
        name: "Shop By Category",
        path: "/admin/shop-by-category",
        icon: <Category className="text-primary-color" />,
        activeIcon: <Category className="text-grey" />,
    },
    {
        name: "Deals",
        path: "/admin/deals",
        icon: <LocalOfferIcon className="text-primary-color" />,
        activeIcon: <LocalOfferIcon className="text-grey" />,
    },
];

const menu2 = [
    {
        name: "Account",
        path: "/admin/account",
        icon: <AccountBoxIcon className="text-primary-color" />,
        activeIcon: <AccountBoxIcon className="text-grey" />,
    },
    {
        name: "Logout",
        path: "/",
        icon: <LogoutIcon className="text-primary-color" />,
        activeIcon: <LogoutIcon className="text-grey" />,
    },
];

const AdminDrawerList = ({ toggleDrawer }) => {
    return <DrawerList toggleDrawer={toggleDrawer} menu={menu} menu2={menu2}/>;
};

export default AdminDrawerList;
