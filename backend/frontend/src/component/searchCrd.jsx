import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaMapMarkerAlt, FaRegHeart } from 'react-icons/fa';
import useUser from '../zustand/useUser';

export default function CardSearch({ result, similar }) {
    const { user, Favorite, setFavorite } = useUser(); // Default Favorite to an empty array
    const navigate = useNavigate();
    useEffect(() => {
        const fetchFav = async () => {
            try {
                const response = await fetch(`/api/saved/${user._id}`);
                if (response.ok) {
                    const data = await response.json();
                    const { FavoritedId } = data;
                    const list = AllListings.filter(li => FavoritedId.includes(li._id));
                    setFavorite(list);
                } else {
                    console.log('Error fetching favorites');
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchFav();
    }, [[]]);

    const [isSelected, setIsSelected] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        const FavId = Favorite.map((fa) => (fa._id))
        setIsSelected(FavId.includes(result._id)); // Check if the result ID is in favorites
    }, [Favorite, result._id]);

    const handleToggle = async (e) => {
        e.stopPropagation();
        const newIsSelected = !isSelected;
        setIsSelected(newIsSelected);

        const requestBody = {
            userId: user._id,
            FavoritedId: [result._id],
        };

        try {
            const method = newIsSelected ? 'POST' : 'DELETE';
            const response = await fetch('/api/saved', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
            // Update favorites in state immediately
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClick = () => {
        navigate(`/viewListing/${result._id}`, { state: { result, similar } });
    };

    return (
        <div
            onClick={handleClick}
            className="dark:bg-gray-900 dark:border-gray-600 dark:text-white mb-3 bg-white border w-full md:w-[320px] border-gray-200 rounded-lg shadow-lg cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
            <div className="overflow-hidden h-40 rounded-t-lg">
                {result.imageURLs.length > 0 ? (
                    <div className="relative">
                        <img src={result.imageURLs[0]} alt="Listing" className="w-full h-auto" />
                        <div className="absolute top-2 right-2">
                            <button
                                type="button"
                                onClick={handleToggle}
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                                className="focus:outline-none"
                            >
                                {isSelected ? (
                                    <FaHeart className="w-6 h-6 text-red-500" />
                                ) : (
                                    <FaRegHeart className="w-6 h-6 text-gray-600" />
                                )}
                                {showTooltip && (
                                    <div className="absolute top-0 z-40 right-8 w-32 bg-gray-800 text-white text-[11px] rounded-lg py-1 px-2">
                                        {isSelected ? 'Unsave this listing' : 'Save this listing'}
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full bg-gray-300 text-gray-600 text-base">
                        No Image Available
                    </div>
                )}
            </div>
            <div className="p-2">
                <div className='flex justify-between'>
                    <div className="font-semibold whitespace-nowrap dark:text-white text-black md:text-sm text-[19px] mb-1">
                        {result.name}
                    </div>
                    <div className='bg-green-600 p-3 py-1 rounded-lg text-white'>{result.RentOrSell}</div>
                </div>
                <div className="text-green-600 font-bold text-md pr-2 mb-2">
                    <span className='text-[12px] font-normal'>ETB</span>
                    {result.regularPrice.toLocaleString()} {result.RentOrSell === 'rent' ? '/Month' : ''}
                </div>
                <div className="dark:text-gray-400 text-gray-600 flex items-center mb-2 text-[16px]">
                    <FaMapMarkerAlt className="text-green-500 text-md mr-1" />
                    <span>{result.address}</span>
                </div>
                <div className="dark:text-gray-300 text-gray-700 text-xs mb-2">
                    {result.description.slice(0, 120)}{result.description.length > 120 ? '...' : ''}
                </div>
                <div className="flex gap-2 dark:text-white text-xs text-gray-600">
                    <div>{result.bathrooms} bathrooms</div>
                    <div>{result.bedrooms} bedrooms</div>
                </div>
            </div>
        </div>
    );
}