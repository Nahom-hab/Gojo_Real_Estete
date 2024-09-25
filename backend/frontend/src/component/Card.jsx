import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function Card({ result, similar }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/viewListing/${result._id}`, { state: { result, similar } });
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer hover:shadow-2xl"
            style={{ width: '250px' }}  // Adjust width
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
            <div className="overflow-hidden h-40 rounded-t-lg"> {/* Adjust height */}
                {result.imageURLs.length > 0 ? (
                    <img
                        className="object-cover w-full h-full transition-transform duration-500 transform hover:scale-110"
                        src={result.imageURLs[0]}
                        alt={result.name}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full bg-gray-300 text-gray-600 text-base">
                        No Image Available
                    </div>
                )}
            </div>
            <div className="p-4"> {/* Adjust padding */}
                <div className="font-semibold text-black text-lg mb-1">{result.name}</div> {/* Adjust font size */}
                <div className="text-gray-600 flex items-center mb-2 text-sm">
                    <FaMapMarkerAlt className="text-green-500 mr-1" /> {/* Adjust margin */}
                    <span>{result.address}</span>
                </div>
                <div className="text-gray-700 text-xs mb-3">
                    {result.description.slice(0, 60)}{result.description.length > 60 ? '...' : ''} {/* Adjust slice */}
                </div>
                <div className="text-green-600 font-bold text-base mb-3">${result.regularPrice} /Month</div> {/* Adjust font size */}
                <div className="flex gap-2 text-xs text-gray-600"> {/* Adjust font size */}
                    <div>{result.bathrooms} bathrooms</div>
                    <div>{result.bedrooms} bedrooms</div>
                </div>
            </div>
        </div>
    );
}
