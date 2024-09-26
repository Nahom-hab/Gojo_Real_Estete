import React from 'react'
import logo from '../../assets/images/logoo.png'
import { Link } from 'react-router-dom'


export default function SignInSuccsus() {
    return (
        <div className='flex md:text-3xl text-2xl mt-20 flex-col items-center'>
            <span className=' md:text-5xl text-4xl  font-bold mb-2 text-green-600'>You have succsusfully</span>
            <span>Signed up to <span className='font-serif text-blue-400'>Gojo RealEstate</span></span>
            <img className='w-56 mt-6' src={logo} alt="" />
            <Link to={'/login'} className='bg-blue-400 px-4 rounded-xl hover:bg-blue-300 py-2 mt-10 text-white'>Login to continue</Link>
        </div>
    )
}
