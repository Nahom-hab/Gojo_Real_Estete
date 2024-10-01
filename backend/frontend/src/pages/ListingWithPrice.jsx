import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ScrollCard from '../component/scrollCard';
import useUser from '../zustand/useUser';
import FetchListingHook from '../Functions/FetchListingHook';

export default function ListingWithPrice() {
  FetchListingHook()
  const { pathname } = useLocation();
  const { AllListings } = useUser()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const location = useLocation()
  const price = location.state || {};


  const listingData = AllListings.filter((listing) => {
    return (
      (parseInt(listing.regularPrice) <= parseInt(price))
    );
  });





  return (
    <div className='flex dark:bg-gray-800 justify-center pt-10 pb-32'>
      <div className='flex flex-col items-start'>
        <div className='md:text-3xl text-xl  text-center text-green-600 mb-5'> Listings Under {price.toLocaleString()} Birr For you </div>
        <div className='grid w-fit lg:grid-cols-4  sm:grid-cols-2 gap-4 md:grid-cols-3   justify-center'>
          {listingData.map((result) => <ScrollCard key={result._id} similar={false} result={result} />)}
        </div>
      </div>

    </div>

  )
}
