import React from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

export default function ListingCard({ listing }) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/viewListing/${result._id}`, { state: { result, listing } });

    };
    return (
        <div onClick={handleClick} className="flex flex-col bg-gray-200 rounded-lg w-7/10 h-[86svh] overflow-y-auto p-6 shadow-lg">

            <div className="flex flex-wrap justify-between">
                {listing.length > 0 ? (
                    listing.map((result) => (
                        <Card key={result._id} similar={listing} result={result} />
                    ))
                ) : (
                    <div className="text-gray-600 text-xl text-center mt-10">No results found</div>
                )}
            </div>
        </div>
    );
}