import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Change to useNavigate
import bg from '../../assets/images/Adresshouse2.jpeg';

const ListingPage = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [formData, setFormData] = useState({
        streetAddress: '',
        city: '',
        latitude: '',
        longitude: '',
    });

    const [errors, setErrors] = useState({
        latitude: '',
        longitude: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'latitude') {
            if (value !== '' && (isNaN(value) || value < -90 || value > 90)) {
                setErrors({ ...errors, latitude: 'Latitude must be between -90 and 90.' });
            } else {
                setErrors({ ...errors, latitude: '' });
            }
        }

        if (name === 'longitude') {
            if (value !== '' && (isNaN(value) || value < -180 || value > 180)) {
                setErrors({ ...errors, longitude: 'Longitude must be between -180 and 180.' });
            } else {
                setErrors({ ...errors, longitude: '' });
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!errors.latitude && !errors.longitude) {
            console.log('Form Submitted', formData);
            // Navigate to the new route with form data
            navigate('/ConfirmationPage', { state: { formData } }); // Use navigate instead of history.push
        } else {
            console.log('Errors in form data:', errors);
        }
    };

    return (
        <div className="bg-white">
            <div className="relative">
                <img
                    src={bg}
                    alt="Listing"
                    className="w-full h-[60vh] object-cover"
                />
                <div className="absolute bottom-0 w-full bg-blue-500 bg-opacity-65 p-4 text-white shadow-lg">
                    <div className='text-2xl md:text-3xl font-bold border border-x-0 border-t-0 w-fit mb-5 pb-2 text-white border-b-slate-200'>
                        Post your Listing on Gojo for Free
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                        <div className='flex-1'>
                            <label className='font-bold'>Street Address :</label>
                            <input
                                type="text"
                                name="streetAddress"
                                value={formData.streetAddress}
                                onChange={handleChange}
                                placeholder="Street Address"
                                className="p-2 w-full outline-blue-500 border-blue-400 text-black rounded-md"
                                required
                            />
                        </div>
                        <div className='flex-1'>
                            <label className='font-bold'>City Name :</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="City"
                                className="p-2 w-full outline-blue-500 border-blue-400 text-black rounded-md"
                                required
                            />
                        </div>
                        <div className='flex-1'>
                            <label className='font-bold'>Latitude :</label>
                            <input
                                type="text"
                                name="latitude"
                                value={formData.latitude}
                                onChange={handleChange}
                                placeholder="Latitude"
                                className="p-2 w-full outline-blue-500 border-blue-400 text-black rounded-md"
                                required
                            />
                            {errors.latitude && <p className="text-white text-[13px] pt-2">{errors.latitude}</p>}
                        </div>
                        <div className='flex-1'>
                            <label className='font-bold'>Longitude :</label>
                            <input
                                type="text"
                                name="longitude"
                                value={formData.longitude}
                                onChange={handleChange}
                                placeholder="Longitude"
                                className="p-2 w-full text-black outline-blue-500 border-blue-400 rounded-md"
                                required
                            />
                            {errors.longitude && <p className="text-white text-[13px] pt-2">{errors.longitude}</p>}
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md transition duration-300"
                        >
                            Save Place
                        </button>
                    </form>
                </div>
            </div>

            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">WHY Post on Gojo</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Features Section */}
                    <div className="bg-white border rounded-lg shadow-lg p-4 transform transition-transform duration-300 hover:scale-105">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Easy Listing"
                            className="w-full h-32 object-cover mb-2 rounded-md"
                        />
                        <h3 className="text-lg font-semibold">Easy Listing</h3>
                        <p className="text-gray-600">Quickly post your property listings with our user-friendly interface, designed for real estate agents.</p>
                    </div>

                    <div className="bg-white border rounded-lg shadow-lg p-4 transform transition-transform duration-300 hover:scale-105">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Advanced Search"
                            className="w-full h-32 object-cover mb-2 rounded-md"
                        />
                        <h3 className="text-lg font-semibold">Advanced Search</h3>
                        <p className="text-gray-600">Help buyers find their dream property with advanced search filters tailored to their needs.</p>
                    </div>

                    <div className="bg-white border rounded-lg shadow-lg p-4 transform transition-transform duration-300 hover:scale-105">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Instant Notifications"
                            className="w-full h-32 object-cover mb-2 rounded-md"
                        />
                        <h3 className="text-lg font-semibold">Instant Notifications</h3>
                        <p className="text-gray-600">Receive instant notifications when buyers show interest in your home, ensuring you never miss an opportunity.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingPage;
