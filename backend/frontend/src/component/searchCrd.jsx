import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function CardSearch({ result }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/viewListing/${result._id}`, { state: result });
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white border w-full md:w-[320px] border-gray-200 rounded-lg shadow-lg  cursor-pointer"
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
            <div className="p-2"> {/* Adjust padding */}
                <div className='flex justify-between'>
                    <div className="font-semibold whitespace-nowrap text-black md:text-sm text-lg mb-1">{result.name}</div> {/* Adjust font size */}
                    <div className="text-green-600 font-bold text-md pr-2 mb-2"><span className='text-[12px] font-normal'>ETB</span>{result.regularPrice} {result.RentOrSell === 'rent' ? '/Month' : ''}</div> {/* Adjust font size */}


                </div>
                <div className="text-gray-600 flex items-center mb-2 text-[16px]">
                    <FaMapMarkerAlt className="text-green-500 text-md mr-1" /> {/* Adjust margin */}
                    <span>{result.address}</span>
                </div>


                <div className="text-gray-700 text-xs mb-2">
                    {result.description.slice(0, 120)}{result.description.length > 120 ? '...' : ''} {/* Adjust slice */}
                </div>
                <div className="flex gap-2 text-xs text-gray-600"> {/* Adjust font size */}
                    <div>{result.bathrooms} bathrooms</div>
                    <div>{result.bedrooms} bedrooms</div>
                </div>
            </div>
        </div>
    );
}
