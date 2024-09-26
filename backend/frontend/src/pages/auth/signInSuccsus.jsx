import React from 'react';
import logo from '../../assets/images/logoo.png';
import { Link } from 'react-router-dom';
import useUser from '../../zustand/useUser';

export default function SignInSuccsus() {
    const { isEng } = useUser(); // Include isEng from state

    return (
        <div className='flex md:text-3xl text-2xl mt-20 flex-col items-center'>
            <span className='md:text-5xl text-4xl font-bold mb-2 text-green-600'>
                {isEng ? 'You have successfully' : 'በሚሳካ ሁኔታ ተመዝግቧል'}
            </span>
            <span>
                {isEng ? 'Signed up to' : 'ወደ'} <span className='font-serif text-blue-400'>Gojo RealEstate</span>
            </span>
            <img className='w-56 mt-6' src={logo} alt="Gojo RealEstate Logo" />
            <Link to={'/login'} className='bg-blue-400 px-4 rounded-xl hover:bg-blue-300 py-2 mt-10 text-white'>
                {isEng ? 'Login to continue' : 'ይቀጥሉ ለመግባት'}
            </Link>
        </div>
    );
}