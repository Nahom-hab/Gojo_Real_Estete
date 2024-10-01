import React, { useEffect, useState } from 'react';
import CardSearch from './searchCrd';
import { FaChevronDown } from 'react-icons/fa';
import SearchingPlaceCard from './SearchPlaceHolder';
import { filterListings } from '../Functions/filterLIsting';
import noresult from '../assets/images/noresult.png'
import adjust from '../assets/images/adjust.png'
import filesearch from '../assets/images/filesearch.png'
import scope from '../assets/images/scope.png'
import { sortListings } from '../Functions/sortListing';
import useUser from '../zustand/useUser';





export default function SearchListings({ SearchFields, setListingsForMap }) {
    const { AllListings } = useUser()

    const [Data, setData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [sort, setSort] = useState('Newest')
    const [selected, setSelected] = useState('Newest')

    // Toggle the floating div's visibility
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        try {
            const filteredListings = filterListings(AllListings, SearchFields);
            const newFilterdData = sortListings(filteredListings, sort)
            setData(newFilterdData);
            setListingsForMap(newFilterdData)
        } catch (error) {
            console.error('Error filtering listings:', error);
        }
    }, [SearchFields, sort]);


    return (
        <div className='flex w-full justify-center'>
            <div className=' gap-6 md:overflow-y-scroll  pl-2  w-full md:h-[calc(100vh-145px)]  pt-2'>
                <div className='font-bold text-[20px] dark:text-white text-gray-600'>Real Estate & Homes For Sale</div>
                <div className='flex justify-between dark:text-white items-center '>
                    <div className='font-bold text-lg dark:text-gray-300 text-gray-500'>{Data?.length} results</div>
                    <div className="relative">
                        {/* Trigger button */}
                        <p
                            onClick={toggleDropdown}
                            className="dark:text-gray-400 text-purple-900 px-4 py-2 font-bold flex gap-2 items-center hover:underline"
                        >
                            Sort: Homes for you<FaChevronDown />
                        </p>

                        {/* Floating div */}
                        {isOpen && (
                            <div className="absolute top-12  right-0 w-48 dark:bg-gray-900 bg-white border dark:border-gray-600 border-gray-300 shadow-lg rounded-md p-4 px-0 z-10">
                                <div
                                    className={`dark:text-white text-slate-700 py-3 ${selected === 'HighToLow' ? 'dark:bg-gray-700 bg-blue-200' : ''} px-4 dark:hover:bg-gray-500 hover:bg-slate-200`}
                                    onClick={() => {
                                        setSort('PriceHighToLow')
                                        setSelected('HighToLow')
                                    }}>
                                    Price(High to low)
                                </div>
                                <div
                                    className={`dark:text-white text-slate-700 py-3  ${selected === 'lowToHigh' ? 'dark:bg-gray-700 bg-blue-200' : ''}  px-4 dark:hover:bg-gray-500 hover:bg-slate-200`}
                                    onClick={() => {
                                        setSort('PriceLowToHigh')
                                        setSelected('lowToHigh')
                                    }}>
                                    Price(low to High)
                                </div>
                                <div
                                    className={`dark:text-white text-slate-700 py-3  ${selected === 'Newest' ? 'dark:bg-gray-700 bg-blue-200' : ''}  px-4 dark:hover:bg-gray-500 hover:bg-slate-200'`}
                                    onClick={() => {
                                        setSort('Newest')
                                        setSelected('Newest')
                                    }}>
                                    Newest
                                </div>
                                <div
                                    className={`dark:text-white text-slate-700 py-3  ${selected === 'BedRooms' ? 'dark:bg-gray-700 bg-blue-200' : ''}  px-4 dark:hover:bg-gray-500 hover:bg-slate-200`}
                                    onClick={() => {
                                        setSort('BedRooms')
                                        setSelected('BedRooms')
                                    }}>
                                    BedRooms
                                </div>
                                <div
                                    className={`dark:text-white text-slate-700 py-3  ${selected === 'Bathrooms' ? 'dark:bg-gray-700 bg-blue-200' : ''}  px-4 dark:hover:bg-gray-500 hover:bg-slate-200`}
                                    onClick={() => {
                                        setSort('Bathrooms')
                                        setSelected('Bathrooms')
                                    }}>
                                    Bathrooms
                                </div>
                                <div
                                    className={`dark:text-white text-slate-700 py-3  ${selected === 'SquareFeet' ? 'dark:bg-gray-700 bg-blue-200' : ''}  px-4 dark:hover:bg-gray-500 hover:bg-slate-200`}
                                    onClick={() => {
                                        setSort('SquareFeet')
                                        setSelected('SquareFeet')
                                    }}>
                                    Square Feet
                                </div>

                            </div>
                        )}
                    </div>

                </div>
                <div className='md:h-[600px] w-full '>
                    {Data ? (Data.length > 0 ? (
                        <div className='grid  md:grid-cols-2  items-center px-2  justify-center  gap-1  pt-4'>{
                            Data.map((data) => (
                                <CardSearch key={data._id} similar={Data} result={data} />
                            ))
                        }</div>) : (
                        <div className='w-full flex flex-col items-center justify-center '>
                            <img className='w-44 h-44' src={noresult} alt="" />
                            <div className='border w-full border-b-0 space-y-4 pt-5 border-x-0 border-t-gray-400'>
                                <div className='dark:text-white text-gray-700 text-[13px] font-bold'>SEARCH TIPS</div>
                                <div className='space-y-1'>
                                    <div className='flex gap-2 items-center'>
                                        <img src={filesearch} className='w-6 h-6 font-bold' alt="" />
                                        Enter home features, a location, or a school name
                                    </div>
                                    <ul className='dark:text-gray-300 text-gray-600 pl-10'>
                                        <div className='flex  text-sm items-center gap-1'> <div className='w-1 h-1 dark:bg-white bg-gray-600 rounded-full'></div> <li>Eg: "Luxuary living, white House," </li></div>
                                        <div className='flex text-sm items-center gap-1'> <div className='w-1 h-1 dark:bg-white bg-gray-600 rounded-full'></div> <li>"Addis Abeba, mexico"</li></div>
                                        <div className='flex text-sm items-center gap-1'> <div className='w-1 h-1 dark:bg-white bg-gray-600 rounded-full'></div> <li>"Villa Adiss Abeba"</li></div>
                                    </ul>
                                </div>
                                <div className='space-y-1'>
                                    <div className='flex gap-2 items-center'>
                                        <img src={adjust} className='w-6 h-6 font-bold' alt="" />
                                        Decrease the number of filters
                                    </div>

                                    <div className='flex pl-10 dark:text-gray-300 text-gray-600 text-sm items-center gap-1 '>Adjust your criteria to be less restrictive, or remove very specific ones.</div>

                                </div>
                                <div className='space-y-1'>
                                    <div className='flex gap-2 items-center'>
                                        <img src={scope} className='w-6 h-6' alt="" />
                                        Increase the scope of your search

                                    </div>
                                    <div className='flex pl-10 dark:text-gray-300 text-gray-600 text-sm items-center gap-1 '>Search in a wider area use wider scope
                                    </div>


                                </div>


                            </div>
                        </div>
                    )) : (
                        <div className='grid grid-cols-2  gap-4 p-10 pl-4 pt-4'>
                            <SearchingPlaceCard key={1} />
                            <SearchingPlaceCard key={2} />
                            <SearchingPlaceCard key={3} />
                            <SearchingPlaceCard key={4} />
                            <SearchingPlaceCard key={5} />
                            <SearchingPlaceCard key={6} />

                        </div>
                    )}
                </div>



            </div>
        </div>
    );
}
