import React, { useRef, useState, useEffect } from 'react';
import ScrollCard from './scrollCard';
import left from '../assets/images/left.png';
import right from '../assets/images/right.png';
import useUser from '../zustand/useUser';
import PLaceScrollCard from './PllceHolder';
import { Link } from 'react-router-dom';

const HorizontalScroller = ({ listings }) => {
    const { AllListings, setAllListings } = useUser();
    const scrollRef = useRef(null);
    const [loading, setLoading] = useState(true); // Start as loading
    const [listing, setListing] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/listing'); // Replace with your API endpoint
                if (!response.ok) throw new Error('Network response was not ok');

                const result = await response.json();
                setListing(result);
                setAllListings(result); // Set listings in state
                localStorage.setItem("listings", JSON.stringify(result)); // Save to localStorage
            } catch (error) {
                console.error('Fetching listings failed:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!AllListings || AllListings.length === 0) {
            fetchData();
        } else {
            setListing(AllListings); // If listings are already available
            setLoading(false); // No loading if data exists
        }
    }, [AllListings, setAllListings]);

    // Scroll functions
    const scrollLeft = () => {
        const scrollAmount = window.innerWidth < 768 // Example breakpoint for mobile
            ? scrollRef.current.offsetWidth // 100% of the container on mobile
            : scrollRef.current.offsetWidth / 4; // 25% of the container on larger screens

        scrollRef.current.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth',
        });
    };

    const scrollRight = () => {
        const scrollAmount = window.innerWidth < 768 // Example breakpoint for mobile
            ? scrollRef.current.offsetWidth // 100% of the container on mobile
            : scrollRef.current.offsetWidth / 4; // 25% of the container on larger screens

        scrollRef.current.scrollBy({
            left: scrollAmount,
            behavior: 'smooth',
        });
    };

    return (
        <div className='flex mt-4 justify-center'>
            <div className="relative overflow-hidden">
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 mr-6 h-10 w-10 top-1/2 transform -translate-y-1/2 z-10"
                >
                    <img src={left} alt="Scroll Left" />
                </button>
                <div
                    ref={scrollRef}
                    className="ml-4 mr-4 flex overflow-x-scroll gap-2 scrollbar-hidden"
                >
                    {loading ? (
                        <div className='flex gap-5'>
                            {/* Placeholder loading cards */}
                            {Array.from({ length: 6 }).map((_, index) => (
                                <PLaceScrollCard key={index} />
                            ))}
                        </div>
                    ) : listing.length > 0 ? (
                        listing.filter((li) => li.activated).slice(0, 8).map((result) => (
                            <ScrollCard key={result._id} similar={false} result={result} />
                        ))
                    ) : (
                        <div className='flex items-center justify-center w-full'>
                            <div className='text-center text-gray-500'>
                                No listings available.
                            </div>
                        </div>
                    )}

                    <div className='flex items-center'>
                        <Link to={'/search'} className='w-[170px] dark:text-white text-center p-2 m-2 text-xl mr-12 rounded-xl border dark:border-gray-300 border-black hover:opacity-60 hover:cursor-pointer'>
                            Show More
                        </Link>
                    </div>
                </div>
                <button
                    onClick={scrollRight}
                    className="absolute right-0 ml-6 h-10 w-10 top-1/2 transform -translate-y-1/2 z-10"
                >
                    <img src={right} alt="Scroll Right" />
                </button>
            </div>
        </div>
    );
};

export default HorizontalScroller;
