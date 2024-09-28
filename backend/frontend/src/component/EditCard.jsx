import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaEdit, FaTrash } from 'react-icons/fa';

export default function EditCard({ result, similar }) {
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [notification, setNotification] = useState('');

    const handleEdit = () => {
        navigate(`/editListing/${result._id}`, { state: result });
    };

    const handleDelete = async () => {
        const res = await fetch(`/api/listing/${result._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
            // if (true) {
            setNotification('Listing deleted successfully!');
            setIsPopupOpen(false);
            setTimeout(() => {
                setNotification('');
            }, 3000);
        } else {
            const { error } = await res.json();
            console.error(error);
        }
    };

    const handleClick = () => {
        navigate(`/viewListing/${result._id}`, { state: { result, similar } });
    };

    return (
        <div className="bg-white dark:bg-gray-900 dark:border-gray-600 dark:text-white border flex-none w-full  md:w-[220px] p-3 border-gray-200 rounded-lg shadow-lg cursor-pointer relative transition-transform duration-300 transform hover:scale-105">
            <div className="overflow-hidden h-32 rounded-lg">
                {result.imageURLs.length > 0 ? (
                    <img
                        onClick={handleClick}
                        className="object-cover w-full h-full transition-transform duration-500 transform hover:scale-110"
                        src={result.imageURLs[0]}
                        alt={result.name}
                    />
                ) : (
                    <div className="w-full bg-slate-200 h-full transition-transform duration-500 transform hover:scale-110"></div>
                )}
            </div>
            <div className="p-2">
                <div className="font-semibold dark:text-white text-black text-sm mb-1">{result.name}</div>
                <div className="dark:text-gray-400 text-gray-600 flex items-center mb-1 text-xs">
                    <FaMapMarkerAlt className="text-green-500 mr-1" />
                    <span>{result.address}</span>
                </div>
                <div className="dark:text-gray-300 text-gray-700 text-xs mb-2">
                    {result.description.slice(0, 40)}{result.description.length > 40 ? '...' : ''}
                </div>
                <div className="text-green-600 font-bold text-base mb-2">
                    ${result.regularPrice} {result.RentOrSell === 'rent' ? '/Month' : ''}
                </div>
                <div className="flex gap-2 text-xs dark:text-gray-300 text-gray-600">
                    <div>{result.bathrooms} baths</div>
                    <div>{result.bedrooms} beds</div>
                </div>
            </div>
            <div className='flex justify-between mt-2'>
                <button
                    onClick={handleEdit}
                    className='flex items-center bg-blue-500 text-white px-3 py-1 rounded-lg transition-colors duration-300 hover:bg-blue-600 text-xs'
                >
                    <FaEdit className="mr-1" /> Edit
                </button>
                <button
                    onClick={() => setIsPopupOpen(true)}
                    className='flex items-center bg-red-500 text-white px-3 py-1 rounded-lg transition-colors duration-300 hover:bg-red-600 text-xs'
                >
                    <FaTrash className="mr-1" /> Delete
                </button>
            </div>

            {/* Confirmation Popup */}
            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="dark:bg-gray-700 bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-sm font-semibold mb-4">Are you sure you want to delete this listing?</h2>
                        <div className="flex justify-between">
                            <button
                                onClick={handleDelete}
                                className="bg-red-500  text-white text-sm px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-red-600"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className="bg-gray-300 px-4 py-2 dark:text-black text-sm rounded-lg transition-colors duration-300 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notification */}
            {notification && (
                <div className={`absolute top-4 right-4 z-50 transition-opacity duration-300`}>
                    <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
                        {notification}
                    </div>
                </div>
            )}
        </div>
    );
}
