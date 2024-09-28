import React, { useEffect, useState } from 'react';
import ProductCard from '../../component/admin/productCard'; // Import the product card component
import { useLocation, useNavigate } from 'react-router-dom';
import useUser from '../../zustand/useUser';

export default function ProductList() {
    const { AllListings } = useUser()
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    const [productList, setProductList] = useState(AllListings);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Handle Edit: Redirect to the edit route
    const handleEdit = (product) => {
        navigate(`/admin/editListing/${product._id}`, { state: product });
    };

    // Handle Delete: Remove product from the list
    const handleDelete = async (product) => {
        try {
            // Send DELETE request to backend
            const response = await fetch(`/api/listing/${product._id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Update the local state by filtering out the deleted product
                setProductList((prevList) => prevList.filter((p) => p._id !== product._id));
                setMessage('Product deleted successfully!');

                // Hide message after 3 seconds
                setTimeout(() => setMessage(''), 3000);
            } else {
                console.error('Error deleting product');
            }
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    return (
        <div className="relative">
            {/* Show success message if product is deleted */}
            {message && (
                <div className="absolute top-0 right-0 p-2 bg-green-500 text-white rounded-lg shadow-md">
                    {message}
                </div>
            )}

            {/* Responsive Grid */}
            <div className='flex flex-col pt-8  md:pt-20 items-center justify-center'>
                <div className='w-[90%] text-3xl font-bold  pl-10'>All Listings</div>
                <div className="grid w-full md:w-[90%] justify-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-10 pt-3">
                    {productList.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}
