import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/images/logoo.png';

export default function Footer() {
    const { currentUser } = useSelector(state => state.user);
    const location = useLocation();

    return (
        <footer className="bg-white text-black py-10 flex flex-col items-center">
            <div className="flex flex-wrap max-w-screen-xl pt-10 px-5 w-full mx-auto justify-between pb-10 border-b-2">
                <div className="flex-1 min-w-[200px] m-2">
                    <h3 className="text-lg mb-3 font-semibold">Company</h3>
                    <ul className="list-none space=y-3 p-0">
                        <li><Link to="/about" className={`text-black hover:underline ${location.pathname === '/about' ? 'text-red-500' : ''}`}>About Us</Link></li>
                        <li><Link to="/buy" className={`text-black hover:underline ${location.pathname === '/buy' ? 'text-red-500' : ''}`}>Buy</Link></li>
                        <li><Link to="/rent" className={`text-black hover:underline ${location.pathname === '/rent' ? 'text-red-500' : ''}`}>Rent</Link></li>
                        <li><Link to="/sell" className={`text-black hover:underline ${location.pathname === '/sell' ? 'text-red-500' : ''}`}>Sell</Link></li>
                        <li><Link to="/afordablityCalculator" className={`text-black hover:underline ${location.pathname === '/afordablityCalculator' ? 'text-red-500' : ''}`}>Affordability Calculator</Link></li>
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
                <div className="flex-1 min-w-[200px] m-2">
                    <Link to="/" className="flex items-center text-[34px] font-bold">
                        <img className="w-52 h-36" src={logo} alt="Gojo Logo" />
                    </Link>

                </div>
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
            <div className="mt-4 text-sm text-gray-500">&copy; 2024 Gojo. All rights reserved.</div>
        </footer>
    );
}
