import React from 'react'
import { useLocation } from 'react-router-dom'
import { listings } from '../assets/data/data';
import ScrollCard from '../component/scrollCard';

export default function ShowListing() {
  const location = useLocation()
  const { street, rentorsale } = location.state || {};
  console.log(street);
  console.log(rentorsale);

  const listingData = listings.filter((listing) => {
    return (
      (listing.address.includes(street)) && // Same home type
      listing.RentOrSell === rentorsale
    );
  });
  console.log(listingData);





  return (
    <div className='flex  justify-center mt-10'>
      <div className='flex flex-col items-start'>
        <div className='text-3xl text-green-600 mb-5'> Homes and locations in {street} for {rentorsale}</div>
        <div className='grid w-fit lg:grid-cols-4  sm:grid-cols-2 gap-4 md:grid-cols-3   justify-center'>
          {listingData.map((result) => <ScrollCard key={result.name} similar={false} result={result} />)}
        </div>
      </div>

    </div>

  )
}
