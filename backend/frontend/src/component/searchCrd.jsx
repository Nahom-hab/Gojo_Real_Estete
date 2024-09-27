import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaMapMarkerAlt, FaRegHeart } from 'react-icons/fa';
import useUser from '../zustand/useUser';

export default function CardSearch({ result, similar }) {
    const { user } = useUser();
    const navigate = useNavigate();
    const [isSelected, setIsSelected] = useState(false);

    // Check if the result is already favorited
    useEffect(() => {
        const checkIfFavorited = async () => {
            const response = await fetch(`/api/saved/${user._id}/listing/${result._id}`);
            if (response.ok) {
                const data = await response.json();
                setIsSelected(data.isFavorited); // Assuming the API returns { isFavorited: true/false }
            }
        };

        if (user && result) {
            checkIfFavorited();
        }
    }, [result._id, user?._id]);

    const handleToggle = async (e) => {
        e.stopPropagation(); // Prevent the click event from bubbling up to the card
        setIsSelected((prev) => !prev);

        // Prepare the request body
        const requestBody = {
            userId: user._id,
            FavoritedId: [result._id], // Array of favorited IDs
        };

        try {
            // Determine whether to add or remove from favorites
            const method = isSelected ? 'DELETE' : 'POST';
            const response = await fetch('/api/saved', {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data); // Handle success response
        } catch (error) {
            console.error('Error:', error); // Handle error response
        }
    };

    const handleClick = () => {
        navigate(`/viewListing/${result._id}`, { state: { result, similar } });
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white border w-full md:w-[320px] border-gray-200 rounded-lg shadow-lg cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
            <div className="overflow-hidden h-40 rounded-t-lg">
                {result.imageURLs.length > 0 ? (
                    <div className="relative">
                        <img src={result.imageURLs[0]} alt="Listing" className="w-full h-auto" />
                        <div className="absolute top-2 right-2">
                            <button type="button" onClick={handleToggle} className="focus:outline-none">
                                {isSelected ? (
                                    <FaHeart className="w-6 h-6 text-red-500" />
                                ) : (
                                    <FaRegHeart className="w-6 h-6 text-gray-600" />
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
                    <div className="font-semibold whitespace-nowrap text-black md:text-sm text-lg mb-1">
                        {result.name}
                    </div>
                    <div className="text-green-600 font-bold text-md pr-2 mb-2">
                        <span className='text-[12px] font-normal'>ETB</span>
                        {result.regularPrice} {result.RentOrSell === 'rent' ? '/Month' : ''}
                    </div>
                </div>
                <div className="text-gray-600 flex items-center mb-2 text-[16px]">
                    <FaMapMarkerAlt className="text-green-500 text-md mr-1" />
                    <span>{result.address}</span>
                </div>
                <div className="text-gray-700 text-xs mb-2">
                    {result.description.slice(0, 120)}{result.description.length > 120 ? '...' : ''}
                </div>
                <div className="flex gap-2 text-xs text-gray-600">
                    <div>{result.bathrooms} bathrooms</div>
                    <div>{result.bedrooms} bedrooms</div>
                </div>
            </div>
        </div>
    );
}
