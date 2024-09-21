import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/images/logoo.png';

export default function Footer() {
    const { currentUser } = useSelector(state => state.user);
    const location = useLocation();
    const [one, setOne] = useState(false)
    const [two, setTwo] = useState(false)
    const [three, setThree] = useState(false)
    const [four, setFour] = useState(false)
    const [five, setFive] = useState(false)


    return (
        <footer className="bg-white text-black py-10 flex flex-col items-center">
            <div className="flex flex-wrap max-w-screen-xl pt-10 px-5 w-full mx-auto justify-between pb-10 border-b-2">
                <div className=''>

                    <div className="flex-1 min-w-[200px] m-2">
                        <Link to="/" className="flex items-center text-[34px] font-bold">
                            <img className="w-52 h-36 mr-16" src={logo} alt="Gojo Logo" />
                        </Link>

                    </div>
                    <div className='font-bold pl-5 text-2xl'>Gojo RealEstate</div>
                </div>

                <div className="flex-1 min-w-[200px] m-2">
                    <h3 className="text-lg mb-3 font-semibold">Company</h3>
                    <ul className="list-none space=y-3 p-0">
                        <div onMouseOver={() => setOne(true)} onMouseLeave={() => setOne(false)} className='flex gap-1 items-center'>
                            {one ? <div className='w-3 h-1 bg-blue-950  rounded-full'></div> : ''}
                            <li><Link to="/about" className={`text-black hover:underline ${location.pathname === '/about' ? 'text-red-500' : ''}`}>About Us</Link></li>

                        </div>
                        <div onMouseOver={() => setTwo(true)} onMouseLeave={() => setTwo(false)} className='flex gap-1 items-center'>
                            {two ? <div className='w-3 h-1 bg-blue-950  rounded-full'></div> : ''}
                            <li><Link to="/buy" className={`text-black  ${location.pathname === '/buy' ? 'text-red-500' : ''}`}>Buy</Link></li>


                        </div> <div onMouseOver={() => setThree(true)} onMouseLeave={() => setThree(false)} className='flex gap-1 items-center'>
                            {three ? <div className='w-3 h-1 bg-blue-950  rounded-full'></div> : ''}
                            <li><Link to="/rent" className={`text-black  ${location.pathname === '/rent' ? 'text-red-500' : ''}`}>Rent</Link></li>

                        </div> <div onMouseOver={() => setFour(true)} onMouseLeave={() => setFour(false)} className='flex gap-1 items-center'>
                            {four ? <div className='w-3 h-1 bg-blue-950  rounded-full'></div> : ''}
                            <li><Link to="/sell" className={`text-black ${location.pathname === '/sell' ? 'text-red-500' : ''}`}>Sell</Link></li>

                        </div> <div onMouseOver={() => setFive(true)} onMouseLeave={() => setFive(false)} className='flex gap-1 items-center'>
                            {five ? <div className='w-3 h-1 bg-blue-950  rounded-full'></div> : ''}
                            <li><Link to="/afordablityCalculator" className={`text-black hover:underline ${location.pathname === '/afordablityCalculator' ? 'text-red-500' : ''}`}>Affordability Calculator</Link></li>

                        </div>
                    </ul>
                </div>
                <div className="flex-1 min-w-[200px] m-2">
                    <h3 className="text-lg mb-3 font-semibold">Support</h3>
                    <ul className="list-none space-y-3 p-0">
                        <li><a href="#" className="text-black hover:underline">Help Center</a></li>
                        <li><a href="#" className="text-black hover:underline">FAQ</a></li>
                        <li><a href="#" className="text-black hover:underline">Privacy Policy</a></li>
                        <li><a href="#" className="text-black hover:underline">Terms of Service</a></li>
                    </ul>
                </div>
                <div className='flex flex-col justify-center items-center '>

                    <div className="flex-1 min-w-[200px] m-2">
                        <h3 className="text-lg font-semibold">Follow Us</h3>
                        <ul className="flex gap-2 p-0">
                            <li><a href="#" aria-label="Facebook" className="text-black text-xl hover:text-blue-400"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                            <li><a href="#" aria-label="Twitter" className="text-black text-xl hover:text-blue-400"><FontAwesomeIcon icon={faTwitter} /></a></li>
                            <li><a href="#" aria-label="Instagram" className="text-black text-xl hover:text-blue-400"><FontAwesomeIcon icon={faInstagram} /></a></li>
                            <li><a href="#" aria-label="LinkedIn" className="text-black text-xl hover:text-blue-400"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                            <li><a href="#" aria-label="Github" className="text-black text-xl hover:text-blue-400"><FontAwesomeIcon icon={faGithub} /></a></li>
                        </ul>
                    </div>

                </div>


            </div>
            <div className="mt-4 text-sm text-gray-500">&copy; 2024 Gojo. All rights reserved.</div>
        </footer>
    );
}
