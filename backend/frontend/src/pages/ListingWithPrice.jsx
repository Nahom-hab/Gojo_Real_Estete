import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { listings } from '../assets/data/data';
import ScrollCard from '../component/scrollCard';

export default function ListingWithPrice() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const location = useLocation()
  const price = location.state || {};


  const listingData = listings.filter((listing) => {
    return (
      (parseInt(listing.regularPrice) <= parseInt(price))
    );
  });





  return (
    <div className='flex justify-center mt-10'>
      <div className='flex flex-col items-start'>
        <div className='md:text-3xl text-xl  text-center text-green-600 mb-5'> Listings Under {price}Birr For you </div>
        <div className='grid w-fit lg:grid-cols-4  sm:grid-cols-2 gap-4 md:grid-cols-3   justify-center'>
          {listingData.map((result) => <ScrollCard key={result.name} similar={false} result={result} />)}
        </div>
      </div>

    </div>

  )
}
