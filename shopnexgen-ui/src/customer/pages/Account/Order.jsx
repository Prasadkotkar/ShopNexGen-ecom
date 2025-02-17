import React, { useEffect } from 'react';
import OrderItemCard from './OrderItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrderHistory } from '../../../Redux Toolkit/Customer/OrderSlice';

const Order = () => {
  const dispatch = useDispatch();
  const { cart, auth, orders } = useSelector(store => store);

  useEffect(() => {
    dispatch(fetchUserOrderHistory(localStorage.getItem("jwt") || ""));
  }, [auth.jwt, dispatch]);

  return (
    <div className='text-sm min-h-screen'>
      <div className='pb-5'>
        <h1 className='font-semibold'>All orders</h1>
        <p>from anytime</p>
      </div>
      <div className='space-y-2'>
        {orders?.orders?.map((order) =>
          order?.orderItems.map((item) => (
            <OrderItemCard key={item.id} item={item} order={order} />
          ))
        )}
      </div>
    </div>
  );
};

export default Order;
