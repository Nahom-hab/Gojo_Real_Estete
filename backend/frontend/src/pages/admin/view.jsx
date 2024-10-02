import React, { useEffect, useState } from 'react';
import { FaBath, FaBed, FaExclamationTriangle, FaHome, FaMapMarkerAlt, FaParking, FaPhone, FaSpinner, FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import useUser from '../../zustand/useUser';

export default function ViewAdminListing() {
    const { pathname } = useLocation();
    const { isEng, setAllListings } = useUser(); // Include isEng from state
    const location = useLocation();
    const result = location.state || {}; // Access state
    const [listing, setListing] = useState(result);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [owner, setOwner] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(`/api/user/${listing.userRef}`)
            if (res.ok) {
                const data = await res.json()
                console.log(data);
                setOwner(data.username)
            }
        }
        fetchUser()
    }, [])


    const handleActivate = async (type) => {

        setLoading(true); // Start loading
        try {
            const response = await fetch(`/api/admin/${type}/${listing._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });



            if (response.ok) {
                const data = await response.json();
                if (data) {
                    setListing(data.listing)
                }
                setLoading(false); // Stop loading

                const listingsResponse = await fetch('/api/listing');
                if (!listingsResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await listingsResponse.json();
                setAllListings(result);
                localStorage.setItem("listings", JSON.stringify(result));
            } else {
                throw new Error(`Failed to ${type} product with id: ${listing._id}. Status: ${response.status}`);
            }
        } catch (error) {
            console.error(`Failed to ${type} product with id: ${listing._id}`, error);
            setError(error.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };




    if (loading) {
        return (
            <p className="text-center  py-56  text-gray-600">
                <FaSpinner className="animate-spin text-6xl inline-block" />
                {isEng ? ' Lks,djlkjoading...' : ' እቅፍ እባኮትን...'}
            </p>
        );
    }

    if (error) {
        return (
            <p className="text-center text-3xl py-56 text-red-600">
                <FaExclamationTriangle className="inline-block text-5xl mr-2" />
                {isEng ? `Error: ${error}` : `ስህተት: ${error}`}
            </p>
        );
    }

    if (!listing) {
        return (
            <p className="text-center text-3xl py-56 text-gray-600">
                <FaExclamationTriangle className="inline-block text-5xl mr-2" />
                {isEng ? 'No listing found.' : 'የማዕከል አልተገኘም.'}
            </p>
        );
    }
    return (
        <div className=''>
            <div className="p-3 md:p-10 md:pt-20 items-center pt-8 md:flex">
                <div className="md:w-[50%]">
                    {listing.imageURLs.length === 1 && (
                        <img className='w-[600px] object-cover h-80 rounded-md' src={listing.imageURLs[0]} alt="" />
                    )}

                    {listing.imageURLs.length === 2 && (
                        <div className='flex md:flex-row flex-col gap-2'>
                            <img className='md:w-[50%] w-full object-cover md:h-96 h-52 rounded-md' src={listing.imageURLs[0]} alt="" />
                            <img className='md:w-[50%] w-full object-cover md:h-96 h-52 rounded-md' src={listing.imageURLs[1]} alt="" />
                        </div>
                    )}
                    {listing.imageURLs.length >= 3 && (
                        <div className='flex flex-col md:flex-row gap-1'>
                            <img className='md:w-[60%] w-full object-cover rounded-md h-[260px] md:h-[355px]' src={listing.imageURLs[0]} alt="" />
                            <div className='flex md:w-[40%]  md:flex-col gap-1'>
                                <img className='md:w-[100%] w-[50%] h-44 object-cover rounded-md' src={listing.imageURLs[1]} alt="" />
                                <img className='md:w-[100%] w-[50%] h-44 object-cover rounded-md' src={listing.imageURLs[2]} alt="" />
                            </div>
                        </div>
                    )}
                </div>
                <div className="md:p-6 md:w-[50%] pt-6">
                    <div className='flex justify-between'>
                        <p className="md:text-2xl text-xl font-bold mb-2">
                            <FaMapMarkerAlt className="text-green-600 inline-block mr-2" />
                            {listing.address}
                        </p>
                        <span
                            className={`px-4 py-1 text-center pt-2 text-lg rounded-full ${listing.activated ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
                                }`}
                        >
                            {listing.activated ? 'Active' : 'Inactive'}
                        </span>
                    </div>

                    <div className="md:text-2xl flex md:flex-row flex-col text-xl font-semibold ">
                        <div> {listing.name} -</div>
                        <span className='text-green-600'>
                            {listing.RentOrSell ? ` ETB ${listing.discountedPrice} ${listing.RentOrSell === 'rent' ? (isEng ? '/Month' : '/ወር') : ''}` : ''}
                        </span>
                    </div>

                    <div className="flex mb-6">
                        <div className={`text-xl py-1 rounded-full flex gap-2 items-center text-black`}>
                            <FaHome className='text-green-600 text-2xl' />
                            {listing.HomeType}
                        </div>
                    </div>
                    <p className="mb-4 font-bold text-black">
                        {isEng ? 'Description:' : 'መግለጫ:'} <span className="text-gray-600 font-normal">{listing.description}</span>
                    </p>
                    <div className="flex gap-4 mb-4">
                        <p className="text-lg">
                            <FaBed className="inline-block text-gray-600 mr-1" /> {listing.bedrooms} {isEng ? 'Bed' : 'ክፍል'}
                        </p>
                        <p className="text-lg">
                            <FaBath className="inline-block text-gray-600 mr-1" /> {listing.bathrooms} {isEng ? 'Bath' : 'የውሃ ክፍል'}
                        </p>
                        <p className="text-lg">
                            <FaParking className="inline-block text-gray-600 mr-1" /> {listing.parking} {isEng ? 'Parking' : 'መኪና መከለያ'}
                        </p>
                    </div>
                    <div className='flex  md:flex-row justify-between items-center md:items-center md:pr-10'>
                        <div className='flex '>
                            <div className='text-xl'>
                                {isEng ? 'Listing by' : 'የተመዘገበ በ'} <span className='font-bold'> {owner}</span>
                            </div>
                        </div>
                        <div className='flex bg-green-600 p-1 rounded-md text-white w-fit px-3 gap-2 mt-2 text-sm items-center'>
                            <FaPhone className='text-white text-xl' />
                            {listing.phoneNumber}
                        </div>
                    </div>
                    <div className='flex justify-start w-[80%]'>
                        <div className="mt-2 flex gap-10 justify-between">
                            {listing.activated ? (<button
                                onClick={() => handleActivate('deactivate')}
                                className="px-2 py-1 flex gap-1 items-center bg-red-500 text-white rounded-lg text-xl"
                            >
                                <FaToggleOff className="mr-1" />
                                Deactivate
                            </button>) : (<button
                                onClick={() => handleActivate('activate')}
                                className="px-2 py-1 flex gap-1 items-center bg-green-500 text-white rounded-lg text-2xl md:text-xl"
                            >
                                <FaToggleOn className="mr-1" />
                                Activate
                            </button>)}



                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}