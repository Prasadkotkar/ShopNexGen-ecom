import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { indigo} from '@mui/material/colors';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../Redux Toolkit/Store';
import CloseIcon from '@mui/icons-material/Close';
import { addProductToWishlist } from '../../../Redux Toolkit/Customer/WishlistSlice';

const WishlistProductCard = ({ item }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleIconClick = (e) => {
        setIsFavorite((prev) => !prev);
        if (item.id) {
            dispatch(addProductToWishlist({ productId: item.id }));
        }
    };

    return (
        <div className='w-60 relative'>
            <div className="w-full">
                <img
                    className="object-top w-full"
                    src={item.images[0]}
                    alt={`product-${item.title}`}
                />
            </div>
            <div className='pt-3 space-y-1 rounded-md'>
                <div className='space-y'>
                    <p>{item.title}</p>
                </div>
                <div className='flex items-center gap-3'>
                    <span className='font-semibold text-gray-800'> ₹{item.sellingPrice}</span>
                    <span className='text thin-line-through text-gray-400'>₹{item.mrpPrice}</span>
                    <span className='text-[#3f51b5] font-semibold'>{item.discountPercent}% off</span>
                </div>
            </div>

            <div className='absolute top-1 right-1'>
                <button onClick={handleIconClick}>
                    <CloseIcon className='cursor-pointer bg-white rounded-full p-1' sx={{ color: indigo[500], fontSize: "2rem" }} />
                </button>
            </div>
        </div>
    );
};

export default WishlistProductCard;
