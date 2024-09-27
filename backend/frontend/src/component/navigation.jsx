import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import logo from '../assets/images/logoo.png';
import useUser from '../zustand/useUser';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();
  const { isEng, setIsEng } = useUser();

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    const isEnglish = selectedLanguage === 'English';
    setIsEng(isEnglish);
    localStorage.setItem('isEng', isEnglish);
  };

  const closeSidebar = () => {
    setMenuOpen(false);
  };

  return (
    <header className="bg-white text-gray-600 h-20 w-full py-2 pb-0">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto px-3">
        <div className={`hidden md:block`}>
          <ul className="flex items-center">
            <li>
              <Link to="/buy" onClick={closeSidebar} className={`block py-2 px-3 ${location.pathname === '/buy' ? 'text-red-500' : ''}`}>
                {isEng ? 'Buy' : 'ግዢ'}
              </Link>
            </li>
            <li>
              <Link to="/rent" onClick={closeSidebar} className={`block py-2 px-3 ${location.pathname === '/rent' ? 'text-red-500' : ''}`}>
                {isEng ? 'Rent' : 'ኪራይ'}
              </Link>
            </li>
            <li>
              <Link to="/sell" onClick={closeSidebar} className={`block py-2 px-3 ${location.pathname === '/sell' ? 'text-red-500' : ''}`}>
                {isEng ? 'Sell' : 'ሽያጭ'}
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={closeSidebar} className={`block py-2 px-3 ${location.pathname === '/about' ? 'text-red-500' : ''}`}>
                {isEng ? 'About' : 'ስለ'}
              </Link>
            </li>
            <li>
              <Link to="/contactUs" onClick={closeSidebar} className={`block py-2 px-3 ${location.pathname === '/contactUs' ? 'text-red-500' : ''}`}>
                {isEng ? 'Contact Us' : 'እባኮትን ይደውሉ'}
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-black">
            <div className="h-1 w-6 bg-black mb-1"></div>
            <div className="h-1 w-6 bg-black mb-1"></div>
            <div className="h-1 w-6 bg-black"></div>
          </button>
        </div>
        <Link to="/" className="text-[34px] items-center flex gap-2 font-bold ">
          <img className='w-28 h-16' src={logo} alt="" />
        </Link>
        <ul className="hidden md:flex gap-1 items-center ">
          <li>
            <Link to="/" onClick={closeSidebar} className={`block py-2 px-2 ${location.pathname === '/' ? 'text-red-500' : ''}`}>
              {isEng ? 'Home' : 'ገበያ'}
            </Link>
          </li>
          <li>
            <Link to="/favorite" onClick={closeSidebar} className={`block py-2 px-2 ${location.pathname === '/favorite' ? 'text-red-500' : ''}`}>
              {isEng ? 'Favorite' : 'የእኔ ተወዳጅ'}
            </Link>
          </li>
          <li>
            <Link to="/mylisting" onClick={closeSidebar} className={`block py-2 px-2 ${location.pathname === '/mylisting' ? 'text-red-500' : ''}`}>
              {isEng ? 'My Listings' : 'የእኔ ቤቶች'}
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={closeSidebar} className={`block py-2 px-3 ${location.pathname === '/login' ? 'text-red-500' : ''}`}>
              Login
            </Link>
          </li>
          <div className='lg:ml-0 ml-6'>
            <select
              className='lg:block border-none outline-none'
              value={isEng ? 'English' : 'Amharic'}
              onChange={handleLanguageChange}
            >
              <option value='English'>English</option>
              <option value='Amharic'>Amharic</option>
            </select>
          </div>
        </ul>
        <nav ref={sidebarRef} className={`fixed top-0 left-0 w-full z-50 h-full bg-slate-50 ${menuOpen ? 'block' : 'hidden'} transition-transform duration-300 ease-in-out`}>
          <div className="flex flex-col w-full items-start h-full">
            <div className='flex justify-center w-full'>
              <Link to="/" className="text-[34px] items-center flex gap-2 font-bold">
                <img className='w-10 h-10' src={logo} alt="" /> Gojo
              </Link>
            </div>
            <ul className="w-full mt-8">
              <li className='flex justify-between p-3 px-5 items-center border border-t-gray-400 w-full text-lg '>
                <Link to="/" onClick={closeSidebar} className={`block ${location.pathname === '/' ? 'text-red-500' : ''}`}>
                  {isEng ? 'Home' : 'ገበያ'}
                </Link>
                <FaChevronDown />
              </li>
              <li className='flex justify-between p-3 px-5 items-center border border-t-gray-400 w-full text-lg '>
                <Link to="/buy" onClick={closeSidebar} className={`block ${location.pathname === '/buy' ? 'text-red-500' : ''}`}>
                  {isEng ? 'Buy' : 'ግዢ'}
                </Link>
                <FaChevronDown />
              </li>
              <li className='flex justify-between p-3 px-5 items-center border border-t-gray-400 w-full text-lg '>
                <Link to="/rent" onClick={closeSidebar} className={`block ${location.pathname === '/rent' ? 'text-red-500' : ''}`}>
                  {isEng ? 'Rent' : 'ኪራይ'}
                </Link>
                <FaChevronDown />
              </li>
              <li className='flex justify-between p-3 px-5 items-center border border-t-gray-400 w-full text-lg '>
                <Link to="/sell" onClick={closeSidebar} className={`block ${location.pathname === '/sell' ? 'text-red-500' : ''}`}>
                  {isEng ? 'Sell' : 'ሽያጭ'}
                </Link>
                <FaChevronDown />
              </li>
              <li className='flex justify-between p-3 px-5 items-center border border-t-gray-400 w-full text-lg '>
                <Link to="/about" onClick={closeSidebar} className={`block ${location.pathname === '/about' ? 'text-red-500' : ''}`}>
                  {isEng ? 'About' : 'ስለ'}
                </Link>
                <FaChevronDown />
              </li>
              <li className='flex justify-between p-3 px-5 items-center border border-t-gray-400 w-full text-lg '>
                <Link to="/contactUs" onClick={closeSidebar} className={`block ${location.pathname === '/contactUs' ? 'text-red-500' : ''}`}>
                  {isEng ? 'Contact Us' : 'እባኮትን ይደውሉ'}
                </Link>
                <FaChevronDown />
              </li>
              <li className='flex justify-between p-3 px-5 items-center border border-t-gray-400 w-full text-lg '>
                <Link to="/favorite" onClick={closeSidebar} className={`block ${location.pathname === '/favorite' ? 'text-red-500' : ''}`}>
                  {isEng ? 'Favorite' : 'የእኔ ተወዳጅ'}
                </Link>
                <FaChevronDown />
              </li>
              <li className='flex justify-between p-3 px-5 items-center border border-t-gray-400 w-full text-lg '>
                <Link to="/mylisting" onClick={closeSidebar} className={`block ${location.pathname === '/mylisting' ? 'text-red-500' : ''}`}>
                  {isEng ? 'My Listings' : 'የእኔ ቤቶች'}
                </Link>
                <FaChevronDown />
              </li>
              <li className='flex justify-between p-3 px-5 items-center border border-t-gray-400 w-full text-lg '>
                <Link to="/afordablityCalculator" onClick={closeSidebar} className={`block ${location.pathname === '/afordablityCalculator' ? 'text-red-500' : ''}`}>
                  {isEng ? 'Affordability Calculator' : 'የማቀነባበል ካልከር'}
                </Link>
                <FaChevronDown />
              </li>
              <div className='lg:ml-0 ml-6'>
                <select
                  className='lg:block  border-none outline-none'
                  value={isEng ? 'English' : 'Amharic'}
                  onChange={handleLanguageChange}
                >
                  <option value='English'>English</option>
                  <option value='Amharic'>Amharic</option>
                </select>
              </div>
            </ul>
          </div>
        </nav>

        <div className='flex md:hidden'>
          <Link to="/login" onClick={closeSidebar} className={`block py-2 px-3 ${location.pathname === '/login' ? 'text-red-500' : ''}`}>
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}