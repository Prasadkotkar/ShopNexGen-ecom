import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, Menu, MenuItem, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { fetchSellerOrders, updateOrderStatus } from '../../../Redux Toolkit/Seller/sellerOrderSlice';
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const orderStatus = [
  { color: '#FFA500', label: 'PENDING' },
  { color: '#F5BCBA', label: 'PLACED' },
  { color: '#F5BCBA', label: 'CONFIRMED' },
  { color: '#1E90FF', label: 'SHIPPED' },
  { color: '#32CD32', label: 'DELIVERED' },
  { color: '#FF0000', label: 'CANCELLED' },
];

const orderStatusColor = {
  PENDING: { color: '#FFA500', label: 'PENDING' },
  CONFIRMED: { color: '#F5BCBA', label: 'CONFIRMED' },
  PLACED: { color: '#F5BCBA', label: 'PLACED' },
  SHIPPED: { color: '#1E90FF', label: 'SHIPPED' },
  DELIVERED: { color: '#32CD32', label: 'DELIVERED' },
  CANCELLED: { color: '#FF0000', label: 'CANCELLED' },
};

export default function OrderTable() {
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const { sellerOrder } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState({});

  const handleClick = (event, orderId) => {
    setAnchorEl((prev) => ({ ...prev, [orderId]: event.currentTarget }));
  };

  const handleClose = (orderId) => {
    setAnchorEl((prev) => ({ ...prev, [orderId]: null }));
  };

  useEffect(() => {
    dispatch(fetchSellerOrders(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  const handleUpdateOrder = (orderId, orderStatus) => {
    dispatch(updateOrderStatus({
      jwt: localStorage.getItem("jwt") || "",
      orderId,
      orderStatus,
    }));
    handleClose(orderId);
  };

  return (
    <>
      <h1 className='pb-5 font-bold text-xl'>All Orders</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order Id</StyledTableCell>
              <StyledTableCell>Products</StyledTableCell>
              <StyledTableCell>Shipping Address</StyledTableCell>
              <StyledTableCell align="right">Order Status</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellerOrder.orders.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell align="left">{item.id}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <div className='flex gap-1 flex-wrap'>
                    {item.orderItems.map((orderItem) =>
                      <div key={orderItem.id} className='flex gap-5'>
                        <img className='w-20 rounded-md' src={orderItem.product.images[0]} alt="" />
                        <div className='flex flex-col justify-between py-2'>
                          <h1>Title: {orderItem.product.title}</h1>
                          <h1>Price: Rs.{orderItem.product.sellingPrice}</h1>
                          <h1>Color: {orderItem.product.color}</h1>
                          <h1>Size: {orderItem.size}</h1>
                        </div>
                      </div>
                    )}
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <div className='flex flex-col gap-y-2'>
                    <h1>{item.shippingAddress.name}</h1>
                    <h1>{item.shippingAddress.address}, {item.shippingAddress.city}</h1>
                    <h1>{item.shippingAddress.state} - {item.shippingAddress.pinCode}</h1>
                    <h1><strong>Mobile:</strong> {item.shippingAddress.mobile}</h1>
                  </div>
                </StyledTableCell>
                <StyledTableCell 
                  sx={{ color: orderStatusColor[item.orderStatus].color }} 
                  align="center">
                  <Box sx={{ borderColor: orderStatusColor[item.orderStatus].color }} className={`border px-2 py-1 rounded-full text-xs`}>
                    {item.orderStatus}
                  </Box> 
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    size='small'
                    onClick={(e) => handleClick(e, item.id)}
                    color='primary'
                    className='bg-primary-color'>
                    Status
                  </Button>
                  <Menu
                    id={`status-menu ${item.id}`}
                    anchorEl={anchorEl[item.id]}
                    open={Boolean(anchorEl[item.id])}
                    onClose={() => handleClose(item.id)}
                    MenuListProps={{
                      'aria-labelledby': `status-menu ${item.id}`,
                    }}
                  >
                    {orderStatus.map((status) =>
                      <MenuItem 
                        key={status.label} 
                        onClick={() => handleUpdateOrder(item.id, status.label)}>
                        {status.label}
                      </MenuItem>
                    )}
                  </Menu>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
