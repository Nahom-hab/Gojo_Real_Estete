import { listings } from '../../assets/data/data';
import React, { useEffect, useState } from 'react';
import EditCard from '../../component/EditCard';
import { Link, useLocation } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

export default function MyListing() {
  const { pathname } = useLocation();
  const [showActive, setShowActive] = useState(false); // true for 'On Review', false for 'Uploaded'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const userRef = 'user_jo';

  // Filter listings
  const my_listings_uploaded = listings.filter((list) => list.userRef === userRef && list.activated);
  const my_listings_onReview = listings.filter((list) => list.userRef === userRef && !list.activated);

  // Conditional rendering based on the current view
  const currentListings = showActive ? my_listings_onReview : my_listings_uploaded;

  return (
    <div className='flex justify-center mt-10'>
      <div className='w-full'>
        {currentListings.length === 0 ? (
          <div className="flex flex-col items-center md:mt-20 mt-36 mb-64 rounded-lg p-20 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No Listings Found
            </h2>
            <p className="text-gray-600 mb-4">
              You don't have any listings in this category.
            </p>
            <Link to="/sell" className="bg-green-500 text-white px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-green-600">
              Create a Listing
            </Link>
          </div>
        ) : (
          <div className='flex flex-col items-center'>
            <div className='md:text-4xl text-xl text-center text-green-600 font-bold mb-5'>These are your Listings {userRef}</div>
            <div className='text-gray-500 text-sm mb-4'>
              You can <span className='font-semibold'>edit</span> and <span className='font-semibold'>delete</span> any of your listings.
            </div>
            {/* Toggle Button */}
            {my_listings_uploaded.length > 0 && my_listings_onReview.length > 0 && (
              <div className="flex mb-4">
                <button
                  onClick={() => setShowActive(false)}
                  className={`px-4 py-2 rounded-l-lg ${!showActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'} transition-colors duration-300`}
                >
                  Uploaded
                </button>
                <button
                  onClick={() => setShowActive(true)}
                  className={`px-4 py-2 rounded-r-lg ${showActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'} transition-colors duration-300`}
                >
                  On Review
                </button>

              </div>
            )}
            <div className='grid md:w-fit px-8 md:px-0 grid-cols-1 w-full lg:grid-cols-4 sm:grid-cols-2 gap-6 md:grid-cols-3 justify-center'>
              {currentListings.map((result) => (
                <EditCard key={`${result}`} similar={false} result={result} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}