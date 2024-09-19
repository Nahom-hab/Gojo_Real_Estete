import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from 'react-icons/fa';
import Contact from '../component/Contact';

export default function ViewListing() {
  const [listing, setListing] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [showContactForm, setShowContactForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/getlisting/${params.id}`);
        if (!res.ok) {
          throw new Error('Error fetching data');
        }
        const data = await res.json();
        setListing(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (listing && listing.imageURLs) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % listing.imageURLs.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [listing]);

  const nextImage = () => {
    if (listing && listing.imageURLs) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % listing.imageURLs.length);
    }
  };

  const prevImage = () => {
    if (listing && listing.imageURLs) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + listing.imageURLs.length) % listing.imageURLs.length);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  if (!listing) {
    return <p className="text-center text-gray-600">No listing found.</p>;
  }

  return (
    <div className="max-w-full border rounded-lg overflow-hidden">
      <div className="relative">
        {listing.imageURLs.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none hover:bg-opacity-70"
            >
              Previous
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none hover:bg-opacity-70"
            >
              Next
            </button>
          </>
        )}
        <img
          src={listing.imageURLs[currentImageIndex]}
          alt={`Listing ${currentImageIndex}`}
          className="w-full h-80 object-cover"
        />
      </div>
      <div className="p-6">
        <div className="text-2xl font-semibold mb-4">
          {listing.name} {listing.type ? ` - $${listing.regularPrice}/Month` : ''}
        </div>
        <p className="text-sm mb-2">
          <FaMapMarkerAlt className="text-green-600 inline-block mr-2" />
          {listing.address}
        </p>
        <div className="flex gap-4 mb-4">
          <div className={`px-4 py-1 rounded-full text-white ${listing.type ? 'bg-red-600' : 'bg-blue-600'}`}>
            {listing.type ? 'For Rent' : 'For Sale'}
          </div>
          <div className="px-4 py-1 rounded-full text-white bg-green-600">
            ${listing.regularPrice}
          </div>
        </div>
        <p className="mb-4">
          Description: <span className="font-normal">{listing.description}</span>
        </p>
        <div className="flex gap-4 flex-wrap mb-4">
          <p className="text-sm">
            <FaBed className="inline-block text-gray-600 mr-2" /> {listing.bedrooms} bed
          </p>
          <p className="text-sm">
            <FaBath className="inline-block text-gray-600 mr-2" /> {listing.bathrooms} bath
          </p>
          <p className="text-sm">
            <FaParking className="inline-block text-gray-600 mr-2" /> {listing.parking ? 'Parking' : 'No Parking'}
          </p>
          <p className="text-sm">
            <FaChair className="inline-block text-gray-600 mr-2" /> {listing.furnished ? 'Furnished' : 'No Furnished'}
          </p>
        </div>
        {listing.offer && <p className="mb-4">Discounted Price: ${listing.discountedPrice}</p>}
        <div>
          {currentUser && currentUser.email !== listing.email && !showContactForm && (
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none"
              onClick={() => setShowContactForm(true)}
            >
              Contact Landlord
            </button>
          )}
          {showContactForm && <Contact listing={listing} />}
        </div>
      </div>
    </div>
  );
}
