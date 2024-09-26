import React, { useState } from 'react';
import { FaBath, FaBed, FaHome, FaMapMarkerAlt, FaParking, FaPhone } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import SimilarProducts from '../component/SimilarProducts';
import { listings } from '../assets/data/data';
import findSimilarListings from '../Functions/Similar';
import { list } from 'postcss';

export default function ViewListing() {
  const location = useLocation();
  const { result, similar } = location.state || {}; // Access state
  const [listing, setListing] = useState(result);
  const [loading, setLoading] = useState(false);
  const [similarData, setSimilarData] = useState(findSimilarListings(listing, listings))
  const [error, setError] = useState(null);
  const listingData = listings.filter((list) => list.userRef === listing.userRef)


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
    <div className=''>
      <div className=" p-3 md:p-10 md:pt-20 pt-8  md:flex">
        <div className="md:w-[50%]">
          {listing.imageURLs.length === 1 && (
            <img className='w-[600px] object-cover h-80 rounded-md' src={listing.imageURLs[0]} alt="" />
          )}

          {listing.imageURLs.length === 2 && (
            <div className='flex md:flex-row flex-col   gap-2'>
              <img className='md:w-[50%] w-full object-cover md:h-96 h-52 rounded-md' src={listing.imageURLs[0]} alt="" />
              <img className='md:w-[50%] w-full object-cover md:h-96 h-52 rounded-md' src={listing.imageURLs[1]} alt="" />
            </div>
          )}
          {listing.imageURLs.length >= 3 && (
            <div className='flex flex-col md:flex-row gap-1'>
              <img className='md:w-[60%] w-full object-cover rounded-md h-[260px] md:h-[355px]' src={listing.imageURLs[0]} alt="" />
              <div className='flex md:flex-col gap-1'>
                <img className='md:w-[100%] w-[50%] h-44 object-cover rounded-md' src={listing.imageURLs[1]} alt="" />
                <img className='md:w-[100%]  w-[50%] h-44 object-cover rounded-md' src={listing.imageURLs[2]} alt="" />
              </div>
            </div>
          )}
        </div>
        <div className="md:p-6 md:w-[50%]  pt-6">
          <div className='flex justify-between'>
            <p className="md:text-2xl text-xl font-bold mb-2">
              <FaMapMarkerAlt className="text-green-600 inline-block mr-2" />
              {listing.address}
            </p>
            <div className='w-16 h-16 px-2 rounded-full border-2 md:mr-20 flex justify-center items-center text-[25px] bg-green-600 font-bold text-white border-green-600'>
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
              <FaBed className="inline-block text-gray-600 mr-1" /> {listing.bedrooms} Bed
            </p>
            <p className="text-lg">
              <FaBath className="inline-block text-gray-600 mr-1" /> {listing.bathrooms} Bath
            </p>
            <p className="text-lg">
              <FaParking className="inline-block text-gray-600 mr-1" /> {listing.parking} Parking
            </p>


          </div>
          <div className='flex flex-col md:flex-row md:justify-between md:items-center md:pr-10'>
            <div className='flex gap-4'>
              <div className='text-xl'>
                Listing by <span className='font-bold'> {listing.userRef}</span>
              </div>

              <Link className='font-bold text-xl text-blue-400 hover:text-blue-800'>more</Link>
            </div>
            <div className='flex bg-green-600 p-2 rounded-md text-white w-fit px-5 gap-2 mt-5  text-xl items-center'>
              <FaPhone className='text-white text-xl' />
              {listing.phoneNumber}
            </div>

          </div>


        </div>


      </div>
      <div className=' md:mt-16 mt-5 w-full'>
        <SimilarProducts text={`Similar listings`} data={similarData} />

        <SimilarProducts text={`Listings By ${listing.userRef}`} data={listingData} />
      </div>
    </div>

  );
}
