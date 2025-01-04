import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import useUser from '../zustand/useUser';

export default function ContactUs() {
    const { pathname } = useLocation();
    const { isEng } = useUser();

    // State for form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    // State for modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name': setName(value); break;
            case 'email': setEmail(value); break;
            case 'phone': setPhone(value); break;
            case 'message': setMessage(value); break;
            default: break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const contactData = { name, email, phoneNumber: phone, message };

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData),
            });

            if (response.ok) {
                setIsModalOpen(true);
                // Clear the form
                setName('');
                setEmail('');
                setPhone('');
                setMessage('');
            } else {
                setError('Failed to send message. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='dark:bg-gray-800 dark:border-gray-600 mt-[-8px] pb-32'>
            {/* Modal for successful message */}
            {isModalOpen && (
                <div className="">
                    <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center transform scale-95 transition-transform duration-300">
                        <FaCheckCircle className="text-green-500 mx-auto mb-4 text-4xl animate-bounce" />
                        <h2 className="text-2xl dark:text-white font-bold mb-4">Message Sent!</h2>
                        <p className="mb-4 dark:text-gray-200">Thank you for contacting us. We will get back to you shortly.</p>
                        <button
                            onClick={closeModal}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {error && <p className="text-red-500">{error}</p>}

            <div className="py-5 md:px-[11%] md:mt-2 px-[4%]">
                <div className="flex justify-between md:flex-row flex-col gap-16">
                    {/* Contact Info */}
                    <div className="w-full md:w-[48%] bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-8 rounded-2xl shadow-lg">
                        <h2 className="text-3xl font-semibold mb-6">
                            {isEng ? 'Reach Us' : 'ወደ እኛ ይገናኙ'}
                        </h2>

                        {/* Contact Info Section */}
                        <div className="space-y-2">
                            {/* Phone Number */}
                            <div className="flex items-center text-lg gap-4">
                                <FaPhoneAlt className="text-2xl" />
                                <span className="font-light">+123 456 789</span>
                            </div>

                            {/* Email */}
                            <div className="flex items-center text-lg gap-4">
                                <FaEnvelope />
                                <span className="font-light">contact@furnish.com</span>
                            </div>

                            {/* Address */}
                            <div className="flex items-center text-lg gap-4">
                                <FaMapMarkerAlt />
                                <span className="font-light">1234 Design St, Suite 567, Cityname</span>
                            </div>
                        </div>

                        {/* Working Hours */}
                        <div className="text-lg mt-10 font-light">
                            <div className="mb-1">{isEng ? 'Working Hours:' : 'የሥራ ሰዓታት:'}</div>
                            <div>{isEng ? 'Mon - Fri: 9:00 AM - 6:00 PM' : 'ሰኞ - ዓርብ: 9:00 አ.ም - 6:00 ከምሽት'}</div>
                            <div>{isEng ? 'Sat - Sun: 10:00 AM - 4:00 PM' : 'ቅዳሜ - እሁድ: 10:00 አ.ም - 4:00 ከምሽት'}</div>
                        </div>

                        {/* Social Links */}
                        <h3 className="text-2xl font-semibold mt-10 mb-4">
                            {isEng ? 'Follow Us' : 'እንደ እኛ ይከተሉ'}
                        </h3>
                        <div className="flex gap-3">
                            <a href="https://facebook.com" className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full text-blue-700 hover:opacity-90">
                                <FaFacebookF className='text-3xl' />
                            </a>
                            <a href="https://twitter.com" className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full text-blue-400 hover:opacity-90">
                                <FaTwitter className='text-3xl' />
                            </a>
                            <a href="https://instagram.com" className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full text-red-500 hover:opacity-90">
                                <FaInstagram className='text-3xl' />
                            </a>
                            <a href="https://linkedin.com" className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full text-blue-950 hover:opacity-90">
                                <FaLinkedin className='text-3xl' />
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="w-full md:w-[48%] bg-gray-100 dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
                        <h2 className="text-3xl text-black dark:text-white font-semibold mb-6">{isEng ? 'Get in Touch' : 'በማስተዋል ይደውሉ'}</h2>
                        <form className="text-black dark:text-white space-y-3" onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <label className="text-[13px] font-light mb-1">{isEng ? 'Name' : 'ስም'}</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                    className="p-3 bg-gray-200 dark:bg-gray-700 placeholder-gray-700 dark:placeholder-gray-300 rounded-xl focus:outline-none"
                                    placeholder={isEng ? 'Your Name' : 'የእርስዎ ስም'}
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-[13px] font-light mb-1">{isEng ? 'Email (optional)' : 'ኢሜይል (አማራጭ)'}</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    className="p-3 bg-gray-200 dark:bg-gray-700 placeholder-gray-700 dark:placeholder-gray-300 rounded-xl focus:outline-none"
                                    placeholder={isEng ? 'Your Email (optional)' : 'የእርስዎ ኢሜይል (አማራጭ)'}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-[13px] font-light mb-1">{isEng ? 'Phone Number' : 'የስልክ ቁጥር'}</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={phone}
                                    onChange={handleChange}
                                    className="p-3 bg-gray-200 dark:bg-gray-700 placeholder-gray-700 dark:placeholder-gray-300 rounded-xl focus:outline-none"
                                    placeholder={isEng ? 'Your Phone Number' : 'የእርስዎ የስልክ ቁጥር'}
                                    required />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-[13px] font-light mb-1">{isEng ? 'Message' : 'መልዕክት'}</label>
                                <textarea
                                    name="message"
                                    value={message}
                                    onChange={handleChange}
                                    className="p-3 bg-gray-200 dark:bg-gray-700 placeholder-gray-700 dark:placeholder-gray-300 rounded-xl focus:outline-none"
                                    placeholder={isEng ? 'Your Message' : 'የእርስዎ መልዕክት'}
                                    rows="3"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className={`w-full ${isLoading ? 'bg-gray-500' : 'bg-blue-500'} text-white py-3 rounded-xl hover:bg-blue-600 transition duration-300`}
                                disabled={isLoading}
                            >
                                {isLoading ? (isEng ? 'Sending...' : 'ይላኩ...') : (isEng ? 'Send Message' : 'መልዕክት ይላኩ')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}