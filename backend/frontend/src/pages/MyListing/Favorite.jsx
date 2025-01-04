import React, { useEffect, useState } from 'react';
import FavoriteCard from '../../component/FavoriteCard';
import { Link, useLocation } from 'react-router-dom';
import useUser from '../../zustand/useUser';
import { FaHeart, FaUserAlt, FaSignInAlt, FaSpinner } from 'react-icons/fa'; // Add loading spinner icon
import FetchListingHook from '../../Functions/FetchListingHook';

export default function Favorite() {
    FetchListingHook()
    const [FavoritedListing, setFavoritedListing] = useState(null);
    const { user, AllListings, Favorite, setFavorite } = useUser();
    const [loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        const fetchFav = async () => {
            try {
                const response = await fetch(`/api/saved/${user._id}`);
                if (response.ok) {
                    const data = await response.json();
                    const { FavoritedId } = data;
                    const list = AllListings.filter((li) => FavoritedId.includes(li._id));
                    setFavoritedListing(list);
                    setFavorite(Favorite);
                } else {
                    console.log('error fetching favorites');
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        fetchFav();

    }, []);

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='flex dark:bg-slate-800 justify-center p-2 pb-60 pt-10 border border-x-0 border-t-gray-500'>
            {user ? (
                loading ? ( // Show spinner while loading
                    <div className="flex items-center justify-center mt-20 w-full h-full">
                        <FaSpinner className="animate-spin w-24 h-24 text-4xl text-green-600" />
                    </div>
                ) : (
                    FavoritedListing?.length > 0 ? (
                        <div className='flex flex-col items-start'>
                            <div className='text-3xl text-green-600 mb-5'>Your Favorite Listings</div>
                            <div className='grid w-fit lg:grid-cols-4 grid-cols-2 gap-4 md:grid-cols-3 justify-center'>
                                {FavoritedListing.map((result) => <FavoriteCard key={result._id} similar={false} result={result} />)}
                            </div>
                        </div>
                    ) : (
                        <div className='mt-20 flex flex-col items-center mb-96 gap-3'>
                            <div className='md:text-4xl dark:text-slate-50 text-center text-2xl font-bold'>You Currently Have no listing Saved</div>
                            <div className='flex dark:text-slate-300 gap-3'>Tap on
                                <FaHeart className="text-red-600 animate-bounce text-2xl mb-4" />
                                icon to save any listing
                            </div>
                        </div>
                    )
                )
            ) : (
                <div className="flex flex-col items-center justify-center md:dark:bg-gray-900 md:bg-white p-10 rounded-xl shadow-lg w-full max-w-lg text-center">
                    <FaHeart className="text-red-500 animate-spin text-6xl mb-4" />
                    <h2 className="text-3xl font-bold dark:text-gray-300 text-gray-800 mb-4">Save Your Favorite Listings</h2>
                    <p className="dark:text-gray-400 text-gray-600 mb-6 leading-relaxed">
                        Sign in or create an account to save the listings you love! This lets you easily revisit and manage your favorite homes on any device.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
                        <Link to="/signup">
                            <button className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all ease-in-out duration-200">
                                <FaUserAlt className="mr-2" /> Sign Up
                            </button>
                        </Link>
                        <Link to="/login">
                            <button className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all ease-in-out duration-200">
                                <FaSignInAlt className="mr-2" /> Log In
                            </button>
                        </Link>
                    </div>
                    <div className="dark:text-gray-300 text-gray-500 text-sm mt-6">
                        By signing in, you can access your saved listings anywhere and manage them with ease.
                    </div>
                    <div className="mt-4 dark:text-gray-300 text-gray-500">
                        Already have an account? <Link to="/login" className="text-green-600 font-medium hover:underline">Log in here</Link>.
                    </div>
                </div>
            )}
        </div>
    );
}
