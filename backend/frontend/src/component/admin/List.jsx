import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBath, FaBed, FaCar, FaPhone, FaMoneyBill, FaHome, FaEdit, FaTrash, FaMapMarkerAlt } from 'react-icons/fa';

export default function ListCard({ product }) {
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Handle Card Click: Navigate to product detail view
    const handleCardClick = () => {
        navigate(`/admin/ViewListing/${product._id}`, { state: product });
    };






    return (
        <div
            className="flex flex-col p-2 border rounded-lg shadow-md hover:shadow-lg cursor-pointer relative w-64" // made smaller with w-64
            onClick={handleCardClick}
        >
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold truncate">{product.name}</h3>
                {/* Activation Indicator */}
                <span
                    className={`px-2 py-1 text-xs rounded-full ${product.activated ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
                        }`}
                >
                    {product.activated ? 'Active' : 'Inactive'}
                </span>
            </div>

            {/* Display Product Image */}
            <div className="mb-2">
                <img
                    src={product.imageURLs[0]}
                    alt={product.name}
                    className="w-full h-20 object-cover rounded-md" // made image smaller with h-20
                />
            </div>
            <div className="flex mb-3 items-center">
                <FaMapMarkerAlt className="mr-1 text-gray-500" />
                <span>{product.address}</span>
            </div>
            <div className="grid grid-cols-2 space-y-1 text-xs">

                <div className="flex items-center">
                    <FaMoneyBill className="mr-1 text-gray-500" />
                    <span>Price: ${product.regularPrice}</span>
                </div>

                <div className="flex items-center">
                    <FaMoneyBill className="mr-1 text-gray-500" />
                    <span>Discount: ${product.discountedPrice}</span>
                </div>

                <div className="flex items-center">
                    <FaBed className="mr-1 text-gray-500" />
                    <span>{product.bedrooms} Bedrooms</span>
                </div>

                <div className="flex items-center">
                    <FaBath className="mr-1 text-gray-500" />
                    <span>{product.bathrooms} Bathrooms</span>
                </div>

                <div className="flex items-center">
                    <FaCar className="mr-1 text-gray-500" />
                    <span>{product.parking} Parking</span>
                </div>

                <div className="flex items-center">
                    <FaPhone className="mr-1 text-gray-500" />
                    <span>{product.phoneNumber}</span>
                </div>

                <div className="flex items-center">
                    <FaHome className="mr-1 text-gray-500" />
                    <span>{product.HomeType} ({product.RentOrSell})</span>
                </div>
            </div>

        </div>
    );
}
