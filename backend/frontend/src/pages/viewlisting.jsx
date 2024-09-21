import React, { useState } from 'react';
import { FaBath, FaBed, FaChair, FaHome, FaMapMarkerAlt, FaParking, FaPhone } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

export default function ViewListing() {
  const location = useLocation();
  const result = location.state || {};
  console.log(result);

  const [listing, setListing] = useState(result);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  if (!listing) {
    return <p className="text-center text-gray-600">No listing found.</p>;
  }

  return (
    <div className="p-10 pt-20 md:flex ">
      <div className="md:w-[1600px]">
        {listing.imageURLs.length === 1 && (
          <img className='w-[600px] object-cover h-80 rounded-md' src={listing.imageURLs[0]} alt="" />
        )}

        {listing.imageURLs.length === 2 && (
          <div className=' flex  gap-2'>
            <img className='w-56 object-cover h-96 rounded-md' src={listing.imageURLs[0]} alt="" />
            <img className='w-56 object-cover h-96 rounded-md' src={listing.imageURLs[1]} alt="" />
          </div>
        )}
        {listing.imageURLs.length >= 3 && (
          <div className='flex flex-col md:flex-row gap-1'>
            <img className='w-full object-cover rounded-md h-[200px]' src={listing.imageURLs[0]} alt="" />
            <div className='flex md:flex-col gap-1'>
              <img className='md:w-[300px] w-[174px] h-44 object-cover rounded-md' src={listing.imageURLs[1]} alt="" />
              <img className='md:w-[300px]  w-[174px] h-44 object-cover rounded-md' src={listing.imageURLs[2]} alt="" />
            </div>
          </div>
        )}
      </div>
      <div className="md:p-6 pt-6">
        <div className='flex justify-between'>
          <p className="md:text-2xl text-xl font-bold mb-2">
            <FaMapMarkerAlt className="text-green-600 inline-block mr-2" />
            {listing.address}
          </p>
          <div className='w-16 h-16 px-2 rounded-full border-2 flex justify-center items-center text-[25px] bg-green-600 font-bold text-white border-green-600'>
            {listing.RentOrSell}
          </div>
        </div>

        <div className="md:text-2xl text-xl font-semibold ">
          {listing.name}
          <span className='text-green-600'>
            {listing.RentOrSell ? ` - ETB ${listing.discountedPrice} ${listing.RentOrSell === 'rent' ? '/Month' : ''}` : ''}
          </span>
        </div>

        <div className="flex mb-6">
          <div className={` text-xl py-1 rounded-full  flex gap-2 items-center text-black`}>
            <FaHome className='text-green-600 text-2xl' />
            {listing.HomeType}
          </div>
        </div>
        <p className="mb-4 font-bold text-black">
          Description: <span className="text-gray-600 font-normal">{listing.description}</span>
        </p>
        <div className="flex gap-4 mb-4">
          <p className="text-lg">
            <FaBed className="inline-block text-gray-600 mr-2" /> {listing.bedrooms} bed
          </p>
          <p className="text-lg">
            <FaBath className="inline-block text-gray-600 mr-2" /> {listing.bathrooms} bath
          </p>
          <p className="text-lg">
            <FaParking className="inline-block text-gray-600 mr-2" /> {listing.parking} parking
          </p>
          <div className='flex gap-2   text-xl items-center'>
            <FaPhone className='text-green-600 text-xl' />
            {listing.phoneNumber}
          </div>
          {/* <p className="text-sm">
            <FaChair className="inline-block text-gray-600 mr-2" /> {listing.furnished ? 'Furnished' : 'No Furnished'}
          </p> */}
        </div>

        {/* <div>
          {currentUser && currentUser.email !== listing.email && !showContactForm && (
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none"
              onClick={() => setShowContactForm(true)}
            >
              Contact Landlord
            </button>
          )}
          {showContactForm && <Contact listing={listing} />}
        </div> */}
      </div>
    </div>
  );
}
