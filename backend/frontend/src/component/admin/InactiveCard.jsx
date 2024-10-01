import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBath, FaBed, FaCar, FaPhone, FaMoneyBill, FaHome, FaMapMarkerAlt, FaToggleOn } from 'react-icons/fa';
import useUser from '../../zustand/useUser';

export default function ProductCardInactive({ product, activationFinished }) {
    const navigate = useNavigate();
    const { setAllListings } = useUser();

    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const handleCardClick = () => {
        navigate(`/admin/ViewListing/${product._id}`, { state: product });
    };

    const onActivate = async (id) => {
        setLoading(true); // Start loading
        try {
            const response = await fetch(`/api/admin/activate/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            if (response.ok) {
                const data = await response.json();
                if (data) {
                    setShowSuccessPopup(true);
                }
                setLoading(false); // Stop loading

                const listingsResponse = await fetch('/api/listing');
                if (!listingsResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await listingsResponse.json();
                setAllListings(result);
                localStorage.setItem("listings", JSON.stringify(result));
                activationFinished(id);
            } else {
                throw new Error(`Failed to activate product with id: ${id}. Status: ${response.status}`);
            }
        } catch (error) {
            console.error(`Failed to activate product with id: ${id}`, error);
            setErrorMessage(error.message);
            setShowErrorPopup(true);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleActivateClick = () => {
        setShowConfirmPopup(true);
    };

    const confirmActivation = async () => {
        await onActivate(product._id);
        setShowConfirmPopup(false);
    };

    // Effect to handle success message timeout
    useEffect(() => {
        let timer;
        if (showSuccessPopup) {
            timer = setTimeout(() => setShowSuccessPopup(false), 4000);
        }
        return () => clearTimeout(timer);
    }, [showSuccessPopup]);

    return (
        <>
            <div
                className="flex flex-col p-2 border rounded-lg shadow-md hover:shadow-lg cursor-pointer w-full md:w-64"
                onClick={handleCardClick}
            >
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-bold truncate">{product.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${product.activated ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                        {product.activated ? 'Active' : 'Inactive'}
                    </span>
                </div>

                <div className="mb-2">
                    <img
                        src={product.imageURLs[0]}
                        alt={product.name}
                        className="w-full h-20 object-cover rounded-md"
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

                <div className="mt-2 flex justify-between">
                    <button
                        onClick={(e) => { e.stopPropagation(); handleActivateClick(); }}
                        className="px-2 py-1 flex gap-1 items-center bg-green-500 text-white rounded-lg text-xs"
                    >
                        <FaToggleOn className="mr-1" />
                        Activate
                    </button>
                </div>
            </div>

            {/* Confirmation Popup */}
            {showConfirmPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-md shadow-lg">
                        <h2 className="text-lg mb-4">Confirm Activation</h2>
                        <p>Are you sure you want to activate this listing?</p>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                onClick={() => setShowConfirmPopup(false)}
                                className="px-4 py-2 bg-gray-300 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmActivation}
                                className="px-4 py-2 bg-green-500 text-white rounded-md"
                            >
                                Activate
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Popup */}
            {showSuccessPopup && (
                <div className="fixed bottom-4 z-50 right-4 p-4 bg-green-500 text-white rounded-md shadow-lg">
                    <p>Product activated successfully!</p>
                    <button onClick={() => setShowSuccessPopup(false)} className="ml-2 text-white">
                        &times;
                    </button>
                </div>
            )}

            {/* Error Popup */}
            {showErrorPopup && (
                <div className="fixed bottom-4 z-50 right-4 p-4 bg-red-500 text-white rounded-md shadow-lg">
                    <p>{errorMessage}</p>
                    <button onClick={() => setShowErrorPopup(false)} className="ml-2 text-white">
                        &times;
                    </button>
                </div>
            )}

            {/* Loading Spinner */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="loader"></div>
                </div>
            )}

            <style jsx>{`
                .loader {
                    border: 8px solid rgba(255, 255, 255, 0.2);
                    border-left-color: #ffffff;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </>
    );
}