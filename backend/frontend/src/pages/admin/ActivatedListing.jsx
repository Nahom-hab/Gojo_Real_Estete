import React, { useState } from 'react';
import ProductCardActive from '../../component/admin/AciveCard';
import useUser from '../../zustand/useUser';

export default function ActiveListings() {
    const { AllListings } = useUser();
    const [productList, setProductList] = useState(AllListings.filter((li) => !li.activated));

    const handleDeactivate = (id) => {
        setProductList(prevList => prevList.filter((li) => li._id !== id));
    };


    return (
        <div className="relative">
            {/* Responsive Grid */}
            <div className='flex flex-col pt-8  md:pt-20 items-center justify-center'>
                <div className='w-[90%] text-3xl font-bold text-green-600 pl-10'>Active Listings</div>
                <div className="grid w-full md:w-[90%] justify-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-3 p-10">
                    {productList.length > 0 ? (
                        productList.map((product) => (
                            <ProductCardActive
                                key={product._id}
                                product={product}
                                onDeactivate={() => handleDeactivate(product._id)} // Pass product ID to the handler
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center">
                            <h2 className="text-xl font-semibold">No Active Listings</h2>
                            <p className="mt-2 text-gray-600">Currently, there are no active products available.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
