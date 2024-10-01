import React, { useState } from 'react';
import ProductCardInactive from '../../component/admin/InactiveCard';
import useUser from '../../zustand/useUser';

export default function InactiveListings() {

    const { AllListings, setAllListings } = useUser();
    const [productList, setProductList] = useState(AllListings.filter((li) => !li.activated));

    const activationFinished = (id) => {
        setProductList(prevList => prevList.filter((li) => li._id !== id));
    };

    return (
        <div className="relative">
            {/* Responsive Grid */}
            <div className='flex flex-col pt-8 md:pt-20 items-center justify-center'>
                <div className='w-[90%] text-3xl font-bold text-red-600 pl-10'>Inactive Listings</div>
                <div className="grid w-full md:w-[90%] justify-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-10 pt-3">
                    {productList.length > 0 ? (
                        productList.map((product) => (
                            <ProductCardInactive
                                key={product._id}
                                product={product}
                                activationFinished={() => activationFinished(product._id)} // Pass product ID
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center">
                            <h2 className="text-xl font-semibold">No Inactive Listings</h2>
                            <p className="mt-2 text-gray-600">All your products are currently active.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}