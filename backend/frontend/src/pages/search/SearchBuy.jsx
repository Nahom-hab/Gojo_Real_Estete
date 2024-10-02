import React, { useState } from 'react';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import SearchListings from '../../component/SearchListings';
import LeafletMap from './Map';
import FetchListingHook from '../../Functions/FetchListingHook';

export default function SearchBuy() {
    FetchListingHook()

    const [formData, setFormData] = useState({
        searchQuery: '',
        forSale: 'sale', // default option
        priceRange: { min: '', max: '' },
        beds: 'Any',
        baths: 'Any',
        homeTypes: {
            "any": true,
            "single-family": false,
            "condo": false,
            "townhouse": false,
            "apartment": false,
            "bungalow": false,
            "duplex": false,
            "loft": false,
            "villa": false
        },
        parkingSpots: 'Any',
        hasBasement: false,
        sqftRange: { min: '', max: '' }
    });

    const [showDropdown, setShowDropdown] = useState({
        forSale: false,
        price: false,
        bedsBaths: false,
        homeType: false,
        more: false,
        filter: false
    });

    const [listingsForMap, setListingsForMap] = useState([])

    const toggleDropdown = (menu) => {
        setShowDropdown((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));
    };

    const closeAllDropdowns = () => {
        setShowDropdown({
            forSale: false,
            price: false,
            bedsBaths: false,
            homeType: false,
            more: false,
            filter: false
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));


    };
    const handleNestedInputChange = (e) => {
        const { name, value } = e.target;
        const [field, subField] = name.split('.'); // Split the name into main field and sub-field

        setFormData((prev) => ({
            ...prev,
            [field]: {
                ...prev[field],
                [subField]: value, // Update the nested sub-field
            },
        }));
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setFormData((prev) => ({
            ...prev,
            homeTypes: { ...prev.homeTypes, [value]: checked }
        }));


    };

    const handleSelectChange = (type, value) => {
        setFormData((prev) => ({
            ...prev,
            [type]: value
        }));


    };

    const handleSubmit = () => { console.log(formData); }
    return (
        <div className='border dark:bg-gray-800 dark:text-white border-x-0 border-l-0 border-r-0 border-t-slate-500 pt-3'>
            <div className=' justify-center gap-1 flex'>
                <div className="relative hidden md:block w-[40%] dark:bg-gray-900 dark:text-white  max-w-lg mr-5">
                    <input
                        name="searchQuery"
                        value={formData.searchQuery}
                        onChange={handleInputChange}
                        className="w-full text-[15px] pl-10 px-4 py-[6px] dark:bg-gray-900 dark:text-white rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
                        type="text"
                        placeholder="Address, neighbourhood, city"
                    />
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400 dark:text-white w-5 h-5" />
                    </div>
                </div>
                {/* For Sale Dropdown */}
                <div className="relative">
                    <button
                        className="border border-gray-500 flex gap-3 items-center text-[12px]  md:text-[15px] px-4 py-[6px] rounded-md dark:hover:bg-gray-700 hover:bg-blue-100"
                        onClick={() => toggleDropdown('forSale')}
                    >
                        For  {formData.forSale} <FaChevronDown />
                    </button>
                    {showDropdown.forSale && (
                        <div className="absolute top-12 left-0 w-56 dark:text-white dark:bg-gray-900 bg-white shadow-lg rounded-md z-10 p-4">
                            <div className="space-y-4">
                                {['sale', 'rent', 'both'].map(option => (
                                    <div key={option}>
                                        <label className="flex text-xl items-center">
                                            <input
                                                type="radio"
                                                name="forSale"
                                                value={option}
                                                checked={formData.forSale === option}
                                                onChange={handleInputChange}
                                                className="form-radio text-blue-500 h-5 w-5 mr-2"
                                            />
                                            {option === 'both' ? 'Sale and Rent' : `For ${option.charAt(0).toUpperCase() + option.slice(1)}`}
                                        </label>
                                    </div>
                                ))}
                                <button
                                    onClick={closeAllDropdowns}
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md dark:hover:bg-gray-700 hover:bg-blue-600 transition-colors duration-300"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    )}
                </div>


                {/* filter drop down for phone */}
                <div className="relative block md:hidden">
                    <button
                        className="border border-gray-500 flex gap-3 items-center text-[12px]  md:text-[15px] px-4 py-[6px] rounded-md dark:hover:bg-gray-700 hover:bg-blue-100"
                        onClick={() => toggleDropdown('filter')}
                    >
                        Filter  <FaChevronDown />
                    </button>
                    {showDropdown.filter && (
                        <div className="fixed top-0 left-0 w-full h-screen dark:bg-gray-900 bg-white shadow-lg z-10 p-4 overflow-y-auto">
                            <div>
                                <div className='flex justify-between'>
                                    <p className="text-md dark:text-white text-slate-700 mb-3">Price Range</p>
                                    <div className='text-red-600' onClick={closeAllDropdowns}>Cancel</div>
                                </div>
                                <div className="flex space-x-4 mb-4">
                                    <div className="flex-1">
                                        <label htmlFor="min-price" className="text-lg dark:text-gray-300 text-gray-500">Min:</label>
                                        <input
                                            type="number"
                                            id="min-price"
                                            name="priceRange.min" // Use this for nested state
                                            value={formData.priceRange.min}
                                            onChange={handleNestedInputChange} // Use the new handler
                                            placeholder="0"
                                            className="w-full border dark:bg-gray-900 dark:border-gray-600 border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="max-price" className="text-lg dark:text-gray-300 text-gray-500">Max:</label>
                                        <input
                                            type="number"
                                            id="max-price"
                                            name="priceRange.max" // Use this for nested state
                                            value={formData.priceRange.max}
                                            onChange={handleNestedInputChange} // Use the new handler
                                            placeholder="10000"
                                            className="w-full border dark:bg-gray-900 dark:border-gray-600 border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                </div>

                            </div>
                            <div>
                                <p className="text-lg dark:text-gray-300 text-gray-600 mb-4">Select Bedrooms</p>
                                <div className="flex flex-wrap mb-4">
                                    {['Any', '1+', '2+', '3+', '4+', '5+'].map(option => (
                                        <button
                                            key={option}
                                            onClick={() => handleSelectChange('beds', option)}
                                            className={`w-12 h-12 border dark:border-gray-600 border-gray-300 text-md flex items-center justify-center ${formData.beds === option ? 'dark:bg-gray-700 bg-blue-200' : ''} dark:hover:bg-gray-500 hover:bg-blue-100 focus:outline-none`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-lg dark:text-gray-300 text-gray-600 mb-4">Select Bathrooms</p>
                                <div className="flex flex-wrap mb-4">
                                    {['Any', '1+', '2+', '3+', '4+', '5+'].map(option => (
                                        <button
                                            key={option}
                                            onClick={() => handleSelectChange('baths', option)}
                                            className={`w-12 h-12 border dark:border-gray-600 border-gray-300 text-md flex items-center justify-center ${formData.baths === option ? 'dark:bg-gray-700 bg-blue-200' : ''} dark:hover:bg-gray-500 hover:bg-blue-100 focus:outline-none`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>

                            </div>
                            <div>
                                <p className="text-md dark:text-gray-300 text-slate-700 mb-3">Home Type</p>
                                <div className="space-y-2 grid grid-cols-2 justify-between">
                                    {Object.keys(formData.homeTypes).map((type) => (
                                        <label key={type} className="flex items-center text-md">
                                            <input
                                                type="checkbox"
                                                name="homeType"
                                                value={type}
                                                checked={formData.homeTypes[type]}
                                                onChange={handleCheckboxChange}
                                                className="form-checkbox text-blue-500 h-4 w-4 mr-2"
                                            />
                                            {type.replace(/-/g, ' ')}
                                        </label>
                                    ))}
                                </div>

                            </div>
                            <div>
                                <p className="text-lg dark:text-gray-300 text-gray-600 mb-4">Select Parking Spots</p>
                                <div className="flex flex-wrap mb-4">
                                    {['Any', '1+', '2+', '3+', '4+', '5+'].map(option => (
                                        <button
                                            key={option}
                                            onClick={() => handleSelectChange('parkingSpots', option)}
                                            className={`w-11 h-11 border dark:border-gray-600 border-gray-300 text-md flex items-center justify-center mb-2 ${formData.parkingSpots === option ? 'dark:bg-gray-700 bg-blue-200' : ''} dark:hover:bg-gray-500 hover:bg-blue-100 focus:outline-none`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center mb-4">
                                    <input
                                        type="checkbox"
                                        id="basement"
                                        name="hasBasement"
                                        checked={formData.hasBasement}
                                        onChange={(e) => setFormData(prev => ({ ...prev, hasBasement: e.target.checked }))}
                                        className="form-checkbox text-blue-500 h-6 w-6 mr-2"
                                    />
                                    <label htmlFor="basement" className="text-md dark:text-gray-300 text-gray-600">Has Basement</label>
                                </div>
                                <p className="text-md dark:text-gray-300 text-slate-700 mb-3">Square Feet Range</p>
                                <div className="flex space-x-4 mb-1">
                                    <div className="flex-1">
                                        <label htmlFor="min-sqft" className="text-lg dark:text-gray-300 text-gray-500">Min:</label>
                                        <input
                                            type="number"
                                            id="min-sqft"
                                            name="sqftRange.min"
                                            value={formData.sqftRange.min}
                                            onChange={handleNestedInputChange}
                                            placeholder="0"
                                            className="w-full border dark:bg-gray-900 dark:border-gray-600 border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="max-sqft" className="text-lg dark:text-gray-300 text-gray-500">Max:</label>
                                        <input
                                            type="number"
                                            id="max-sqft"
                                            name="sqftRange.max"
                                            value={formData.sqftRange.max}
                                            onChange={handleNestedInputChange}
                                            placeholder="10000"
                                            className="w-full border dark:bg-gray-900 dark:border-gray-600 border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={closeAllDropdowns}
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md dark:hover:bg-gray-700 hover:bg-blue-600 transition-colors duration-300 mt-4"
                                >
                                    Apply
                                </button>
                            </div>

                        </div>
                    )}
                </div>

                {/* Price Dropdown */}
                <div className="relative hidden md:block">
                    <button
                        className="border border-gray-500 flex gap-3 items-center text-[15px] px-5 py-[6px] rounded-md dark:hover:bg-gray-700 hover:bg-blue-100"
                        onClick={() => toggleDropdown('price')}
                    >
                        Price <FaChevronDown />
                    </button>
                    {showDropdown.price && (
                        <div className="absolute top-12 left-0 w-72 dark:bg-gray-900 bg-white shadow-lg rounded-md z-10 p-4">
                            <p className="text-md dark:text-gray-300 text-slate-700 mb-3">Price Range</p>
                            <div className="flex space-x-4 mb-4">
                                <div className="flex-1">
                                    <label htmlFor="min-price" className="text-lg dark:text-white text-gray-500">Min:</label>
                                    <input
                                        type="number"
                                        id="min-price"
                                        name="priceRange.min" // Use this for nested state
                                        value={formData.priceRange.min}
                                        onChange={handleNestedInputChange} // Use the new handler
                                        placeholder="0"
                                        className="w-full border dark:bg-gray-800 dark:border-gray-600  border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="max-price" className="text-lg dark:text-white text-gray-500">Max:</label>
                                    <input
                                        type="number"
                                        id="max-price"
                                        name="priceRange.max" // Use this for nested state
                                        value={formData.priceRange.max}
                                        onChange={handleNestedInputChange} // Use the new handler
                                        placeholder="10000"
                                        className="w-full border border-gray-300 dark:bg-gray-800 dark:border-gray-600 rounded-md p-2"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={closeAllDropdowns}
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md dark:hover:bg-gray-700 hover:bg-blue-600 transition-colors duration-300"
                            >
                                Apply
                            </button>
                        </div>
                    )}
                </div>
                {/* Beds & Baths Dropdown */}
                <div className="relative  hidden md:block">
                    <button
                        className="border border-gray-500 flex gap-3 items-center text-[15px] px-5 py-[6px] rounded-md dark:hover:bg-gray-700 hover:bg-blue-100"
                        onClick={() => toggleDropdown('bedsBaths')}
                    >
                        Beds & Baths <FaChevronDown />
                    </button>
                    {showDropdown.bedsBaths && (
                        <div className="absolute top-12 left-0 w-80 dark:bg-gray-900 bg-white shadow-lg rounded-md z-10 p-4">
                            <p className="text-lg  dark:text-white text-gray-600 mb-4">Select Bedrooms</p>
                            <div className="flex flex-wrap mb-4">
                                {['Any', '1+', '2+', '3+', '4+', '5+'].map(option => (
                                    <button
                                        key={option}
                                        onClick={() => handleSelectChange('beds', option)}
                                        className={`w-12 h-12 border dark:border-gray-600 border-gray-300 text-md flex items-center justify-center ${formData.beds === option ? 'dark:bg-gray-700 bg-blue-200' : ''} dark:hover:bg-gray-700 hover:bg-blue-100 focus:outline-none`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            <p className="text-lg  dark:text-white text-gray-600 mb-4">Select Bathrooms</p>
                            <div className="flex flex-wrap mb-4">
                                {['Any', '1+', '2+', '3+', '4+', '5+'].map(option => (
                                    <button
                                        key={option}
                                        onClick={() => handleSelectChange('baths', option)}
                                        className={`w-12 h-12 border dark:border-gray-600 border-gray-300 text-md flex items-center justify-center ${formData.baths === option ? 'dark:bg-gray-700 bg-blue-200' : ''} dark:hover:bg-gray-700 hover:bg-blue-100 focus:outline-none`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={closeAllDropdowns}
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md dark:hover:bg-gray-700 hover:bg-blue-600 transition-colors duration-300 mt-4"
                            >
                                Apply
                            </button>
                        </div>
                    )}
                </div>
                {/* Home Type Dropdown */}
                <div className="relative  hidden md:block">
                    <button
                        className="border border-gray-500 flex gap-3 items-center text-[15px] px-5 py-[6px] rounded-md dark:hover:bg-gray-700 hover:bg-blue-100"
                        onClick={() => toggleDropdown('homeType')}
                    >
                        Home Type <FaChevronDown />
                    </button>
                    {showDropdown.homeType && (
                        <div className="absolute top-12 left-0 w-56 dark:bg-gray-900  bg-white shadow-lg rounded-md z-10 p-4">
                            <p className="text-md dark:text-white text-slate-700 mb-3">Home Type</p>
                            <div className="space-y-2">
                                {Object.keys(formData.homeTypes).map((type) => (
                                    <label key={type} className="flex items-center text-md">
                                        <input
                                            type="checkbox"
                                            name="homeType"
                                            value={type}
                                            checked={formData.homeTypes[type]}
                                            onChange={handleCheckboxChange}
                                            className="form-checkbox text-blue-500 h-4 w-4 mr-2"
                                        />
                                        {type.replace(/-/g, ' ')}
                                    </label>
                                ))}
                            </div>
                            <button
                                onClick={closeAllDropdowns}
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md dark:hover:bg-gray-700 hover:bg-blue-600 transition-colors duration-300 mt-4"
                            >
                                Apply
                            </button>
                        </div>
                    )}
                </div>
                {/* More Dropdown */}
                <div className="relative  hidden md:block">
                    <button
                        className="border border-gray-500 flex gap-3 items-center text-[15px] px-5 py-[6px]  rounded-md dark:hover:bg-gray-700 hover:bg-blue-100"
                        onClick={() => toggleDropdown('more')}
                    >
                        More <FaChevronDown />
                    </button>
                    {showDropdown.more && (
                        <div className="absolute top-12 right-0 w-80 dark:bg-gray-900 bg-white shadow-lg rounded-md z-10 p-4">
                            <p className="text-lg dark:text-white text-gray-600 mb-4">Select Parking Spots</p>
                            <div className="flex flex-wrap mb-4">
                                {['Any', '1+', '2+', '3+', '4+', '5+'].map(option => (
                                    <button
                                        key={option}
                                        onClick={() => handleSelectChange('parkingSpots', option)}
                                        className={`w-11 h-11 border dark:bg-gray-900 dark:border-gray-600 border-gray-300 text-md flex items-center justify-center mb-2 ${formData.parkingSpots === option ? 'dark:bg-gray-600 bg-blue-200' : ''} dark:hover:bg-gray-700 hover:bg-blue-100 focus:outline-none`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    id="basement"
                                    name="hasBasement"
                                    checked={formData.hasBasement}
                                    onChange={(e) => setFormData(prev => ({ ...prev, hasBasement: e.target.checked }))}
                                    className="form-checkbox text-blue-500 h-6 w-6 mr-2"
                                />
                                <label htmlFor="basement" className="text-md dark:text-gray-300 text-gray-600">Has Basement</label>
                            </div>
                            <p className="text-md dark:text-white text-slate-700 mb-3">Square Feet Range</p>
                            <div className="flex space-x-4 mb-1">
                                <div className="flex-1">
                                    <label htmlFor="min-sqft" className="text-lg dark:text-gray-300 text-gray-500">Min:</label>
                                    <input
                                        type="number"
                                        id="min-sqft"
                                        name="sqftRange.min"
                                        value={formData.sqftRange.min}
                                        onChange={handleNestedInputChange}
                                        placeholder="0"
                                        className="w-full border dark:bg-gray-900 dark:border-gray-600 border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="max-sqft" className="text-lg dark:text-gray-300 text-gray-500">Max:</label>
                                    <input
                                        type="number"
                                        id="max-sqft"
                                        name="sqftRange.max"
                                        value={formData.sqftRange.max}
                                        onChange={handleNestedInputChange}
                                        placeholder="10000"
                                        className="w-full border dark:bg-gray-900 dark:border-gray-600  border-gray-300 rounded-md p-2"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={closeAllDropdowns}
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md dark:hover:bg-gray-700 hover:bg-blue-600 transition-colors duration-300 mt-4"
                            >
                                Apply
                            </button>
                        </div>
                    )}
                </div>
                <div>
                    <button onClick={handleSubmit} className='px-6 py-[4px] md:py-[6px] rounded-md bg-blue-500 text-white'>Save Search</button>
                </div>
                <div
                    className={`fixed inset-0 ${Object.values(showDropdown).includes(true) ? 'block' : 'hidden'}`}
                    onClick={closeAllDropdowns}
                />
            </div>
            <div className='border border-t-gray-500 flex flex-col  md:flex-row gap-1  pt-0 mt-2  w-full'>
                <div className='bg-slate-800 w-[100%]  md:w-[50%]  z-0 md:h-[calc(100vh-145px)]  h-[300px] '>
                    <LeafletMap listingsForMap={listingsForMap} />
                </div>
                <div className='w-[100%] md:w-[57%] '>
                    <SearchListings setListingsForMap={setListingsForMap} SearchFields={formData} />
                </div>
            </div>
        </div>
    )
}

