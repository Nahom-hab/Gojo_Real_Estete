import React, { useEffect } from 'react'
import { FavoritedListing } from '../assets/data/favorite'
import FavoriteCard from '../component/FavoriteCard'
import { useLocation } from 'react-router-dom';

export default function Favorite() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='flex justify-center p-2 mt-10'>
            <div className='flex flex-col items-start'>
                <div className='text-3xl text-green-600 mb-5'>Your Favorite Listings</div>
                <div className='grid w-fit lg:grid-cols-4  grid-cols-2 gap-4 md:grid-cols-3   justify-center'>
                    {FavoritedListing.map((result) => <FavoriteCard key={result.name} similar={false} result={result} />)}
                </div>
            </div>

        </div>
    )
}

