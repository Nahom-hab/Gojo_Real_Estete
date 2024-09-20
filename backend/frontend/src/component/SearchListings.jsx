import React, { useEffect, useState } from 'react';
import CardSearch from './searchCrd';
import { FaChevronDown } from 'react-icons/fa';
import SearchingPlaceCard from './SearchPlaceHolder';
import { filterListings } from '../Functions/filterLIsting';
import { listings } from '../assets/data/data';
import noresult from '../assets/images/noresult.png'
import adjust from '../assets/images/adjust.png'
import filesearch from '../assets/images/filesearch.png'
import scope from '../assets/images/scope.png'
import { sortListings } from '../Functions/sortListing';





export default function SearchListings({ SearchFields, setListingsForMap }) {
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
            const filteredListings = filterListings(listings, SearchFields);
            console.log('Filtered Listings:', filteredListings);
            const newFilterdData = sortListings(filteredListings, sort)
            setData(newFilterdData);
            setListingsForMap(newFilterdData)
        } catch (error) {
            console.error('Error filtering listings:', error);
        }
    }, [SearchFields, sort]);


    return (
        <div className=' gap-6 md:overflow-y-scroll md:h-[calc(100vh-145px)] pl-0  pt-2'>
            <div className='font-bold text-[20px] text-gray-600'>Real Estate & Homes For Sale</div>
            <div className='flex justify-between items-center '>
                <div className='font-bold text-lg text-gray-500'>{Data?.length} results</div>
                <div className="relative">
                    {/* Trigger button */}
                    <p
                        onClick={toggleDropdown}
                        className="text-purple-900 px-4 py-2 font-bold flex gap-2 items-center hover:underline"
                    >
                        Sort: Homes for you<FaChevronDown />
                    </p>

                    {/* Floating div */}
                    {isOpen && (
                        <div className="absolute top-12  right-0 w-48 bg-white border border-gray-300 shadow-lg rounded-md p-4 px-0 z-10">
                            <div
                                className={`text-slate-700 py-3 ${selected === 'HighToLow' ? 'bg-blue-200' : ''} px-4 hover:bg-slate-200`}
                                onClick={() => {
                                    setSort('PriceHighToLow')
                                    setSelected('HighToLow')
                                }}>
                                Price(High to low)
                            </div>
                            <div
                                className={`text-slate-700 py-3  ${selected === 'lowToHigh' ? 'bg-blue-200' : ''}  px-4 hover:bg-slate-200`}
                                onClick={() => {
                                    setSort('PriceLowToHigh')
                                    setSelected('lowToHigh')
                                }}>
                                Price(low to High)
                            </div>
                            <div
                                className={`text-slate-700 py-3  ${selected === 'Newest' ? 'bg-blue-200' : ''}  px-4 hover:bg-slate-200'`}
                                onClick={() => {
                                    setSort('Newest')
                                    setSelected('Newest')
                                }}>
                                Newest
                            </div>
                            <div
                                className={`text-slate-700 py-3  ${selected === 'BedRooms' ? 'bg-blue-200' : ''}  px-4 hover:bg-slate-200`}
                                onClick={() => {
                                    setSort('BedRooms')
                                    setSelected('BedRooms')
                                }}>
                                BedRooms
                            </div>
                            <div
                                className={`text-slate-700 py-3  ${selected === 'Bathrooms' ? 'bg-blue-200' : ''}  px-4 hover:bg-slate-200`}
                                onClick={() => {
                                    setSort('Bathrooms')
                                    setSelected('Bathrooms')
                                }}>
                                Bathrooms
                            </div>
                            <div
                                className={`text-slate-700 py-3  ${selected === 'SquareFeet' ? 'bg-blue-200' : ''}  px-4 hover:bg-slate-200`}
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
            <div className='h-[600px] '>
                {Data ? (Data.length > 0 ? (<div className='grid  md:grid-cols-2 items-center pr-5  justify-center  gap-2  pt-4'>{
                    Data.map((data) => (
                        <CardSearch key={data.id} result={data} />
                    ))
                }</div>) : (
                    <div className='w-full flex flex-col items-center justify-center '>
                        <img className='w-44 h-44' src={noresult} alt="" />
                        <div className='border w-full border-b-0 space-y-4 pt-5 border-x-0 border-t-gray-400'>
                            <div className='text-gray-700 text-[13px] font-bold'>SEARCH TIPS</div>
                            <div className='space-y-1'>
                                <div className='flex gap-2 items-center'>
                                    <img src={filesearch} className='w-6 h-6 font-bold' alt="" />
                                    Enter home features, a location, or a school name
                                </div>
                                <ul className='pl-10'>
                                    <div className='flex text-gray-600 text-sm items-center gap-1'> <div className='w-1 h-1 bg-gray-600 rounded-full'></div> <li>Eg: "Luxuary living, white House," </li></div>
                                    <div className='flex text-gray-600 text-sm items-center gap-1'> <div className='w-1 h-1 bg-gray-600 rounded-full'></div>  <li>"Addis Abeba, mexico"</li></div>
                                    <div className='flex text-gray-600 text-sm items-center gap-1'> <div className='w-1 h-1 bg-gray-600 rounded-full'></div>  <li>"Villa Adiss Abeba"</li></div>
                                </ul>
                            </div>
                            <div className='space-y-1'>
                                <div className='flex gap-2 items-center'>
                                    <img src={adjust} className='w-6 h-6 font-bold' alt="" />
                                    Decrease the number of filters
                                </div>

                                <div className='flex pl-10 text-gray-600 text-sm items-center gap-1 '>Adjust your criteria to be less restrictive, or remove very specific ones.</div>

                            </div>
                            <div className='space-y-1'>
                                <div className='flex gap-2 items-center'>
                                    <img src={scope} className='w-6 h-6' alt="" />
                                    Increase the scope of your search

                                </div>
                                <div className='flex pl-10 text-gray-600 text-sm items-center gap-1 '>Search in a wider area use wider scope
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
    );
}
