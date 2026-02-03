import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { updateUser } from '../../../../features/user/userSlice';
import { GoHeartFill, GoHeart } from 'react-icons/go';
import toast from 'react-hot-toast';

interface StoreMenubarHeartProps {
    color?: string;
    size?: string;
}

const StoreMenubarHeart: React.FC<StoreMenubarHeartProps> = ({
    color,
    size,
}) => {
    const dispatch = useAppDispatch();
    const store = useAppSelector((state) => state.stores.currentStore);
    const user = useAppSelector((state) => state.user.user);
    const isFavorite = user?.favourites?.stores?.includes(store?._id as string);

    const handleFavoriteClick = () => {
        if (!user || !store) {
            toast.error(`Please log in to manage favorites`, {
                style: {
                  background: '#fef2f2',
                  color: '#991b1b',
                  fontFamily: 'Outfit',
                },
                icon: '❌',
            });
          return;
        }
    
        dispatch(updateUser({
          user: user._id,
          favoriteStore: store._id
        }));
    };

    return (
        <button onClick={handleFavoriteClick} className="focus:outline-none">
            {isFavorite ? 
                <GoHeartFill 
                    style={{
                        color: color || "red", 
                        fontSize: size ||  '4vh',
                    }} className='text-white text-[4.5vh]' 
                /> : 
                <GoHeart 
                    style={{
                        color: color || "red", 
                        fontSize: size  || '4vh',
                    }} className='text-red-600 text-[4.5vh]' 
                />
            }
        </button>
    )
}

export default StoreMenubarHeart