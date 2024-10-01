import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../../assets/images/Adresshouse2.jpeg';
import useUser from '../../zustand/useUser'; // Adjust import based on your state management

const ListingPage = () => {
    const navigate = useNavigate();
    const { isEng } = useUser(); // Get the isEng state
    const [formData, setFormData] = useState({
        streetAddress: '',
        city: '',
        latitude: '9.0192',
        longitude: '38.7525',
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
            navigate('/ConfirmationPage', { state: { formData } });
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
                <div className="absolute bottom-0 w-full   bg-blue-500 bg-opacity-65 p-4 text-white shadow-lg">
                    <div className='text-2xl md:text-3xl font-bold border border-x-0 border-t-0 w-fit mb-5 pb-2 text-white border-b-slate-200'>
                        {isEng ? "Post your Listing on Gojo for Free" : "እባኮትን የእቃዎን ዝርዝር በጎጆ ላይ ይዘጋጁ በነፃ"}
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                        <div className='flex-1'>
                            <label className='font-bold'>{isEng ? "Street Address :" : "የጎዳን አድራሻ :"}</label>
                            <input
                                type="text"
                                name="streetAddress"
                                value={formData.streetAddress}
                                onChange={handleChange}
                                placeholder={isEng ? "Street Address" : "የጎዳን አድራሻ"}
                                className="p-2 w-full outline-blue-500 dark:bg-gray-800 dark:text-white border-blue-400 text-black rounded-md"
                                required
                            />
                        </div>
                        <div className='flex-1'>
                            <label className='font-bold'>{isEng ? "City Name :" : "የከተማ ስም :"}</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder={isEng ? "City" : "ከተማ"}
                                className="p-2 w-full outline-blue-500 dark:bg-gray-800 dark:text-white border-blue-400 text-black rounded-md"
                                required
                            />
                        </div>
                        <div className='flex-1'>
                            <label className='font-bold'>{isEng ? "Latitude (optional)" : "ላቲትዩድ :(አማራጭ)"}</label>
                            <input
                                type="text"
                                name="latitude"
                                value={formData.latitude}
                                onChange={handleChange}
                                placeholder={isEng ? "Latitude (optional)" : "ላቲትዩድ : (አማራጭ)"}
                                className="p-2 w-full outline-blue-500 dark:bg-gray-800 dark:text-white border-blue-400 text-black rounded-md"
                                required
                            />
                            {errors.latitude && <p className="text-white text-[13px] pt-2">{errors.latitude}</p>}
                        </div>
                        <div className='flex-1'>
                            <label className='font-bold'>{isEng ? "Longitude :" : "ሎንጊትዩድ :"}</label>
                            <input
                                type="text"
                                name="longitude"
                                value={formData.longitude}
                                onChange={handleChange}
                                placeholder={isEng ? "Longitude" : "ሎንጊትዩድ"}
                                className="p-2 w-full text-black dark:bg-gray-800 dark:text-white outline-blue-500 border-blue-400 rounded-md"
                                required
                            />
                            {errors.longitude && <p className="text-white text-[13px] pt-2">{errors.longitude}</p>}
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md transition duration-300"
                        >
                            {isEng ? "Save Place" : "መነሻ ቦታ ይዘጋጁ"}
                        </button>
                    </form>
                </div>
            </div>

            <div className="p-6 dark:bg-gray-800 dark:text-white">
                <h2 className="text-2xl font-bold mb-4">{isEng ? "WHY Post on Gojo" : "ለምን በጎጆ ይዘጋጁ"}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Features Section */}
                    <div className="dark:bg-gray-900 dark:text-white border dark:border-gray-600 bg-white  rounded-lg shadow-lg p-4 transform transition-transform duration-300 hover:scale-105">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Easy Listing"
                            className="w-full h-32 object-cover mb-2 rounded-md"
                        />
                        <h3 className="text-lg font-semibold">{isEng ? "Easy Listing" : "አቀማመጥ ይቀላቀል"}</h3>
                        <p className="dark:text-gray-300 text-gray-600">{isEng ? "Quickly post your property listings with our user-friendly interface, designed for real estate agents." : "በቀላሉ ለድርጅቶች የተዘጋጀ የተጠቃሚ አንቀጽ ይጠቀሙ ይቅርታ ይዘጋጁ."}</p>
                    </div>

                    <div className="dark:bg-gray-900 dark:text-white  dark:border-gray-600 bg-white border rounded-lg shadow-lg p-4 transform transition-transform duration-300 hover:scale-105">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Advanced Search"
                            className="w-full h-32 object-cover mb-2 rounded-md"
                        />
                        <h3 className="text-lg font-semibold">{isEng ? "Advanced Search" : "የተሻሻለ ፈልግ"}</h3>
                        <p className="dark:text-gray-300 text-gray-600">{isEng ? "Help buyers find their dream property with advanced search filters tailored to their needs." : "የተሻሻለ ፈልግ ይህ ይህ ይዘጋጁ."}</p>
                    </div>

                    <div className="dark:bg-gray-900 dark:text-white  dark:border-gray-600 bg-white border rounded-lg shadow-lg p-4 transform transition-transform duration-300 hover:scale-105">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Instant Notifications"
                            className="w-full h-32 object-cover mb-2 rounded-md"
                        />
                        <h3 className="text-lg font-semibold">{isEng ? "Instant Notifications" : "የበለጠ ማስታወቂያዎች"}</h3>
                        <p className="dark:text-gray-300 text-gray-600">{isEng ? "Receive instant notifications when buyers show interest in your home, ensuring you never miss an opportunity." : "በገንዘብ ላይ ይጠቀሙ."}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingPage;