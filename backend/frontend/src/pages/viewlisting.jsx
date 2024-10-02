import React, { useEffect, useState } from 'react';
import { FaBath, FaBed, FaHome, FaMapMarkerAlt, FaParking, FaPhone } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import SimilarProducts from '../component/SimilarProducts';
import findSimilarListings from '../Functions/Similar';
import useUser from '../zustand/useUser';

export default function ViewListing() {
  const { pathname } = useLocation();
  const { isEng, AllListings } = useUser(); // Include isEng from state
  const [owner, setOwner] = useState('')
  const location = useLocation();
  const { result } = location.state || {}; // Access state
  const [listing, setListing] = useState(result);
  const [loading, setLoading] = useState(false);
  const [similarData, setSimilarData] = useState(findSimilarListings(listing, AllListings));
  const [error, setError] = useState(null);
  const [listingData, setLisingData] = useState(AllListings.filter((list) => list.userRef === listing.userRef))


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/${listing.userRef}`)
      if (res.ok) {
        const data = await res.json()
        console.log(data);
        setOwner(data.username)
      }
    }
    fetchUser()
  }, [])
  useEffect(() => {
    setListing(result)
    setSimilarData(findSimilarListings(result, AllListings))
    setLisingData(AllListings.filter((list) => list.userRef === result.userRef))
  }, [result])



  if (loading) {
    return <p className="text-center text-gray-600">{isEng ? 'Loading...' : 'እቅፍ እባኮትን...'}</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{isEng ? `Error: ${error}` : `ስህተት: ${error}`}</p>;
  }

  if (!listing) {
    return <p className="text-center text-gray-600">{isEng ? 'No listing found.' : 'የማዕከል አልተገኘም.'}</p>;
  }

  return (
    <div className='dark:bg-gray-800 dark:text-white pb-10'>
      <div className="p-3 md:p-10 pr-2 md:pt-20  pl-2 items-center  pt-8 md:flex">
        <div className="md:w-[50%]">
          {listing.imageURLs.length === 1 && (
            <img className='w-[600px] object-cover h-80 rounded-md' src={listing.imageURLs[0]} alt="" />
          )}

          {listing.imageURLs.length === 2 && (
            <div className='flex md:flex-row flex-col gap-2'>
              <img className='md:w-[50%] w-full object-cover md:h-96 h-52 rounded-md' src={listing.imageURLs[0]} alt="" />
              <img className='md:w-[50%] w-full object-cover md:h-96 h-52 rounded-md' src={listing.imageURLs[1]} alt="" />
            </div>
          )}
          {listing.imageURLs.length >= 3 && (
            <div className='flex flex-col md:flex-row gap-1'>
              <img className='md:w-[60%] w-full object-cover rounded-md h-[260px] md:h-[355px]' src={listing.imageURLs[0]} alt="" />
              <div className='flex md:w-[40%] md:flex-col gap-1'>
                <img className='md:w-[100%] w-[50%] h-44 object-cover rounded-md' src={listing.imageURLs[1]} alt="" />
                <img className='md:w-[100%] w-[50%] h-44 object-cover rounded-md' src={listing.imageURLs[2]} alt="" />
              </div>
            </div>
          )}
        </div>
        <div className="md:p-6 pl-0 md:w-[50%] pt-6">
          <div className='flex justify-between'>
            <p className="md:text-2xl text-xl font-bold mb-2">
              <FaMapMarkerAlt className="text-green-600 inline-block mr-2" />
              {listing.address}
            </p>
            <div className=' px-3 py-1  rounded-lg md:mr-10 flex justify-center items-center text-[25px] bg-gray-700  text-white '>
              {listing.RentOrSell}
            </div>
          </div>

          <div className="md:text-2xl text-xl font-semibold ">
            {listing.name}
            <span className='text-green-600'>
              {listing.RentOrSell ? ` - ETB ${listing.discountedPrice} ${listing.RentOrSell === 'rent' ? (isEng ? '/Month' : '/ወር') : ''}` : ''}
            </span>
          </div>

          <div className="flex mb-6">
            <div className={`text-xl py-1 rounded-full flex gap-2 items-center `}>
              <FaHome className='text-green-600 text-2xl' />
              {listing.HomeType}
            </div>
          </div>
          <p className="mb-4 font-bold ">
            {isEng ? 'Description:' : 'መግለጫ:'} <span className="dark:text-gray-300 text-gray-600 font-normal">{listing.description}</span>
          </p>
          <div className="flex gap-5 mb-4">
            <p className="text-lg">
              <FaBed className="inline-block dark:text-white text-gray-600 mr-1" /> {listing.bedrooms} {isEng ? 'Bed' : 'ክፍል'}
            </p>
            <p className="text-lg">
              <FaBath className="inline-block dark:text-white text-gray-600 mr-1" /> {listing.bathrooms} {isEng ? 'Bath' : 'የውሃ ክፍል'}
            </p>
            <p className="text-lg">
              <FaParking className="inline-block dark:text-white text-gray-600 mr-1" /> {listing.parking} {isEng ? 'Parking' : 'መኪና መከለያ'}
            </p>
          </div>
          <div className='flex flex-col md:flex-row md:justify-between md:items-center md:pr-10'>
            <div className='flex gap-4'>
              <div className='text-xl'>
                {isEng ? 'Listing by' : 'የተመዘገበ በ'} <span className='font-bold'> {owner}</span>
              </div>
            </div>
            <div className='flex bg-green-600 p-2 rounded-md text-white w-fit px-5 gap-2 mt-5 text-xl items-center'>
              <FaPhone className='text-white text-xl' />
              {listing.phoneNumber}
            </div>
          </div>
        </div>
      </div>
      <div className='md:mt-16 mt-5 w-full'>
        {similarData.length > 0 ?
          <SimilarProducts text={isEng ? 'Similar listings' : 'ተመሳሳይ ዝርዝሮች'} data={similarData} />
          : ''}

        {listingData.length > 0 ?
          <SimilarProducts text={isEng ? `Listings By ${listing.userRef}` : `የ${listing.userRef} ዝርዝሮች`} data={listingData} /> : ''}

      </div>
    </div>
  );
}