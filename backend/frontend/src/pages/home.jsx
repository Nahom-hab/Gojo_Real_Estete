import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import landingImage from '../assets/images/lake.jpg';
import HorizontalScroller from '../component/HorizontalScroller'
import buyImage from '../assets/images/buy.png'
import sellImg from '../assets/images/sell.png'
import rentImg from '../assets/images/rent2.png'
import apartment from '../assets/images/apartment.jpeg'
import building from '../assets/images/side.jpeg'
import bug2 from '../assets/images/bug3.png'
import useUser from '../zustand/useUser';
import luxuary from '../assets/images/luxuary.jpeg'

export default function Home() {
  const { setAllListings, AllListings, isEng } = useUser()
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await fetch('/api/listing'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();

      setAllListings(result); // Set listings in state
      localStorage.setItem("listings", JSON.stringify(result)); // Save to localStorage
      setLoading(false)
    };
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', searchTerm);
    navigate(`/search?${urlParams.toString()}`);
  };
  const handlePrice = (price) => {
    navigate('/ListingswithPrice', { state: price })
  }
  const handlenaviagteRoute = (type) => {
    navigate('/listingsType', { state: type })
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);


  const handleStreets = (street, rentorsale) => {
    navigate('/Listings', { state: { street, rentorsale } })
  }

  return (
    <div className="relative mt-[-5px] pb-20 dark:bg-gray-800 bg-[#fafafa]">
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
            <form onSubmit={handleSearch} className="flex w-full max-w-lg mt-8 pr-4 items-center dark:bg-gray-800 bg-white rounded-md p-2 shadow-lg">
              <input
                type="text"
                placeholder="Enter an address, neighborhood, city or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white dark:bg-gray-800 text-black dark:text-white border-none outline-none flex-grow p-2 text-lg"
              />
              <button type="submit" className="text-black dark:text-white text-2xl ml-2">
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
      </div>


      <div className='flex mt-10 justify-center'>
        <div className='w-[90%]'>
          <div className='md:text-[26px] dark:text-white text-[20px] font-bold'>
            {isEng ? 'New listings are out don\'t miss out on opportunities :' : 'አዳዲስ የማስታወቂያዎች ወጥተዋል እባክዎ ዕድል አትርፉ፡፡'}
          </div>
          <div className='dark:text-gray-200 text-gray-600'>
            {isEng ? '11+ new Listings' : '11+ አዳዲስ የማስታወቂያዎች'}
          </div>
          <HorizontalScroller className='flex hover:cursor-pointer hover:text-gray-400 gap-2' />
        </div>
      </div>

      <div className='dark:bg-gray-800 bg-gray-50 p-7 md:flex space-y-3 justify-center gap-8 mt-10 pt-16 pb-16'>
        <div className='md:w-[360px] w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 text-black dark:text-white bg-white rounded-2xl gap-2 py-10 px-5 justify-center flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.2)]'>
          <img className='w-40' src={buyImage} alt="" />
          <h2 className='text-2xl font-extrabold'>{isEng ? 'Buy A Home' : 'ቤት ግዢ'}</h2>
          <p className='text-center p-4  dark:text-gray-200 text-gray-700'>{isEng ? 'Find your place with an immersive photo experience and  listings' : 'ቦታዎን ይፈልጉ እንዲህ ያለ የፎቶ ማስታወቂያ ተመን እና የማስታወቂያዎች ጋር፣ በማንኛውም ሌላ ቦታ ማግኘት የማትችሉበት ነገር እንዲህ ያለው ይገኛል፡፡'}</p>
          <Link className='text-center' to={'/search'}>
            <button className='border border-black hover:opacity-45 dark:border-gray-400 p-2 px-4 rounded-xl'>{isEng ? 'Browse homes' : 'ቤቶችን ይዘው ይቃኙ'}</button>
          </Link>
        </div>
        <div className='md:w-[360px] w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 text-black dark:text-white  bg-white rounded-2xl gap-3 py-10 px-5 justify-center flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.2)]'>
          <img className='w-40' src={sellImg} alt="" />
          <h2 className='text-2xl font-extrabold'>{isEng ? 'Sell A Home' : 'ቤት ሽያጭ'}</h2>
          <p className='text-center p-4 dark:text-gray-200 text-gray-700'>{isEng ? 'Set your home on a path to sell. We guide you through the process.' : 'የቤትዎን ቀንበር ወደ ሽያጭ መምጣት ይደረግ። እኛ የሂደትዎን መሪነት እንደገና አስተውላለን፡፡'}</p>
          <Link className='text-center' to={'/sell'}>
            <button className='border border-black dark:border-gray-400 hover:opacity-45 p-2 px-4 rounded-xl'>{isEng ? 'Get started' : 'መጀመር ይፈልጉ'}</button>
          </Link>
        </div>
        <div className='md:w-[360px] w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 text-black dark:text-white bg-white rounded-2xl gap-3 py-10 px-5 justify-center flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.2)]'>
          <img className='w-40' src={rentImg} alt="" />
          <h2 className='text-2xl font-extrabold'>{isEng ? 'Rent A Home' : 'ቤት ኪራይ'}</h2>
          <p className='text-center p-4  dark:text-gray-200 text-gray-700'>{isEng ? 'Discover homes for rent in your area.' : 'የእናት ቦታ ወቅቱን ቤት ይረኩ።'}</p>
          <Link className='text-center' to={'/search'}>
            <button className='border border-black dark:border-gray-400 p-2 px-4 hover:opacity-45 rounded-xl'>{isEng ? 'Browse homes' : 'ቤቶችን ይዘው ይቃኙ'}</button>
          </Link>
        </div>
      </div>

      <div className='flex h-fit justify-center'>
        <div className='md:w-[90%] w-[98%] flex gap-3'>
          <div className='flex w-full md:w-[90%] flex-col gap-3'>
            <div className='flex gap-3'>



              <div onClick={() => handlenaviagteRoute('apartment')} className='relative overflow-hidden group'>
                <img src={apartment} className='h-[300px] rounded-2xl object-cover brightness-75 transition-all duration-500 group-hover:brightness-50' alt="Apartment" />

                <div className='absolute bottom-5 left-5 right-5 text-white text-[17px] md:text-2xl font-bold z-10 transition-all duration-500 hover:mt-[-30px] md:hover:mt-[-60px] group-hover:translate-y-[-100px]'>
                  Apartments In Addis Ababa
                  <div className='md:text-sm text-[8px] text-gray-200'>For living with Family</div>
                </div>
                <div className='absolute bottom-[-80px]   p-4 text-white md:text-lg text-[12px] font-medium opacity-0 group-hover:opacity-100 group-hover:translate-y-[-80px] transition-all duration-500'>
                  Over 150 homes available for sale and rent.
                  150 homes available for sale and rent.


                </div>
              </div>



              <div className='relative overflow-hidden group'>
                {/* Image is darkened even before hover */}
                <img src={luxuary} className='h-[300px] rounded-2xl object-cover brightness-75 transition-all duration-500 group-hover:brightness-50' alt="Apartment" />

                {/* Apartments In Addis Ababa text moves to the middle and is bigger */}
                <div className='absolute bottom-5 left-5 right-5 text-white text-[17px] md:text-2xl font-bold z-10 transition-all duration-500 hover:mt-[-40px] group-hover:translate-y-[-100px]'>
                  Expensive Houses in Addis
                  <div className='text-[8px] md:text-sm text-gray-200'>For living Luxurious Living</div>
                </div>

                {/* Hover text slides up and has additional information */}
                <div className='absolute bottom-[-80px]  p-4 text-white text-[12px] md:text-lg font-medium opacity-0 group-hover:opacity-100 group-hover:translate-y-[-80px] transition-all duration-500'>
                  Over 150 homes available for sale and rent.Over 150 homes available for sale and rent.
                  150 homes available for sale and rent.

                </div>
              </div>

            </div>



            <div className='relative overflow-hidden group'>
              {/* Image is darkened even before hover */}
              <img
                src={building}
                className='h-[300px] w-full rounded-2xl object-cover brightness-50 transition-all duration-500 group-hover:brightness-35'
                alt="Shop Building"
              />

              {/* Main Title */}
              <div className='flex flex-col'>
                <div className='absolute bottom-10 left-5 right-5 text-white text-xl md:text-3xl font-bold z-10 hover:mt-[-60px] transition-all duration-500 group-hover:-translate-y-8'>
                  Rental Shops in Addis Ababa
                  <div className='text-sm text-gray-200'>Get Your own rental shops in addis </div>
                </div>

                {/* Hover Text with Additional Information */}
                <div className='absolute bottom-[-80px]  p-4 text-gray-200 text-sm font-medium opacity-0 group-hover:opacity-100 group-hover:translate-y-[-80px] transition-all duration-500'>
                  <div> Discover the vibrant marketplace in Addis Ababa!</div>
                  <div>Get started on your entrepreneurial journey today!</div>

                </div>
              </div>

            </div>
          </div>



          <div className="relative md:block hidden overflow-hidden group w-[30%] mx-auto">
            <img
              src={bug2}
              className="h-full w-full rounded-2xl object-cover brightness-50 transition-all duration-500 group-hover:brightness-35"
              alt="Shop Building"
            />

            {/* Title and description container */}
            <div className="absolute bottom-0 left-0 right-0 text-white transition-all mb-[-60px] duration-500 group-hover:translate-y-[-50px] p-5">
              {/* Title - stays at the bottom */}
              <div className="text-3xl font-bold">
                Renting a Shop in Addis Ababa
              </div>

              {/* Description - hidden initially and moves up with the title */}
              <div className="mt-2 text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Discover the vibrant marketplace in Addis Ababa!
                <div>Get started on your entrepreneurial journey today!</div>
              </div>
            </div>
          </div>



        </div>
      </div>







      <div className='flex mt-10 justify-center'>
        <div className='w-[90%]'>
          <div className='text-[20px] md:text-[26px] text-black  dark:text-white font-bold'>
            Popular areas in Adiss Abeba
          </div>

          <div className='md:flex flex-wrap dark:text-white justify-between md:px-20 px-4  pt-10'>
            <div className='flex flex-col pb-10'>
              <div onClick={() => handleStreets('Bole', 'sale')} className='flex  md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-gray-400 gap-2'>{isEng ? 'listings for sale in Addis Ababa' : 'በአዲስ አበባ የሚሸጡ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Bole' : 'ቦሌ'}</span></div>
              <div onClick={() => handleStreets('Mexico', 'sale')} className='flex md:text-[17px] text-[14px] hover:cursor-pointer hover:text-gray-400 gap-2'>{isEng ? 'listings for sale in Addis Ababa' : 'በአዲስ አበባ የሚሸጡ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Mexico' : 'ሜክሲኮ'}</span></div>
              <div onClick={() => handleStreets('4 kilo', 'sale')} className='flex  md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-gray-400 gap-2'>{isEng ? 'listings for sale in Addis Ababa' : 'በአዲስ አበባ የሚሸጡ ዝርዝሮች'} <span className='font-bold'>{isEng ? '4 kilo' : '4 ኪሎ'}</span></div>
              <div onClick={() => handleStreets('Piyasa', 'sale')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-gray-400 gap-2'>{isEng ? 'listings for sale in Addis Ababa' : 'በአዲስ አበባ የሚሸጡ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Piyasa' : 'ፒያሳ'}</span></div>
              <div onClick={() => handleStreets('Goro', 'sale')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-gray-400 gap-2'>{isEng ? 'listings for sale in Addis Ababa' : 'በአዲስ አበባ የሚሸጡ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Goro' : 'ጎሮ'}</span></div>
              <div onClick={() => handleStreets('Summit', 'sale')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-gray-400 gap-2'>{isEng ? 'listings for sale in Addis Ababa' : 'በአዲስ አበባ የሚሸጡ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Summit' : 'ሱሚት'}</span></div>
              <div onClick={() => handleStreets('Ayat', 'sale')} className='flex  md:text-[17px] text-[14px] hover:cursor-pointer hover:text-gray-400 gap-2'>{isEng ? 'listings for sale in Addis Ababa' : 'በአዲስ አበባ የሚሸጡ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Ayat' : 'አያት'}</span></div>
              <div onClick={() => handleStreets('22', 'sale')} className='flex  md:text-[17px] text-[14px] hover:cursor-pointer hover:text-gray-400 gap-2'>{isEng ? 'listings for sale in Addis Ababa' : 'በአዲስ አበባ የሚሸጡ ዝርዝሮች'} <span className='font-bold'>{isEng ? '22' : '22'}</span></div>
              <div onClick={() => handleStreets('Megenagna', 'sale')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-gray-400 gap-2'>{isEng ? 'listings for sale in Addis Ababa' : 'በአዲስ አበባ የሚሸጡ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Megenagna' : 'መገናኛ'}</span></div>
            </div>
            <div className=' pb-10'>
              <div onClick={() => handleStreets('Bole', 'rent')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-gray-400 gap-2'>{isEng ? 'listings for Rent in Addis Ababa' : 'በአዲስ አበባ የሚከራይ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Bole' : 'ቦሌ'}</span></div>
              <div onClick={() => handleStreets('Mexico', 'rent')} className='flex  md:text-[17px] text-[14px] hover:cursor-pointer hover:text-gray-400 gap-2'>{isEng ? 'listings for Rent in Addis Ababa' : 'በአዲስ አበባ የሚከራይ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Mexico' : 'ሜክሲኮ'}</span></div>
              <div onClick={() => handleStreets('4 kilo', 'rent')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-gray-400 gap-2'>{isEng ? 'listings for Rent in Addis Ababa' : 'በአዲስ አበባ የሚከራይ ዝርዝሮች'} <span className='font-bold'>{isEng ? '4 kilo' : '4 ኪሎ'}</span></div>
              <div onClick={() => handleStreets('Piyasa', 'rent')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-gray-400 gap-2'>{isEng ? 'listings for Rent in Addis Ababa' : 'በአዲስ አበባ የሚከራይ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Piyasa' : 'ፒያሳ'}</span></div>
              <div onClick={() => handleStreets('Goro', 'rent')} className='flex  md:text-[17px] text-[14px] hover:cursor-pointer hover:text-gray-400 gap-2'>{isEng ? 'listings for Rent in Addis Ababa' : 'በአዲስ አበባ የሚከራይ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Goro' : 'ጎሮ'}</span></div>
              <div onClick={() => handleStreets('Summit', 'rent')} className='flex  md:text-[17px] text-[14px] hover:cursor-pointer hover:text-gray-400 gap-2'>{isEng ? 'listings for Rent in Addis Ababa' : 'በአዲስ አበባ የሚከራይ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Summit' : 'ሱሚት'}</span></div>
              <div onClick={() => handleStreets('Ayat', 'rent')} className='flex  md:text-[17px] text-[14px] hover:cursor-pointer hover:text-gray-400 gap-2'>{isEng ? 'listings for Rent in Addis Ababa' : 'በአዲስ አበባ የሚከራይ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Ayat' : 'አያት'}</span></div>
              <div onClick={() => handleStreets('22', 'rent')} className='flex md:text-[17px] text-[14px]  hover:cursor-pointer hover:text-gray-400 gap-2'>{isEng ? 'listings for Rent in Addis Ababa' : 'በአዲስ አበባ የሚከራይ ዝርዝሮች'} <span className='font-bold'>{isEng ? '22' : '22'}</span></div>
              <div onClick={() => handleStreets('Megenagna', 'rent')} className='flex  md:text-[17px] text-[14px] hover:cursor-pointer hover:text-gray-400 gap-2'>{isEng ? 'listings for Rent in Addis Ababa' : 'በአዲስ አበባ የሚከራይ ዝርዝሮች'} <span className='font-bold'>{isEng ? 'Megenagna' : 'መገናኛ'}</span></div>
            </div>
            <div className='pb-10'>
              <div onClick={() => handlePrice(100000000)} className='flex md:text-[17px] text-[14px] hover:cursor-pointer hover:text-gray-400 gap-2'>
                {isEng ? 'listings under price' : 'በታች ያለው ዋጋ'} <span className='font-bold'>100M</span>
              </div>
              <div onClick={() => handlePrice(50000000)} className='flex md:text-[17px] text-[14px] hover:cursor-pointer hover:text-gray-400 gap-2'>
                {isEng ? 'listings under price' : 'በታች ያለው ዋጋ'} <span className='font-bold'>50M</span>
              </div>
              <div onClick={() => handlePrice(10000000)} className='flex md:text-[17px] text-[14px] hover:cursor-pointer hover:text-gray-400 gap-2'>
                {isEng ? 'listings under price' : 'በታች ያለው ዋጋ'} <span className='font-bold'>10M</span>
              </div>
              <div onClick={() => handlePrice(1000000)} className='flex md:text-[17px] text-[14px] hover:cursor-pointer hover:text-gray-400 gap-2'>
                {isEng ? 'listings under price' : 'በታች ያለው ዋጋ'} <span className='font-bold'>1M</span>
              </div>
              <div onClick={() => handlePrice(900000)} className='flex md:text-[17px] text-[14px] hover:cursor-pointer hover:text-gray-400 gap-2'>
                {isEng ? 'listings under price' : 'በታች ያለው ዋጋ'} <span className='font-bold'>900K</span>
              </div>
              <div onClick={() => handlePrice(500000)} className='flex md:text-[17px] text-[14px] hover:cursor-pointer hover:text-gray-400 gap-2'>
                {isEng ? 'listings under price' : 'በታች ያለው ዋጋ'} <span className='font-bold'>500K</span>
              </div>
              <div onClick={() => handlePrice(200000)} className='flex md:text-[17px] text-[14px] hover:cursor-pointer hover:text-gray-400 gap-2'>
                {isEng ? 'listings under price' : 'በታች ያለው ዋጋ'} <span className='font-bold'>200K</span>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
