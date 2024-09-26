import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/images/logoo.png';

export default function Footer() {
    const location = useLocation();
    const [hoverIndex, setHoverIndex] = useState(null);

    const links = [
        { name: 'About Us', path: '/about' },
        { name: 'Buy', path: '/buy' },
        { name: 'Rent', path: '/rent' },
        { name: 'Sell', path: '/sell' },
        { name: 'Affordability Calculator', path: '/affordabilityCalculator' },
    ];

    return (
        <footer className="bg-white text-black py-10 flex flex-col items-center">
            <div className="flex flex-wrap max-w-screen-xl w-full mx-auto justify-between px-5 py-10 border-b-2">
                {/* Logo and Title */}
                <div className="flex flex-col items-start">
                    <Link to="/" className="flex items-center mb-4">
                        <img className="w-52 h-36" src={logo} alt="Gojo Logo" />
                    </Link>
                    <h2 className="font-bold text-2xl">Gojo RealEstate</h2>
                </div>

                {/* Company Links */}
                <div className="flex-1 min-w-[200px] mx-2">
                    <h3 className="text-lg mb-3 font-semibold">Company</h3>
                    <ul className="list-none space-y-3">
                        {links.map((link, index) => (
                            <div
                                key={link.name}
                                onMouseEnter={() => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(null)}
                                className="flex items-center transition duration-300"
                            >
                                {hoverIndex === index && <div className="w-3 h-1 bg-blue-950 rounded-full transition duration-300"></div>}
                                <li>
                                    <Link
                                        to={link.path}
                                        className={`text-black hover:underline transition duration-300 ${location.pathname === link.path ? 'text-red-500' : ''}`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>

                {/* Support Links */}
                <div className="flex-1 min-w-[200px] mx-2">
                    <h3 className="text-lg mb-3 font-semibold">Support</h3>
                    <ul className="list-none space-y-3">
                        <li><a href="#" className="text-black hover:underline transition duration-300">Help Center</a></li>
                        <li><a href="#" className="text-black hover:underline transition duration-300">FAQ</a></li>
                        <li><a href="#" className="text-black hover:underline transition duration-300">Privacy Policy</a></li>
                        <li><a href="#" className="text-black hover:underline transition duration-300">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Social Media Links */}
                <div className="flex-1 min-w-[200px] mx-2">
                    <h3 className="text-lg mb-3 font-semibold">Follow Us</h3>
                    <ul className="flex gap-4 justify-center mt-4">
                        <li><a href="#" aria-label="Facebook" className="text-black text-xl hover:text-blue-400 transition duration-300"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                        <li><a href="#" aria-label="Twitter" className="text-black text-xl hover:text-blue-400 transition duration-300"><FontAwesomeIcon icon={faTwitter} /></a></li>
                        <li><a href="#" aria-label="Instagram" className="text-black text-xl hover:text-blue-400 transition duration-300"><FontAwesomeIcon icon={faInstagram} /></a></li>
                        <li><a href="#" aria-label="LinkedIn" className="text-black text-xl hover:text-blue-400 transition duration-300"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                        <li><a href="#" aria-label="Github" className="text-black text-xl hover:text-blue-400 transition duration-300"><FontAwesomeIcon icon={faGithub} /></a></li>
                    </ul>
                </div>
            </div>

            {/* Footer Copyright */}
            <div className="mt-4 text-sm text-gray-500">&copy; 2024 Gojo. All rights reserved.</div>
        </footer>
    );
}
