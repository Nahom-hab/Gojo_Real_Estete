import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import landingImage from '../assets/images/lake.jpg'; // Import the image
import HorizontalScroller from '../component/HorizontalScroller'
import buyImage from '../assets/images/buy.png'
import sellImg from '../assets/images/sell.png'
import rentImg from '../assets/images/rent2.png'

import { listings } from '../assets/data/data';
import useUser from '../zustand/useUser';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { AllListings, setAllListings } = useUser()

  const [offerData, setOfferData] = useState([]);
  const [rentData, setRentData] = useState([]);
  const [saleData, setSaleData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', searchTerm);
    navigate(`/search?${urlParams.toString()}`);
  };

  // useEffect(() => {
  //   const fetchalllistings = async () => {
  //     const res = await fetch(`/api/listing/all`);
  //     if (res.ok) {
  //       const data = await res.json();
  //       setAllListings(data);
  //     }
  //   }
  //   fetchalllistings()

  // }, [])

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchOfferData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        if (res.ok) {
          const Listings = await res.json();
          setOfferData(Listings);
          fetchRentData();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRentData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        if (res.ok) {
          const Listings = await res.json();
          setRentData(Listings);
          fetchSaleData();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSaleData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get?type=Rent&limit=4`);
        if (res.ok) {
          const Listings = await res.json();
          setSaleData(Listings);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferData();
  }, []);

  const handleStreets = (street, rentorsale) => {
    navigate('/Listings', { state: { street, rentorsale } })
  }

  return (
    <div className="relative mt-[-5px] bg-white">
      <div className="relative">
        <img
          src={landingImage}
          alt="Landing"
          className="w-full h-[450px] object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50 z-10" />
        <div className="absolute inset-0 flex flex-col justify-center items-start px-4 sm:px-8 lg:px-16 z-20">
          <div className="flex flex-col items-start mb-5">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Find your next
              <span className="text-green-500"> Perfect </span>
              <span className="block">place with ease</span>
            </h1>
            <form onSubmit={handleSearch} className="flex w-full max-w-lg mt-8 pr-4 items-center bg-white rounded-md p-2 shadow-lg">
              <input
                type="text"
                placeholder="Enter an address, neighborhood, city or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white text-black border-none outline-none flex-grow p-2 text-lg"
              />
              <button type="submit" className="text-black text-2xl ml-2">
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
      </div>



      <div className='flex mt-10 justify-center'>
        <div className='w-[90%]'>
          <div className='md:text-[26px] text-[20px] font-bold'>
            New listings are out don't miss out on opportunities :
          </div>
          <div className='text-gray-600'>
            11+ new Listings
          </div>
          <HorizontalScroller className='flex hover:cursor-pointer hover:text-blue-600 gap-2' listings={listings} />
        </div>
      </div>


      <div className='bg-gray-50 p-7 md:flex space-y-3  justify-center gap-8 mt-10 pt-16 pb-16'>
        <div className='md:w-[360px] w-full border border-gray-300 bg-white rounded-2xl gap-3 py-10 px-5 justify-center flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.2)]'>
          <img className='w-40' src={buyImage} alt="" />
          <h2 className='text-2xl font-extrabold'>Buy A Home</h2>
          <p className='text-center p-4 text-gray-700'>Find your place with an immersive photo
            experience and the listings, including
            things you won’t find anywhere else.</p>
          <Link className='text-center' to={'/search'}>
            <button className='border border-black p-2 px-4 rounded-xl'>Browse homes</button>
          </Link>
        </div>
        <div className='md:w-[360px] w-full border border-gray-300 bg-white rounded-2xl gap-3 py-10 px-5 justify-center flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.2)]'>
          <img className='w-40' src={sellImg} alt="" />
          <h2 className='text-2xl font-extrabold'>Sell A Home</h2>
          <p className='text-center p-4 text-gray-700'>No matter what path you take to sell your home, we can help you navigate a successful Rent.</p>
          <Link className='text-center' to={'/sell'}>
            <button className='border border-black p-2 px-4 rounded-xl'>See Your Options</button>
          </Link>
        </div>
        <div className='md:w-[360px] w-full border border-gray-300 bg-white rounded-2xl gap-3 py-10 px-5 justify-center flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.2)]'>
          <img className='w-40' src={rentImg} alt="" />
          <h2 className='text-2xl font-extrabold'>Rent A Home</h2>
          <Link className='text-center' to={'/rent'}>
            <p className='text-center p-4 text-gray-700'>We’re creating a seamless online experience – from shopping on the largest rental network, to applying, to paying rent.</p>
            <button className='border border-black p-2 px-4 rounded-xl'>Find Rentals</button>
          </Link>
        </div>
      </div>

      <div className='flex mt-10 justify-center'>
        <div className='w-[90%]'>
          <div className='text-[26px] text-green-500 font-bold'>
            Popular areas in Adiss Abeba
          </div>

          <div className='md:flex flex-wrap justify-between md:px-20 px-4  pt-10'>
            <div className='flex flex-col pb-10'>
              <div onClick={() => handleStreets('Bole', 'sale')} className='flex  md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>listings for sale in Adiss Abeba <span className='font-bold'>Bole</span></div>
              <div onClick={() => handleStreets('Mexico', 'sale')} className='flex md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>listings for sale in Adiss Abeba <span className='font-bold'>Mexico</span></div>
              <div onClick={() => handleStreets(' 4 kilo', 'sale')} className='flex  md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>listings for sale in Adiss Abeba <span className='font-bold'> 4 kilo </span></div>
              <div onClick={() => handleStreets('Piyasa', 'sale')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>listings for sale in Adiss Abeba <span className='font-bold'>Piyasa</span></div>
              <div onClick={() => handleStreets('Goro', 'sale')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>listings for sale in Adiss Abeba <span className='font-bold'>Goro</span></div>
              <div onClick={() => handleStreets('Summit', 'sale')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>listings for sale in Adiss Abeba <span className='font-bold'>Summit</span></div>
              <div onClick={() => handleStreets('Ayat', 'sale')} className='flex  md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>listings for sale in Adiss Abeba <span className='font-bold'>Ayat</span></div>
              <div onClick={() => handleStreets('22', 'sale')} className='flex  md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>listings for sale in Adiss Abeba <span className='font-bold'> 22</span></div>
              <div onClick={() => handleStreets('Megenagna', 'sale')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>listings for sale in Adiss Abeba <span className='font-bold'>Megenagna</span>  </div>

            </div>
            <div className=' pb-10'>
              <div onClick={() => handleStreets('Bole', 'rent')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>listings for Rent in Adiss Abeba <span className='font-bold'>Bole</span></div>
              <div onClick={() => handleStreets('Mexico', 'sale')} className='flex  md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>listings for Rent in Adiss Abeba <span className='font-bold'>Mexico</span></div>
              <div onClick={() => handleStreets(' 4 kilo', 'sale')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>listings for Rent in Adiss Abeba <span className='font-bold'> 4 kilo </span></div>
              <div onClick={() => handleStreets('Piyasa', 'sale')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>listings for Rent in Adiss Abeba <span className='font-bold'>Piyasa</span></div>
              <div onClick={() => handleStreets('Goro', 'sale')} className='flex  md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>listings for Rent in Adiss Abeba <span className='font-bold'>Goro</span></div>
              <div onClick={() => handleStreets('Summit', 'sale')} className='flex  md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>listings for Rent in Adiss Abeba <span className='font-bold'>Summit</span></div>
              <div onClick={() => handleStreets('Ayat', 'sale')} className='flex  md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>listings for Rent in Adiss Abeba <span className='font-bold'>Ayat</span></div>
              <div onClick={() => handleStreets('22', 'sale')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>listings for Rent in Adiss Abeba <span className='font-bold'> 22</span></div>
              <div onClick={() => handleStreets('Megenagna', 'sale')} className='flex  md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>listings for Rent in Adiss Abeba <span className='font-bold'>Megenagna</span>  </div>
            </div>
            <div className=' pb-10'>
              <div onClick={() => handleStreets('100000000', 'price')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>listings under <span className='font-bold'>100M</span></div>
              <div onClick={() => handleStreets('10000000', 'price')} className='flex  md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>listings under <span className='font-bold'>10M</span></div>
              <div onClick={() => handleStreets('1000000', 'price')} className='flex  md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>listings under <span className='font-bold'>1M</span></div>
              <div onClick={() => handleStreets('900000', 'price')} className='flex  md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>listings under <span className='font-bold'>900K</span></div>
              <div onClick={() => handleStreets('500000', 'price')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>listings under <span className='font-bold'>500K</span></div>
              <div onClick={() => handleStreets('200000', 'price')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>listings under <span className='font-bold'>200K</span></div>
              <div onClick={() => handleStreets('100000', 'price')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>listings under <span className='font-bold'>100K</span></div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
