import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/images/logoo.png';
import useUser from '../zustand/useUser';
import gojo from '../assets/images/gojoDark.png';


export default function Footer() {
    const location = useLocation();
    const { isEng } = useUser();
    const [hoverIndex, setHoverIndex] = useState(null);

    const links = [
        { nameEng: 'About Us', nameAm: 'የእኛ ስለ', path: '/about' },
        { nameEng: 'Buy', nameAm: 'ግዢ', path: '/buy' },
        { nameEng: 'Rent', nameAm: 'ኪራይ', path: '/rent' },
        { nameEng: 'Sell', nameAm: 'ሽያጭ', path: '/sell' },
        { nameEng: 'Affordability Calculator', nameAm: 'የማቀነባበል ካልከር', path: '/affordabilityCalculator' },
    ];

    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white py-10">
            <div className="container mx-auto max-w-screen-xl px-5">
                {/* Responsive Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-between py-10 border-b-2 border-gray-300 dark:border-gray-600">

                    {/* Logo and Contact Info */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <img src={logo} alt="Company Logo" className="mb-5 dark:hidden w-32" />
                        <img src={gojo} alt="Company Logo" className="mb-5 hidden dark:block w-32" />

                        <p className="text-sm">
                            {isEng ? 'Providing excellent real estate services in Addis Ababa.' : 'እኛ ለአዲስ አበባ ምርጥ የቤት አገልግሎቶችን እንሰጣለን።'}
                        </p>
                        <div className="mt-4 text-sm">
                            <p>{isEng ? 'Phone: +251 911 123 456' : 'ስልክ፡ +251 911 123 456'}</p>
                            <p>{isEng ? 'Email: info@gojo.com' : 'ኢሜል፡ info@gojo.com'}</p>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <div className='flex gap-20'>
                            {/* Company Links */}
                            <div className="flex flex-col items-start justify-center ">
                                <h3 className="text-lg mb-3 font-semibold">{isEng ? 'Company' : 'ኩባንያ'}</h3>
                                <ul className="list-none space-y-3">
                                    {links.map((link, index) => (
                                        <div
                                            key={link.nameEng}
                                            onMouseEnter={() => setHoverIndex(index)}
                                            onMouseLeave={() => setHoverIndex(null)}
                                            className="flex items-center transition duration-300"
                                        >
                                            {hoverIndex === index && <div className="w-3 h-1 bg-blue-950 rounded-full transition duration-300 mr-2"></div>}
                                            <li>
                                                <Link
                                                    to={link.path}
                                                    className={`hover:underline  transition duration-300 ${location.pathname === link.path ? 'text-red-500' : ''}`}
                                                >
                                                    {isEng ? link.nameEng : link.nameAm}
                                                </Link>
                                            </li>
                                        </div>
                                    ))}
                                </ul>
                            </div>

                            {/* Support Links */}
                            <div className="flex flex-col items-center sm:items-start">
                                <h3 className="text-lg mb-3 font-semibold">{isEng ? 'Support' : 'ድጋፍ'}</h3>
                                <ul className="list-none space-y-3">
                                    <li><a href="#" className="hover:underline transition duration-300">{isEng ? 'Help Center' : 'የእገዛ ማዕከል'}</a></li>
                                    <li><a href="#" className="hover:underline transition duration-300">{isEng ? 'FAQ' : 'አንቀጽ ጥያቄዎች'}</a></li>
                                    <li><a href="#" className="hover:underline transition duration-300">{isEng ? 'Privacy Policy' : 'የግል ድርጅት ፖሊሲ'}</a></li>
                                    <li><a href="#" className="hover:underline transition duration-300">{isEng ? 'Terms of Service' : 'የአገልግሎት ዋነኛ መሠረት'}</a></li>
                                </ul>
                            </div>



                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-lg mb-3 font-semibold">{isEng ? 'Follow Us' : 'እንደኛ ይከተሉ'}</h3>
                        <ul className="flex gap-4">
                            <li><a href="#" aria-label="Facebook" className="text-xl hover:text-blue-400 transition duration-300"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                            <li><a href="#" aria-label="Twitter" className="text-xl hover:text-blue-400 transition duration-300"><FontAwesomeIcon icon={faTwitter} /></a></li>
                            <li><a href="#" aria-label="Instagram" className="text-xl hover:text-blue-400 transition duration-300"><FontAwesomeIcon icon={faInstagram} /></a></li>
                            <li><a href="#" aria-label="LinkedIn" className="text-xl hover:text-blue-400 transition duration-300"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                            <li><a href="#" aria-label="Github" className="text-xl hover:text-blue-400 transition duration-300"><FontAwesomeIcon icon={faGithub} /></a></li>
                        </ul>
                    </div>


                    {/* Newsletter Signup */}
                    <div className="flex flex-col items-center sm:items-start">
                        <h3 className="text-lg mb-3 font-semibold">{isEng ? 'Newsletter' : 'በወቅታዊ ዜና ላይ'}</h3>
                        <p className="text-sm mb-4">
                            {isEng ? 'Subscribe to get the latest news and offers.' : 'በወቅታዊ ዜናና ቅናሽ ይመዝገቡ።'}
                        </p>
                        <form className="flex flex-col space-y-2 w-full sm:w-auto">
                            <input
                                type="email"
                                placeholder={isEng ? 'Enter your email' : 'ኢሜልዎን ያስገቡ'}
                                className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                            >
                                {isEng ? 'Subscribe' : 'ይመዝገቡ'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer Copyright */}
                <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    &copy; 2024 Gojo. {isEng ? 'All rights reserved.' : 'ሁሉም መብቶች ተጠብቀዋል።'}
                </div>
            </div>
        </footer>
    );
}
