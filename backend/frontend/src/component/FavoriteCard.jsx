import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function FavoriteCard({ result, similar }) {
    const navigate = useNavigate();



    const handleClick = () => {
        navigate(`/viewListing/${result.name}`, { state: { result, similar } });
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white border flex-none w-[100%] md:w-[210px] p-2 border-gray-200 rounded-lg shadow-lg  cursor-pointer "
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
            <div className="overflow-hidden h-32 rounded-t-lg">
                {result.imageURLs.length > 0 ? (
                    <img
                        className="object-cover w-full h-full transition-transform duration-500 transform hover:scale-110"
                        src={result.imageURLs[0]}
                        alt={result.name}
                    />
                ) : (
                    <div className="w-full bg-slate-200 h-full transition-transform duration-500 transform hover:scale-110">

                    </div>
                )}
            </div>
            <div className="p-4 pb-1 pl-0 pt-1"> {/* Adjust padding */}
                <div className="font-semibold text-black text-sm mb-1">{result.name}</div> {/* Adjust font size */}
                <div className="text-gray-600 flex items-center mb-2 text-sm">
                    <FaMapMarkerAlt className="text-green-500 mr-1" /> {/* Adjust margin */}
                    <span>{result.address}</span>
                </div>

                <div className="text-green-600 font-bold text-base mb-3">${result.regularPrice} {result.RentOrSell === 'rent' ? '/Month' : ''}</div> {/* Adjust font size */}
                <div className="flex gap-2 text-sm text-gray-600"> {/* Adjust font size */}
                    <div>{result.bathrooms} bath
                    </div>
                    <div>{result.bedrooms} bed</div>
                </div>
            </div>
        </div>
    );
}
