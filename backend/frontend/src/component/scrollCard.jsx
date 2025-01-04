import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function ScrollCard({ result, similar }) {
    const navigate = useNavigate();



    const handleClick = () => {
        navigate(`/viewListing/${result._id}`, { state: { result, similar } });
    };

    return (
        <div
            onClick={handleClick}
            className="dark:bg-gray-900 dark:text-white bg-white border flex-none w-full md:w-[279px] p-2  dark:border-gray-600 border-gray-200 rounded-2xl shadow-lg  cursor-pointer "
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
            <div className="overflow-hidden h-44 rounded-xl">
                {result.imageURLs.length > 0 ? (
                    <img
                        className="object-cover w-full h-full transition-transform rounded-xl duration-500 transform hover:scale-110"
                        src={result.imageURLs[0]}
                        alt={result.name}
                    />
                ) : (
                    <div className="w-full bg-slate-200 h-full transition-transform duration-500 transform hover:scale-110">

                    </div>
                )}
            </div>
            <div className=" pb-0 pr-1 pt-2 pl-1">
                <div className='flex justify-between'>
                    <div className="font-semibold dark:text-white text-black text-sm mb-1">{result.name}</div> {/* Adjust font size */}
                    <div className=" dark:text-white px-2 py-1 rounded-lg bg-gray-200 h-fit dark:bg-gray-800 w-fit text-black text-[12px]">{result.RentOrSell}</div> {/* Adjust font size */}

                </div>
                <div className="dark:text-gray-300 text-gray-600 flex items-center mb-2 text-[14px]">
                    <FaMapMarkerAlt className="text-green-500 mr-1" /> {/* Adjust margin */}
                    <span>{result.address}</span>
                </div>
                <div className="dark:text-gray-300 text-gray-700 text-xs mb-3">
                    {/* {result.description.slice(0, 60)}{result.description.length > 60 ? '...' : ''}  */}
                </div>
                <div className='flex justify-between'>
                    <div className="text-green-600 font-semibold text-base ">${result.regularPrice.toLocaleString()} {result.RentOrSell === 'rent' ? '/month' : ''}</div> {/* Adjust font size */}
                    <div className="flex gap-2 text-xs dark:text-gray-300 text-gray-600"> {/* Adjust font size */}
                        <div className='text-sm'>{result.bedrooms} bed </div>
                        <div className='text-sm'>{result.bathrooms} bath </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
