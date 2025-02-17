import React from 'react';
import "./HomeCategoryCard.css";
import { useNavigate } from 'react-router-dom';

const HomeCategoryCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${item.categoryId}`)}
      className='flex gap-2 flex-col justify-center items-center group cursor-pointer'
    >
      <div className='custom-border w-[145px] lg:w-[240px] h-[145px] lg:h-[240px] rounded-full bg-teal-400'>
        <img
          className='group-hover:scale-95 transition-transform transform duration-700 object-cover object-top h-full w-full'
          src={item.image}
          alt=""
        />
      </div>
      <h1 className='font-medium'>{item.name}</h1>
    </div>
  );
};

export default HomeCategoryCard;