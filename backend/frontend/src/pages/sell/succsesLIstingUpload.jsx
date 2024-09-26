import React from 'react';
import { FaBath, FaBed, FaHome, FaParking, FaPhone } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function SuccessListingUpload() {
    const location = useLocation();
    const navigate = useNavigate();
    const ListingData = location.state || {};
    console.log(ListingData.imageUrls);

    return (
        <div className="flex items-center justify-center py-10 pb-32 bg-gray-100 md:p-4">
            <div className="bg-white rounded-lg md:w-[80%] w-[92%] shadow-lg md:p-8  p-4 animate-fadeIn">
                <h1 className="text-3xl font-bold text-green-600 animate-bounce ">
                    Success! We will review your listing and upload it for you!
                </h1>
                <p className="text-gray-700 mb-6 text-xl ">
                    The Review process might take <span className='text-red-600 font-bold'>1 DAY</span>
                </p>
                <div className='flex md:flex-row flex-col gap-2'>
                    <div>
                        {ListingData.imageUrls.length === 1 && (
                            <img className='w-[600px] object-cover h-80 rounded-md' src={`http://localhost:8000${ListingData.imageUrls[0]}`} alt="" />
                        )}

                        {ListingData.imageUrls.length === 2 && (
                            <div className=' flex flex-col gap-2'>
                                <img className='md:w-80 w-full object-cover h-44 rounded-md' src={`http://localhost:8000${ListingData.imageUrls[0]}`} alt="" />
                                <img className='md:w-80 w-fullobject-cover h-44 rounded-md' src={`http://localhost:8000${ListingData.imageUrls[1]}`} alt="" />
                            </div>
                        )}
                        {ListingData.imageUrls.length >= 3 && (
                            <div className='flex md:flex-row flex-col gap-1'>
                                <img className='md:w-80 w-full object-cover rounded-md h-[200px] md:h-[350px]' src={`http://localhost:8000${ListingData.imageUrls[0]}`} alt="" />
                                <div className='flex md:flex-col gap-1'>
                                    <img className='md:w-80 w-[50%] md:h-44 object-cover rounded-md' src={`http://localhost:8000${ListingData.imageUrls[0]}`} alt="" />
                                    <img className='md:w-80 w-[50%] md:h-44  object-cover rounded-md' src={`http://localhost:8000${ListingData.imageUrls[1]}`} alt="" />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='pl-4 flex flex-col gap-1'>
                        <div className='flex text-md gap-2 text-gray-600'>
                            <div className='text-md font-bold'>Name:</div> {ListingData.name}
                        </div>

                        <div className='flex text-md gap-2 text-gray-600'>
                            <div className='text-md font-bold'>Description:</div> {ListingData.description}
                        </div>

                        <div className='flex text-xl gap-2 font-bold text-green-600'>
                            <div className='text-[16px] text-gray-600 font-bold'>Regular Price:</div>{ListingData.regularPrice}<span className='text-green-600'>birr</span>
                        </div>

                        <div className='flex text-xl gap-2 font-bold text-green-600'>
                            <div className='text-[16px] text-gray-600 font-bold'>Discounted price:</div>{ListingData.discountedPrice}<span className='text-green-600'>birr</span>
                        </div>

                        <div className='flex text-md gap-2 text-gray-600'>
                            <div className='text-md font-bold'>Rent or Sell:</div>For {ListingData.RentOrSell}
                        </div>

                        <div className='flex text-md gap-2 text-gray-600'>
                            <FaPhone className='text-green-600 text-xl' />
                            <div className='text-md font-bold'>phone number:</div> {ListingData.phoneNumber}
                        </div>
                        <div className='flex text-md gap-2 text-gray-600'>
                            <FaBed className="inline-block text-gray-600 mr-1" />

                            <div className='text-md font-bold'>bedrooms:</div> {ListingData.bedrooms}
                        </div>

                        <div className='flex text-md gap-2 text-gray-600'>
                            <FaBath className="inline-block text-gray-600 mr-1" />
                            <div className='text-md font-bold'>bathrooms:</div> {ListingData.bathrooms}
                        </div>
                        <div className='flex text-md gap-2 text-gray-600'>
                            <FaHome className='inline-block text-gray-600 mr-1' />
                            <div className='text-md font-bold'>Home Type:</div>{ListingData.HomeType}
                        </div>

                        <div className='flex text-md gap-2 text-gray-600'>
                            <FaParking className="inline-block text-gray-600 mr-1" />
                            <div className='text-md font-bold'>parking:</div> {ListingData.parking}
                        </div>
                        <Link to={'/'} className="">
                            <button className="mt-4 bg-green-600 text-white font-semibold py-2 px-6 rounded hover:bg-green-700 transition duration-300 transform hover:scale-105">
                                Go to HOME
                            </button>
                        </Link>

                    </div>
                </div>

            </div>
        </div>
    );
}