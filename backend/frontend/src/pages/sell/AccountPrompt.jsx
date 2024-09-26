import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AccountPrompt() {
    const navigate = useNavigate();

    const handleCreateAccount = () => {
        navigate('/signup');  // Adjust the route based on your setup
    };

    const handleLogin = () => {
        navigate('/login');  // Adjust the route based on your setup
    };

    return (
        <div className='flex flex-col items-center justify-center mb-20 mt-20 bg-cover bg-center'
            style={{ backgroundImage: 'url(https://source.unsplash.com/random/1600x900?business)' }}>
            <div className='bg-white/80 backdrop-blur-md shadow-lg rounded-lg p-10 text-center max-w-md mx-auto'>
                <h1 className='text-4xl font-bold text-green-600 mb-6'>
                    Post and Sell Your Listing
                </h1>
                <p className='text-lg text-gray-600 mb-8'>
                    To post and sell your listings, you need to have an account. Create one or log in now to get started.
                </p>

                <div className='flex flex-col gap-4'>
                    <button
                        onClick={handleCreateAccount}
                        className='w-full bg-green-500 text-white text-xl font-semibold py-3 rounded-lg hover:bg-green-600 transition'>
                        Create Account
                    </button>
                    <button
                        onClick={handleLogin}
                        className='w-full bg-blue-500 text-white text-xl font-semibold py-3 rounded-lg hover:bg-blue-600 transition'>
                        Log In
                    </button>
                </div>
            </div>
        </div>
    );
}
