import React, { useEffect, useState } from 'react'
import useUser from '../zustand/useUser'
import { useLocation } from 'react-router-dom'
import ScrollCard from '../component/scrollCard'

export default function ListingsOfRectngle() {
    const location = useLocation()
    const type = location.state || {}
    const { AllListings, setAllListings } = useUser()
    const [listing, setListing] = useState([])

    useEffect(() => {
        if (type === 'apartment') {
            const list = AllListings.filter((li) => li.HomeType === type)
            setListing(list)
        }
    }, [])

    return (
        <div className='flex bg-[#fafafa] dark:bg-gray-800 justify-center'>
            <div>
                <h1 className='md:text-3xl text-[17px] mt-10 mb-4 dark:text-white font-bold'>Listings of Addis Abeba {type} ({listing.length} Results)</h1>
                <div className='grid w-full lg:grid-cols-4 grid-cols-1 gap-4 md:grid-cols-3  mb-20  justify-center'>

                    {listing.map((list) => (
                        <ScrollCard key={list._id} similar={false} result={list} />

                    ))}
                </div>
            </div>

        </div>


    )
}
