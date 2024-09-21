import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../component/Card';


export default function MyListing() {
  const { currentUser } = useSelector((state) => state.user);
  const [listingData, setListingData] = useState([]);
  const [listingDeleteError, setListingDeleteError] = useState(false);
  const [listingLoading, setListingLoading] = useState(true);
  const [userdata, setUserdata] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.email) {
      getUser();
    }
  }, [currentUser]);

  useEffect(() => {
    if (userdata._id) {
      getListing();
    }
  }, [userdata]);

  const getUser = async () => {
    try {
      const res = await fetch('/api/auth/getuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: currentUser.email }),
      });
      const data = await res.json();
      setUserdata(data);
    } catch (error) {
      console.error('Failed to fetch user data', error);
    } finally {
      setLoading(false);
    }
  };

  const getListing = async () => {
    try {
      const res = await fetch(`/api/user/getListing/${userdata._id}`);
      if (res.ok) {
        const listings = await res.json();
        setListingData(listings);
      } else {
        console.error('Failed to fetch listings');
      }
    } catch (error) {
      console.error('Error fetching listings', error);
    } finally {
      setListingLoading(false);
    }
  };

  const handleDeleteListing = async (id, e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      setListingData((prev) => prev.filter((list) => list._id !== id));

      try {
        const res = await fetch(`/api/listing/deleteListing/${id}`, { method: 'DELETE' });
        if (!res.ok) {
          setListingDeleteError(true);
        }
      } catch (error) {
        console.log(error);
        setListingDeleteError(true);
      }
    }
  };

  if (loading || listingLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-gray-300 flex flex-wrap justify-between">

      {listingDeleteError && <div className="text-red-600 mb-4">Failed to delete listing. Please try again.</div>}
      {listingData.length > 0 ? (
        listingData.map(({ _id, ...listing }) => (
          <div key={_id} className="flex flex-col mb-6">
            <Card result={listing} />
            <div className="flex justify-between px-2 mt-2">
              <button
                className="py-2 px-4 bg-red-600 text-white rounded-lg mb-2"
                onClick={(e) => handleDeleteListing(_id, e)}
              >
                DELETE
              </button>
              <Link to={`/editListing/${_id}`}>
                <button className="py-2 px-4 bg-teal-600 text-white rounded-lg mb-2">
                  EDIT
                </button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div>No listings available.</div>
      )}
    </div>
  );
}
