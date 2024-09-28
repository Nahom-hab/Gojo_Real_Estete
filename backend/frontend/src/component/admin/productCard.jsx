import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBath, FaBed, FaCar, FaPhone, FaMoneyBill, FaHome, FaEdit, FaTrash, FaMapMarkerAlt } from 'react-icons/fa';

export default function ProductCard({ product, onDelete, onEdit }) {
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Handle Card Click: Navigate to product detail view
    const handleCardClick = () => {
        navigate(`/admin/ViewListing/${product._id}`, { state: product });
    };

    // Handle Edit: Navigate to the edit page
    const handleEdit = (e) => {
        e.stopPropagation(); // Prevent card click navigation
        onEdit(product);
    };

    // Handle Delete: Show confirmation popup
    const handleDelete = (e) => {
        e.stopPropagation(); // Prevent card click navigation
        setShowConfirmation(true);
    };

    // Confirm Delete: Call onDelete and hide confirmation popup
    const confirmDelete = () => {
        onDelete(product);
        setShowConfirmation(false);
    };

    return (
        <div
            className="flex flex-col p-2 border rounded-lg shadow-md hover:shadow-lg cursor-pointer relative w-full md:w-64" // made smaller with w-64
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

            {/* Edit and Delete Buttons */}
            <div className="mt-2 flex justify-between">
                <button
                    onClick={handleEdit}
                    className="px-2 py-1 flex gap-1 items-center bg-blue-500 text-white rounded-lg text-xs"
                >
                    <FaEdit className="mr-1" />
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="px-2 py-1 flex gap-1 bg-red-500 items-center text-white rounded-lg text-xs"
                >
                    <FaTrash className="mr-1" />
                    Delete
                </button>
            </div>

            {/* Confirmation Popup */}
            {showConfirmation && (
                <div
                    className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50"
                    onClick={(e) => e.stopPropagation()} // Prevents click from propagating to the card
                >
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-gray-800">Are you sure you want to delete this product?</p>
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
