import React, { useRef } from 'react';
import ScrollCard from './scrollCard';
import left from '../assets/images/left.png'
import right from '../assets/images/right.png'
import PLaceScrollCard from './PllceHolder';

const HorizontalScroller = ({ listings }) => {
    const scrollRef = useRef(null);

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

    return (
        <div className='flex  mt-4 justify-center'>
            <div className="relative overflow-hidden">
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 mr-6   h-10 w-10  top-1/2 transform -translate-y-1/2 z-10"
                >
                    <img src={left} alt="" />
                </button>
                <div
                    ref={scrollRef}
                    className="ml-4 mr-4 flex  overflow-x-scroll gap-5 scrollbar-hidden"
                >

                    {listings.length > 0 ? listings.map((result) => <ScrollCard key={result.id} result={result} />) : (
                        <div className='flex gap-5'>
                            <PLaceScrollCard />
                            <PLaceScrollCard />
                            <PLaceScrollCard />
                            <PLaceScrollCard />
                            <PLaceScrollCard />
                            <PLaceScrollCard />
                        </div>)}
                    {listings.length > 0 ? listings.map((result) => <ScrollCard key={result.id} result={result} />) : <PLaceScrollCard />}
                    <div className='flex  items-center'>
                        <div className=' w-[170px] text-center p-2 m-2 text-xl mr-12 rounded-xl border border-black hover:opacity-60 hover:cursor-pointer'>Show More</div>
                    </div>
                </div>
                <button
                    onClick={scrollRight}
                    className="absolute right-0 ml-6  h-10 w-10 top-1/2 transform  -translate-y-1/2 z-10"
                >
                    <img src={right} alt="" />
                </button>
            </div>
        </div>

    );
};

export default HorizontalScroller;
