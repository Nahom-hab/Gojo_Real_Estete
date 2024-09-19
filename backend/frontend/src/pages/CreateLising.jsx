import React, { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const [files, setFiles] = useState(null);
  const [userData, setUserData] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    regularPrice: '',
    discountedPrice: '',
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    offer: false,
    imageURLs: [],
    type: '',
    userRef: '',
    email: '',
    username: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    if (!userData) {
      getUser();
    }
  }, [userData]);

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
      setUserData(data);
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = () => {
    if (!files || files.length === 0) return;

    setLoading(true);
    const promises = [];
    for (let i = 0; i < files.length; i++) {
      promises.push(storeImage(files[i]));
    }
    Promise.all(promises)
      .then((urls) => {
        console.log('Uploaded image URLs:', urls);
        setFormData((prevData) => ({ ...prevData, imageURLs: [...prevData.imageURLs, ...urls] }));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
        setLoading(false);
      });
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.error('Error uploading file', error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageRemove = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      imageURLs: prevData.imageURLs.filter((url, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.userRef = userData._id;
    formData.email = userData.email;
    formData.username = userData.username;
    if (!formData.discountedPrice) {
      formData.discountedPrice = formData.regularPrice;
    }
    try {
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      navigate('/');
      setSubmitError(false);
    } catch (error) {
      setSubmitError(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <div className="shadow-lg rounded-lg p-5">
        <h2 className="text-2xl text-center text-gray-800 mb-5">CREATE LISTING</h2>
        <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <input
              className="p-3 border border-gray-300 rounded"
              type="text"
              id="name"
              placeholder="Name"
              onChange={handleInputChange}
              required
            />
            <textarea
              className="p-3 border border-gray-300 rounded resize-none h-20"
              id="description"
              placeholder="Description"
              onChange={handleInputChange}
              required
            />
            <input
              className="p-3 border border-gray-300 rounded"
              type="text"
              id="address"
              placeholder="Address"
              onChange={handleInputChange}
              required
            />

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="furnished"
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="furnished">Furnished</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="parking"
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="parking">Parking spot</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="offer"
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="offer">Offer</label>
              </div>
            </div>

            <div className="flex flex-wrap gap-10">
              <div className="flex flex-col">
                <input
                  className="p-3 border border-gray-300 rounded"
                  min={0}
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  required
                />
                <label className="text-sm text-gray-600">Bedrooms</label>
              </div>
              <div className="flex flex-col">
                <input
                  className="p-3 border border-gray-300 rounded"
                  min={0}
                  id="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  required
                />
                <label className="text-sm text-gray-600">Bathrooms</label>
              </div>
              <div className="flex flex-col">
                <input
                  className="p-3 border border-gray-300 rounded"
                  id="regularPrice"
                  type="number"
                  value={formData.regularPrice}
                  onChange={handleInputChange}
                  required
                />
                <label className="text-sm text-gray-600">Regular Price</label>
              </div>
              {formData.offer && (
                <div className="flex flex-col">
                  <input
                    className="p-3 border border-gray-300 rounded"
                    id="discountedPrice"
                    type="number"
                    value={formData.discountedPrice}
                    onChange={handleInputChange}
                  />
                  <label className="text-sm text-gray-600">Discounted Price</label>
                </div>
              )}
            </div>
            <input
              className="p-3 border border-gray-300 rounded"
              type="text"
              id="type"
              placeholder="Type"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <p>The first image will be the cover image (max=6)</p>
            <div className="flex items-center">
              <input
                type="file"
                className="hidden"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                id="fileInput"
              />
              <label htmlFor="fileInput" className="bg-gray-800 text-white py-2 px-4 rounded cursor-pointer hover:bg-gray-700">
                {loading ? 'Uploading...' : 'Upload photos'}
              </label>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {formData.imageURLs.length > 0 &&
                formData.imageURLs.map((image, index) => (
                  <div className="flex flex-col items-center" key={index}>
                    <img className="w-24 h-32 object-cover rounded-lg" src={image} alt={`Listing ${index}`} />
                    <button className="bg-red-600 text-white mt-2 py-1 px-2 rounded hover:opacity-75" type="button" onClick={() => handleImageRemove(index)}>
                      Delete
                    </button>
                  </div>
                ))}
            </div>

            <button className="bg-gray-800 text-white py-2 px-4 rounded mt-5 hover:bg-gray-700 w-full" type="submit">
              Upload Listing
            </button>
            {submitError && <p className="text-red-600 mt-2">Error submitting Listing</p>}
          </div>
        </form>
      </div>
    </div>
  );
}