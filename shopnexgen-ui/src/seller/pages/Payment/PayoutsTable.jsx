import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { fetchPayoutsBySeller } from '../../../Redux Toolkit/Seller/payoutSlice';

const PayoutsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { sellerOrder } = useAppSelector(store => store);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPayoutsBySeller(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell align='right'>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellerOrder.orders.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="left">{item.id}</TableCell>
                <TableCell component="th" scope="row">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PayoutsTable;
