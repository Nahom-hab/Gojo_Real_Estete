import React from 'react';
import img1 from '../../assets/images/landing.jpg';
import img2 from '../../assets/images/landing2.jpg';
import img3 from '../../assets/images/lux.jpeg';
import img4 from '../../assets/images/hom.jpeg';
import { useNavigate } from 'react-router-dom';
import useUser from '../../zustand/useUser';
// import Footer from '../component/Footer';

const SellYourHomePage = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    const handleRoute = () => {
        if (user) {
            navigate("/addadress");
        } else {
            navigate("/signupSell");
        }
    };

    return (
        <div className="bg-gray-100">
            {/* Hero Section */}
            <section className="relative md:h-screen h-[60vh]">
                <img src={img1} alt="Hero Background" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative flex items-center justify-center h-full text-center text-white">
                    <div className="p-8">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">Sell Your Home with Gojo Real Estate</h1>
                        <p className="text-xl mb-6">Discover why working with us makes selling your home effortless and rewarding.</p>
                        <button
                            onClick={handleRoute}
                            className="bg-yellow-500 text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400 transition">
                            Get Started
                        </button>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 px-8 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Why Selling Your Home with Us is the Best Choice</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                            <img src={img2} alt="Personalized Service" className="w-full h-48 object-cover rounded-t-lg" />
                            <h3 className="text-xl font-semibold mt-4">Personalized Service</h3>
                            <p className="mt-2">We provide a tailored approach to meet your unique needs and goals.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                            <img src={img3} alt="Market Expertise" className="w-full h-48 object-cover rounded-t-lg" />
                            <h3 className="text-xl font-semibold mt-4">Market Expertise</h3>
                            <p className="mt-2">Leverage our deep knowledge of the local market to get the best price for your home.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                            <img src={img4} alt="Professional Network" className="w-full h-48 object-cover rounded-t-lg" />
                            <h3 className="text-xl font-semibold mt-4">Professional Network</h3>
                            <p className="mt-2">Access our extensive network of potential buyers and real estate professionals.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Sell Your Home Section */}
            <section className="py-16 px-8 bg-gray-200">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8">Your Step-by-Step Guide to Selling Your Home</h2>
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold">1. Prepare Your Home</h3>
                            <p className="mt-2">Clean, declutter, and stage your home to make it appealing to buyers.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold">2. Photograph Your Home</h3>
                            <p className="mt-2">Take high-quality photographs of your home, focusing on its best features and lighting to make it attractive to potential buyers.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold">3. Market Your Home</h3>
                            <p className="mt-2">Use the photographs and create compelling listings with detailed descriptions to attract buyers.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold">4. Close the Sale</h3>
                            <p className="mt-2">Negotiate offers and complete the necessary paperwork to finalize the sale.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hire a Professional Photographer Section */}
            <section className="py-16 px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">The Importance of Professional Photography</h2>
                    <img src={img4} alt="Professional Photography" className="w-full h-72 object-cover rounded-lg mb-4" />
                    <p className="text-lg">Professional photos enhance your home’s appeal and attract more potential buyers, helping you to achieve the best possible sale price.</p>
                </div>
            </section>

            {/* Contact Us Section */}
            <section id="contact" className="py-16 px-8 bg-blue-500 text-white text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Ready to Sell Your Home?</h2>
                    <p className="text-lg mb-8">Reach out to us for a free consultation or more information.</p>
                    <a href="mailto:contact@gojorealestate.com" className="bg-black text-yellow-500 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition">Contact Us</a>
                </div>
            </section>
        </div>
    );
};

export default SellYourHomePage;
