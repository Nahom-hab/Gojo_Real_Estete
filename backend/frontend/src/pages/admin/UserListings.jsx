import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useUser from '../../zustand/useUser';
import ListCard from '../../component/admin/List';

export default function UserListings() {

    const { AllListings } = useUser()
    const location = useLocation()
    const name = location.state || 'name'
    const { id } = useParams(); // Get the user ID from the URL
    const Listing = AllListings.filter((li) => li.userRef === id)
    return (

        <div className='flex flex-col pt-8  md:pt-20 items-center justify-center'>
            <div className='md:w-[90%] w-full text-lg md:text-3xl font-bold  pl-10'>User Listings for User: {name}</div>
            <div className="grid w-full md:w-[90%] justify-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-10 pt-3">
                {Listing.map((list) => (<ListCard product={list} />))}
            </div>
        </div>

    );
}
