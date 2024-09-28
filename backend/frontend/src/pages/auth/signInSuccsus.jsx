import React from 'react';
import logo from '../../assets/images/logoo.png';
import { Link } from 'react-router-dom';
import useUser from '../../zustand/useUser';

export default function SignInSuccsus() {
    const { isEng } = useUser(); // Include isEng from state

    return (
        <div className='flex flex-col items-center pt-44 pb-32 h-screen  dark:bg-gray-900'>
            <span className='text-3xl md:text-5xl font-bold mb-2 text-green-600 dark:text-green-400'>
                {isEng ? 'You have successfully' : 'በሚሳካ ሁኔታ ተመዝግቧል'}
            </span>
            <span className='text-gray-800 dark:text-gray-200 text-xl md:text-2xl'>
                {isEng ? 'Signed up to' : 'ወደ'} <span className='font-serif text-blue-400 dark:text-blue-300'>Gojo RealEstate</span>
            </span>
            <img className='w-56 dark:hidden mt-6' src={logo} alt="Gojo RealEstate Logo" />
            <Link to={'/login'} className='bg-blue-400 dark:bg-blue-500 px-4 rounded-xl hover:bg-blue-300 dark:hover:bg-blue-400 py-2 mt-10 text-white'>
                {isEng ? 'Login to continue' : 'ይቀጥሉ ለመግባት'}
            </Link>
        </div>
    );
}