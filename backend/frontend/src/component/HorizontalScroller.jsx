import React, { useRef, useState, useEffect } from 'react';
import ScrollCard from './scrollCard';
import left from '../assets/images/left.png';
import right from '../assets/images/right.png';
import PLaceScrollCard from './PllceHolder';
import useUser from '../zustand/useUser';

const HorizontalScroller = ({ listings }) => {
    const { AllListings } = useUser();
    const scrollRef = useRef(null);

    // State to trigger re-render
    const [reload, setReload] = useState(false);

    // Scroll functions
    const scrollLeft = () => {
        scrollRef.current.scrollBy({
            left: -scrollRef.current.offsetWidth / 4,
            behavior: 'smooth',
        });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({
            left: scrollRef.current.offsetWidth / 4,
            behavior: 'smooth',
        });
    };

    // useEffect to reload component after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setReload((prev) => !prev); // Toggle state to force re-render
        }, 3000);

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, []); // Only run once on initial render

    return (
        <div className='flex  mt-4 justify-center'>
            <div className="relative overflow-hidden">
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 mr-6 h-10 w-10 top-1/2 transform -translate-y-1/2 z-10"
                >
                    <img src={left} alt="" />
                </button>
                <div
                    ref={scrollRef}
                    className="ml-4 mr-4 flex overflow-x-scroll gap-5 scrollbar-hidden"
                >
                    {AllListings?.length > 0 ? AllListings.map((result) => (
                        <ScrollCard key={result._id} similar={false} result={result} />
                    )) : (
                        <div className='flex gap-5'>
                            <PLaceScrollCard key={1} />
                            <PLaceScrollCard key={2} />
                            <PLaceScrollCard key={3} />
                            <PLaceScrollCard key={4} />
                            <PLaceScrollCard key={5} />
                            <PLaceScrollCard key={6} />
                        </div>
                    )}
                    <div className='flex items-center'>
                        <div className='w-[170px] dark:text-white  text-center p-2 m-2 text-xl mr-12 rounded-xl border dark:border-gray-300 border-black hover:opacity-60 hover:cursor-pointer'>
                            Show More
                        </div>
                    </div>
                </div>
                <button
                    onClick={scrollRight}
                    className="absolute right-0 ml-6 h-10 w-10 top-1/2 transform -translate-y-1/2 z-10"
                >
                    <img src={right} alt="" />
                </button>
            </div>
        </div>
    );
};

export default HorizontalScroller;
