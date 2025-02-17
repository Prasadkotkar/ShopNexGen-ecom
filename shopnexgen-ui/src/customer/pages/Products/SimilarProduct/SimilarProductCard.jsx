import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { teal } from '@mui/material/colors';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SimilarProductCard = ({ product }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    const handleIconClick = () => {
        setIsFavorite((prev) => !prev);
    };

    return (
        <div
            onClick={() => navigate(
                `/product-details/${product.category?.categoryId}/${product.title}/${product.id}`
            )}
            className='group'
        >
            <div className="relative h-[300px]">
                <img
                    className="h-full w-full object-cover"
                    src={product.images[0]}
                    alt={`product-similar`}
                />
            </div>
            <div className='details pt-3 space-y-1 group-hover-effect rounded-md'>
                <div className='name space-y'>
                    <h1 className='font-semibold text-lg'>{product.seller?.businessDetails.businessName}</h1>
                    <p className=''>{product.title}</p>
                </div>
                <div className='price flex items-center gap-3'>
                    <span className='font-semibold text-gray-800'> ₹{product.sellingPrice}</span>
                    <span className='text thin-line-through text-gray-400 '>₹{product.mrpPrice}</span>
                    <span className='text-[#3f51b5] font-semibold'>{product.discountPercent}% off</span>
                </div>
            </div>
        </div>
    );
};

export default SimilarProductCard;
