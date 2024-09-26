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
  const { AllListings, setAllListings, isEng } = useUser()

  const [offerData, setOfferData] = useState([]);
  const [rentData, setRentData] = useState([]);
  const [saleData, setSaleData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', searchTerm);
    navigate(`/search?${urlParams.toString()}`);
  };
  const handlePrice = (price) => {
    navigate('/ListingswithPrice', { state: price })
  }

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
              {isEng ? 'Find your next' : 'ፍጹም ቆንጆ እና ማራኪ'}
              <span className="text-green-500"> {isEng ? 'Perfect' : 'ቤትዎን'} </span>
              <span className="block">{isEng ? 'place with ease' : 'በቀላሉ ያግኙ'}</span>
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
            {isEng ? 'New listings are out don\'t miss out on opportunities :' : 'አዳዲስ የማስታወቂያዎች ወጥተዋል እባክዎ ዕድል አትርፉ፡፡'}
          </div>
          <div className='text-gray-600'>
            {isEng ? '11+ new Listings' : '11+ አዳዲስ የማስታወቂያዎች'}
          </div>
          <HorizontalScroller className='flex hover:cursor-pointer hover:text-blue-600 gap-2' listings={listings} />
        </div>
      </div>

      <div className='bg-gray-50 p-7 md:flex space-y-3 justify-center gap-8 mt-10 pt-16 pb-16'>
        <div className='md:w-[360px] w-full border border-gray-300 bg-white rounded-2xl gap-3 py-10 px-5 justify-center flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.2)]'>
          <img className='w-40' src={buyImage} alt="" />
          <h2 className='text-2xl font-extrabold'>{isEng ? 'Buy A Home' : 'ቤት ግዢ'}</h2>
          <p className='text-center p-4 text-gray-700'>{isEng ? 'Find your place with an immersive photo experience and the listings, including things you won’t find anywhere else.' : 'ቦታዎን ይፈልጉ እንዲህ ያለ የፎቶ ማስታወቂያ ተመን እና የማስታወቂያዎች ጋር፣ በማንኛውም ሌላ ቦታ ማግኘት የማትችሉበት ነገር እንዲህ ያለው ይገኛል፡፡'}</p>
          <Link className='text-center' to={'/search'}>
            <button className='border border-black p-2 px-4 rounded-xl'>{isEng ? 'Browse homes' : 'ቤቶችን ይዘው ይቃኙ'}</button>
          </Link>
        </div>
        <div className='md:w-[360px] w-full border border-gray-300 bg-white rounded-2xl gap-3 py-10 px-5 justify-center flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.2)]'>
          <img className='w-40' src={sellImg} alt="" />
          <h2 className='text-2xl font-extrabold'>{isEng ? 'Sell A Home' : 'ቤት ሽያጭ'}</h2>
          <p className='text-center p-4 text-gray-700'>{isEng ? 'Set your home on a path to sell. We guide you through the process.' : 'የቤትዎን ቀንበር ወደ ሽያጭ መምጣት ይደረግ። እኛ የሂደትዎን መሪነት እንደገና አስተውላለን፡፡'}</p>
          <Link className='text-center' to={'/sell'}>
            <button className='border border-black p-2 px-4 rounded-xl'>{isEng ? 'Get started' : 'መጀመር ይፈልጉ'}</button>
          </Link>
        </div>
        <div className='md:w-[360px] w-full border border-gray-300 bg-white rounded-2xl gap-3 py-10 px-5 justify-center flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.2)]'>
          <img className='w-40' src={rentImg} alt="" />
          <h2 className='text-2xl font-extrabold'>{isEng ? 'Rent A Home' : 'ቤት ኪራይ'}</h2>
          <p className='text-center p-4 text-gray-700'>{isEng ? 'Discover homes for rent in your area.' : 'የእናት ቦታ ወቅቱን ቤት ይረኩ።'}</p>
          <Link className='text-center' to={'/search'}>
            <button className='border border-black p-2 px-4 rounded-xl'>{isEng ? 'Browse homes' : 'ቤቶችን ይዘው ይቃኙ'}</button>
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
              <div onClick={() => handleStreets('Bole', 'sale')} className='flex  md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>{isEng ? 'listings for sale in Addis Ababa' : 'በአዲስ አበባ የሚሸጡ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Bole' : 'ቦሌ'}</span></div>
              <div onClick={() => handleStreets('Mexico', 'sale')} className='flex md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>{isEng ? 'listings for sale in Addis Ababa' : 'በአዲስ አበባ የሚሸጡ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Mexico' : 'ሜክሲኮ'}</span></div>
              <div onClick={() => handleStreets('4 kilo', 'sale')} className='flex  md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>{isEng ? 'listings for sale in Addis Ababa' : 'በአዲስ አበባ የሚሸጡ ዝርዝሮች'} <span className='font-bold'>{isEng ? '4 kilo' : '4 ኪሎ'}</span></div>
              <div onClick={() => handleStreets('Piyasa', 'sale')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>{isEng ? 'listings for sale in Addis Ababa' : 'በአዲስ አበባ የሚሸጡ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Piyasa' : 'ፒያሳ'}</span></div>
              <div onClick={() => handleStreets('Goro', 'sale')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>{isEng ? 'listings for sale in Addis Ababa' : 'በአዲስ አበባ የሚሸጡ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Goro' : 'ጎሮ'}</span></div>
              <div onClick={() => handleStreets('Summit', 'sale')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>{isEng ? 'listings for sale in Addis Ababa' : 'በአዲስ አበባ የሚሸጡ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Summit' : 'ሱሚት'}</span></div>
              <div onClick={() => handleStreets('Ayat', 'sale')} className='flex  md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>{isEng ? 'listings for sale in Addis Ababa' : 'በአዲስ አበባ የሚሸጡ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Ayat' : 'አያት'}</span></div>
              <div onClick={() => handleStreets('22', 'sale')} className='flex  md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>{isEng ? 'listings for sale in Addis Ababa' : 'በአዲስ አበባ የሚሸጡ ዝርዝሮች'} <span className='font-bold'>{isEng ? '22' : '22'}</span></div>
              <div onClick={() => handleStreets('Megenagna', 'sale')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>{isEng ? 'listings for sale in Addis Ababa' : 'በአዲስ አበባ የሚሸጡ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Megenagna' : 'መገናኛ'}</span></div>
            </div>
            <div className=' pb-10'>
              <div onClick={() => handleStreets('Bole', 'rent')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>{isEng ? 'listings for Rent in Addis Ababa' : 'በአዲስ አበባ የሚከራይ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Bole' : 'ቦሌ'}</span></div>
              <div onClick={() => handleStreets('Mexico', 'rent')} className='flex  md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>{isEng ? 'listings for Rent in Addis Ababa' : 'በአዲስ አበባ የሚከራይ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Mexico' : 'ሜክሲኮ'}</span></div>
              <div onClick={() => handleStreets('4 kilo', 'rent')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>{isEng ? 'listings for Rent in Addis Ababa' : 'በአዲስ አበባ የሚከራይ ዝርዝሮች'} <span className='font-bold'>{isEng ? '4 kilo' : '4 ኪሎ'}</span></div>
              <div onClick={() => handleStreets('Piyasa', 'rent')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>{isEng ? 'listings for Rent in Addis Ababa' : 'በአዲስ አበባ የሚከራይ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Piyasa' : 'ፒያሳ'}</span></div>
              <div onClick={() => handleStreets('Goro', 'rent')} className='flex  md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>{isEng ? 'listings for Rent in Addis Ababa' : 'በአዲስ አበባ የሚከራይ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Goro' : 'ጎሮ'}</span></div>
              <div onClick={() => handleStreets('Summit', 'rent')} className='flex  md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>{isEng ? 'listings for Rent in Addis Ababa' : 'በአዲስ አበባ የሚከራይ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Summit' : 'ሱሚት'}</span></div>
              <div onClick={() => handleStreets('Ayat', 'rent')} className='flex  md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>{isEng ? 'listings for Rent in Addis Ababa' : 'በአዲስ አበባ የሚከራይ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Ayat' : 'አያት'}</span></div>
              <div onClick={() => handleStreets('22', 'rent')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-blue-600 gap-2'>{isEng ? 'listings for Rent in Addis Ababa' : 'በአዲስ አበባ የሚከራይ ዝርዝሮች'} <span className='font-bold'>{isEng ? '22' : '22'}</span></div>
              <div onClick={() => handleStreets('Megenagna', 'rent')} className='flex  md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>{isEng ? 'listings for Rent in Addis Ababa' : 'በአዲስ አበባ የሚከራይ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Megenagna' : 'መገናኛ'}</span></div>
            </div>
            <div className='pb-10'>
              <div onClick={() => handlePrice(100000000)} className='flex md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>
                {isEng ? 'listings under price' : 'በታች ያለው ዋጋ'} <span className='font-bold'>100M</span>
              </div>
              <div onClick={() => handlePrice(50000000)} className='flex md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>
                {isEng ? 'listings under price' : 'በታች ያለው ዋጋ'} <span className='font-bold'>50M</span>
              </div>
              <div onClick={() => handlePrice(10000000)} className='flex md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>
                {isEng ? 'listings under price' : 'በታች ያለው ዋጋ'} <span className='font-bold'>10M</span>
              </div>
              <div onClick={() => handlePrice(1000000)} className='flex md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>
                {isEng ? 'listings under price' : 'በታች ያለው ዋጋ'} <span className='font-bold'>1M</span>
              </div>
              <div onClick={() => handlePrice(900000)} className='flex md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>
                {isEng ? 'listings under price' : 'በታች ያለው ዋጋ'} <span className='font-bold'>900K</span>
              </div>
              <div onClick={() => handlePrice(500000)} className='flex md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>
                {isEng ? 'listings under price' : 'በታች ያለው ዋጋ'} <span className='font-bold'>500K</span>
              </div>
              <div onClick={() => handlePrice(200000)} className='flex md:text-[17px] text-[14px] hover:cursor-pointer hover:text-blue-600 gap-2'>
                {isEng ? 'listings under price' : 'በታች ያለው ዋጋ'} <span className='font-bold'>200K</span>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
