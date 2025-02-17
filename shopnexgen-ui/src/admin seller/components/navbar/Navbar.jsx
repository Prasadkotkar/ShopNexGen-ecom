import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// Add proper import
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

const Navbar = ({ DrawerList }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div className='h-[10vh] flex items-center px-5 border-b'>
      <div className='flex items-center gap-3 '>
        <IconButton onClick={toggleDrawer(true)} color='primary'>
          <MenuIcon color='primary' />
        </IconButton>

        <h1 onClick={() => navigate("/")} className='logo text-xl cursor-pointer text-[#303f9f]'>ShopNexGen</h1>
      </div>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
};

export default Navbar;
