import React, { useEffect, useState } from 'react';
import EditCard from '../../component/EditCard';
import { Link, useLocation } from 'react-router-dom';
import useUser from '../../zustand/useUser';

export default function MyListing() {
  const { pathname } = useLocation();
  const [showActive, setShowActive] = useState(false);
  const { user, AllListings } = useUser(); // Assume user has a userRef for listings
  const userRef = user?._id; // Replace with actual userRef

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Filter listings based on userRef and activated status
  const my_listings_uploaded = AllListings.filter((list) => list.userRef === userRef && list.activated);
  const my_listings_onReview = AllListings.filter((list) => list.userRef === userRef && !list.activated);

  // Conditional rendering based on the current view (uploaded vs on review)
  const currentListings = showActive ? my_listings_onReview : my_listings_uploaded;

  return (
    <div className='flex dark:bg-gray-800 justify-center pt-10 dark:border dark:border-x-0 dark:border-gray-600 pb-20'>
      <div className='w-full max-w-screen-xl px-4'>
        {/* Toggle Buttons */}
        <div className="flex mb-6 justify-center">
          <button
            onClick={() => setShowActive(false)}
            className={`px-6 py-2 rounded-l-lg ${!showActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'} transition-colors duration-300 focus:outline-none`}
          >
            Uploaded
          </button>
          <button
            onClick={() => setShowActive(true)}
            className={`px-6 py-2 rounded-r-lg ${showActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'} transition-colors duration-300 focus:outline-none`}
          >
            On Review
          </button>
        </div>

        {/* No Listings Found */}
        {currentListings.length === 0 ? (
          <div className="flex flex-col items-center md:mt-20 mt-36 mb-64 rounded-lg p-10 text-center shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              No Listings Found
            </h2>
            <p className="text-gray-600 mb-4">
              It seems you don't have any listings in this category. Why not create one?
            </p>
            <Link to="/sell" className="bg-green-500 text-white px-6 py-3 rounded-lg transition-colors duration-300 hover:bg-green-600">
              Create a Listing
            </Link>
            <p className="text-gray-500 text-sm mt-4">
              Need help? Check our <Link to="/faq" className="text-green-500 underline">FAQ</Link> or <Link to="/contactUs" className="text-green-500 underline">contact support</Link>.
            </p>
          </div>
        ) : (
          <div className='flex flex-col items-center'>
            <div className='md:text-3xl text-xl text-center text-green-600 font-bold mb-5'>
              These are your Listings
            </div>
            <div className='dark:text-gray-300 text-gray-500 text-sm mb-6 text-center'>
              You can <span className='font-semibold'>edit</span> and <span className='font-semibold'>delete</span> any of your listings.
            </div>

            {/* Listings Grid */}
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center'>
              {currentListings.map((result) => (
                <EditCard key={result._id} result={result} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
