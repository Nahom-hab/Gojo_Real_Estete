import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import logo from '../assets/images/logoo.png'
import useUser from '../zustand/useUser';

export default function Navigation() {
  // const { currentUser } = useSelector(state => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

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
  const [searchTerm, setSearchTerm] = useState('');

  const location = useLocation();

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   const urlParams = new URLSearchParams();
  //   urlParams.set('searchTerm', searchTerm);
  //   navigate(`/search?${urlParams.toString()}`);
  // };
  const { isEng, setIsEng } = useUser()
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    const isEnglish = selectedLanguage === 'English';
    setIsEng(isEnglish);

    // Save language preference to localStorage
    localStorage.setItem('isEng', isEnglish);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const closeSidebar = () => {
    setMenuOpen(false);
  };

  return (
    <header className="bg-white text-gray-600 h-20 w-full py-2 pb-0">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto px-3">



        <div className={`hidden md:block`}>
          <ul className="flex  items-center">
            <li>
              <Link to="/buy" onClick={closeSidebar} className={`block py-2 px-3 ${location.pathname === '/buy' ? 'text-red-500' : ''}`}>Buy</Link>
            </li>
            <li>
              <Link to="/rent" onClick={closeSidebar} className={`block py-2 px-3 ${location.pathname === '/rent' ? 'text-red-500' : ''}`}>Rent</Link>
            </li>

            <li>
              <Link to="/sell" onClick={closeSidebar} className={`block py-2 px-3 ${location.pathname === '/sell' ? 'text-red-500' : ''}`}>Sell</Link>
            </li>
            <li>
              <Link to="/about" onClick={closeSidebar} className={`block py-2 px-3 ${location.pathname === '/about' ? 'text-red-500' : ''}`}>About</Link>
            </li>
            <li>
              <Link to="/contactUs" onClick={closeSidebar} className={`block py-2 px-3 ${location.pathname === '/contactUs' ? 'text-red-500' : ''}`}>Contact Us</Link>
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
            <Link to="/" onClick={closeSidebar} className={`block py-2 px-2 ${location.pathname === '/' ? 'text-red-500' : ''}`}>Home</Link>
          </li>

          <li>
            <Link to="/favorite" onClick={closeSidebar} className={`block py-2 px-2 ${location.pathname === '/favorite' ? 'text-red-500' : ''}`}>Favorite</Link>
          </li>
          {/* <li>
            <Link to="/mylisting" onClick={closeSidebar} className={`block py-2 mr-7 px-2 ${location.pathname === '/mylisting' ? 'text-red-500' : ''}`}>My Listings</Link>
          </li> */}
          {/* {currentUser ? (
            <li>
              <Link to="/profile" onClick={closeSidebar}>
                <img className="rounded-full w-10" src={currentUser.photoURL} alt="profile" />
              </Link>
            </li>
          ) : ( */}
          <li>
            <Link to="/login" onClick={closeSidebar} className={`block py-2 px-3 ${location.pathname === '/login' ? 'text-red-500' : ''}`}>Login</Link>
          </li>
          <div className=' lg:ml-0 ml-6'>
            <select
              className='lg:block bg-[#FFF4E9] border-none outline-none'
              value={isEng ? 'English' : 'Amharic'}
              onChange={handleLanguageChange}
            >
              <option value='English'>English</option>
              <option value='Amharic'>Amharic</option>
            </select>
          </div>
          {/* )} */}
        </ul>
        <nav ref={sidebarRef} className={`fixed top-0 left-0 w-full z-50 h-full bg-slate-50  ${menuOpen ? 'block' : 'hidden'} transition-transform duration-300 ease-in-out`} style={{ zIndex: 50 }}>
          <div className="flex flex-col w-full items-start  h-full">
            <div className='flex justify-center w-full'>
              <Link to="/" className="text-[34px] items-center flex gap-2 font-bold">
                <img className='w-10 h-10' src={logo} alt="" /> Gojo
              </Link>
            </div>

            <ul className="w-full mt-8">
              <li className='flex justify-between p-3 px-5 items-center   border border-t-gray-400  w-full text-lg '>
                <Link to="/" onClick={closeSidebar} className={`block ${location.pathname === '/' ? 'text-red-500' : ''}`}>Home</Link>
                <FaChevronDown />
              </li>

              <li className='flex justify-between p-3 px-5 items-center   border border-t-gray-400  w-full text-lg '>

                <Link to="/buy" onClick={closeSidebar} className={`block  ${location.pathname === '/buy' ? 'text-red-500' : ''}`}>Buy</Link>
                <FaChevronDown />
              </li>
              <li className='flex justify-between p-3 px-5 items-center   border border-t-gray-400  w-full text-lg '>

                <Link to="/rent" onClick={closeSidebar} className={`block ${location.pathname === '/rent' ? 'text-red-500' : ''}`}>Rent</Link>
                <FaChevronDown />

              </li>

              <li className='flex justify-between p-3 px-5 items-center   border border-t-gray-400  w-full text-lg '>

                <Link to="/sell" onClick={closeSidebar} className={`block ${location.pathname === '/sell' ? 'text-red-500' : ''}`}>Sell</Link>
                <FaChevronDown />

              </li>
              <li className='flex justify-between p-3 px-5 items-center   border border-t-gray-400  w-full text-lg '>

                <Link to="/mylisting" onClick={closeSidebar} className={`block  ${location.pathname === '/mylisting' ? 'text-red-500' : ''}`}>My Listings</Link>
                <FaChevronDown />

              </li>
              <li className='flex justify-between p-3 px-5 items-center   border border-t-gray-400  w-full text-lg '>

                <Link to="/favorite" onClick={closeSidebar} className={`block ${location.pathname === '/favorite' ? 'text-red-500' : ''}`}>Favorite</Link>
                <FaChevronDown />
              </li>
              <li className='flex justify-between p-3 px-5 items-center   border border-t-gray-400  w-full text-lg '>

                <Link to="/about" onClick={closeSidebar} className={`block   ${location.pathname === '/about' ? 'text-red-500' : ''}`}>About</Link>
                <FaChevronDown />


              </li>
              <li className='flex justify-between p-3 px-5 items-center   border border-t-gray-400  w-full text-lg '>

                <Link to="/contactUs" onClick={closeSidebar} className={`block ${location.pathname === '/contactUs' ? 'text-red-500' : ''}`}>Contact Us</Link>
                <FaChevronDown />
              </li>
              <li className='flex justify-between p-3 px-5 items-center   border border-t-gray-400  w-full text-lg '>

                <Link to="/afordablityCalculator" onClick={closeSidebar} className={`block ${location.pathname === '/afordablityCalculator' ? 'text-red-500' : ''}`}>Affordablity Calculator</Link>
                <FaChevronDown />

              </li>
              <div className=' lg:ml-0 ml-6'>
                <select
                  className='lg:block bg-[#FFF4E9] border-none outline-none'
                  value={isEng ? 'English' : 'Amharic'}
                  onChange={handleLanguageChange}
                >
                  <option value='English'>English</option>
                  <option value='Amharic'>Amharic</option>
                </select>
              </div>

              {/* {currentUser && (
                <li className='flex justify-between p-3 px-5 items-center   border border-t-gray-400  w-full text-lg '>


                  <Link to="/mylisting" onClick={closeSidebar} className={`block ${location.pathname === '/mylisting' ? 'text-red-500' : ''}`}>My Listing</Link>
                  <FaChevronDown />

                </li>
              )} */}

            </ul>

          </div>
        </nav>
        <div className='flex md:hidden'>
          {/* {currentUser ? (
            <Link to="/profile" onClick={closeSidebar}>
              <img className=" rounded-full w-10" src={currentUser.photoURL} alt="profile" />
            </Link>
          ) : ( */}
          <Link to="/login" onClick={closeSidebar} className={`block py-2 px-3 ${location.pathname === '/login' ? 'text-red-500' : ''}`}>Login</Link>
          {/* )} */}
        </div>

      </div>
    </header>
  );
}
