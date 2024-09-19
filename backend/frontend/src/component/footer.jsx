import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-white text-black py-5 pt-32 flex flex-col items-center">
            <div className="flex flex-wrap max-w-screen-xl w-full mx-auto justify-between">
                <div className="flex-1 min-w-[200px] m-2">
                    <h3 className="text-lg font-semibold">Company</h3>
                    <ul className="list-none p-0">
                        <li><a href="#" className="text-black hover:underline">About Us</a></li>
                        <li><a href="#" className="text-black hover:underline">Our Team</a></li>
                        <li><a href="#" className="text-black hover:underline">Careers</a></li>
                        <li><a href="#" className="text-black hover:underline">Blog</a></li>
                    </ul>
                </div>
                <div className="flex-1 min-w-[200px] m-2">
                    <h3 className="text-lg font-semibold">Support</h3>
                    <ul className="list-none p-0">
                        <li><a href="#" className="text-black hover:underline">Help Center</a></li>
                        <li><a href="#" className="text-black hover:underline">FAQ</a></li>
                        <li><a href="#" className="text-black hover:underline">Privacy Policy</a></li>
                        <li><a href="#" className="text-black hover:underline">Terms of Service</a></li>
                    </ul>
                </div>
                <div className="flex-1 min-w-[200px] m-2">
                    <h3 className="text-lg font-semibold">Follow Us</h3>
                    <ul className="flex gap-2 p-0">
                        <li><a href="#" aria-label="Facebook" className="text-black text-xl hover:text-blue-400"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                        <li><a href="#" aria-label="Twitter" className="text-black text-xl hover:text-blue-400"><FontAwesomeIcon icon={faTwitter} /></a></li>
                        <li><a href="#" aria-label="Instagram" className="text-black text-xl hover:text-blue-400"><FontAwesomeIcon icon={faInstagram} /></a></li>
                        <li><a href="#" aria-label="LinkedIn" className="text-black text-xl hover:text-blue-400"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                        <li><a href="#" aria-label="GitHub" className="text-black text-xl hover:text-blue-400"><FontAwesomeIcon icon={faGithub} /></a></li>
                    </ul>
                </div>
                <div className="flex items-center justify-center m-2">
                    <select className="p-1 rounded-md bg-gray-600 text-black">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                    </select>
                </div>
            </div>
            <div className="text-center mt-5">
                <p>&copy; 2024 RealEstate Finder. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;