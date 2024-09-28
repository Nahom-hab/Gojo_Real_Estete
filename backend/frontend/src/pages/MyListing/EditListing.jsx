import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { FaTimes } from 'react-icons/fa';
import photo from '../../assets/images/photo.png'
import useUser from '../../zustand/useUser';


export default function EditListing() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    const location = useLocation();
    const navigate = useNavigate();
    const { isEng, user } = useUser()
    const listing = location.state || {};
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        name: listing.name,
        description: listing.description,
        address: listing.address,
        regularPrice: listing.regularPrice,
        discountedPrice: listing.discountedPrice,
        bathrooms: listing.bathrooms,
        bedrooms: listing.bedrooms,
        phoneNumber: listing.phoneNumber,
        basement: listing.basement,
        parking: listing.parking,
        RentOrSell: listing.RentOrSell,
        HomeType: listing.HomeType,
        imageFiles: listing.imageURLs,
        imageUrls: listing.imageURLs,
        lat: listing.lat,
        lon: listing.lon,
        userRef: listing.userRef
    });
    const [imageUrls, setImageUrls] = useState(listing.imageURLs || []); // Store uploaded image URLs

    const [clicked, setCicked] = useState(false)
    const [uploading, setUploading] = useState(false); // To track the upload status
    const [coverImageIndex, setCoverImageIndex] = useState(0); // Track cover image index

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (name === 'imageFiles') {
            setFormData((prev) => ({
                ...prev,
                imageFiles: files // Store selected images
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }

    };
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => {
            const files = acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file),
            }));
            setFormData(prev => ({
                ...prev,
                imageFiles: [...prev.imageFiles, ...files], // Add new files
            }));
        },
        accept: 'image/*',
    });



    const handleImageUpload = async () => {
        if (formData.imageFiles.length > 0) {
            setUploading(true);
            try {
                const uploadData = new FormData();
                for (const file of formData.imageFiles) {
                    uploadData.append('images', file);
                }

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadData,
                });

                if (!response.ok) {
                    throw new Error('Image upload failed');
                }

                const data = await response.json();
                setImageUrls(data.imagePaths); // Set the uploaded image URLs
            } catch (error) {
                console.error('Image upload failed:', error);
            } finally {
                setUploading(false);
            }
        } else {
            alert("Please select images to upload.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.imageUrls.length > 0 && (formData.imageUrls.length === formData.imageFiles.length)) {

            try {
                const fullFormData = {
                    ...formData,
                    imageUrls: formData.imageUrls, // Use the uploaded image URLs
                };

                const { imageFiles, ...otherFormData } = fullFormData;

                const res = await fetch(`/api/listing/${listing._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(otherFormData),
                });

                if (!res.ok) {
                    const { error } = await res.json();
                    return;
                }
                const data = await res.json()



                navigate('/listingSuccuss', { state: otherFormData });
            } catch (error) {
                console.log(error.message);

            }

        } else {
            setError('Upload the images Before you submit your listing')
        }


        // Redirect after form submission
    };

    const addImage = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            imageFiles: [...prev.imageFiles, ...files], // Add new files
        }));
        e.target.value = ''; // Clear the input
    };

    const removeImage = (index) => {
        const updatedFiles = formData.imageFiles.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            imageFiles: updatedFiles,
        }));
    };

    const handleSetCoverImage = (index) => {
        const updatedFiles = [...formData.imageFiles];
        const [coverImage] = updatedFiles.splice(index, 1); // Remove the selected cover image
        updatedFiles.unshift(coverImage); // Add it to the front
        setFormData(prev => ({
            ...prev,
            imageFiles: updatedFiles,
        }));
        setCoverImageIndex(0);
    };

    return (
        <div className="flex justify-center items-center dark:text-white  dark:bg-gray-800 pb-44 md:px-10 dark:border dark:border-x-0 dark:border-gray-600  bg-gray-100">
            <div className="w-full dark:bg-gray-800  bg-white p-4 md:p-6 md:px-20 rounded-lg shadow-lg">
                <h2 className='lg:text-4xl text-3xl font-bold pb-1 border pt-5 dark:text-white border-x-0 border-b-0 border-t-slate-400'>{isEng ? 'Listing For Sell or Rent' : 'የሚሸጥ ወይም የሚከራይ ዝርዝር'}</h2>
                <div className='text-xl border border-b-slate-400 border-x-0 dark:text-white pb-8 mb-6 border-t-0'> {formData.address}</div>

                <form onSubmit={handleSubmit} className="pt-4  space-y-4">


                    <div className='flex gap-8'>

                        {/* Regular Price */}
                        <div>
                            <label htmlFor="regularPrice" className="block text-sm font-medium dark:text-gray-300 text-gray-700">Set Regular Price(<span className='text-green-500 font-bold'>ETB</span>):</label>
                            <input
                                type="number"
                                id="regularPrice"
                                name="regularPrice"
                                placeholder='ETB'
                                value={formData.regularPrice}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border dark:bg-gray-900 dark:border-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        {/* Discounted Price */}
                        <div>
                            <label htmlFor="discountedPrice" className="block text-sm font-medium dark:text-gray-300 text-gray-700">Discounted Price:</label>
                            <input
                                type="number"
                                id="discountedPrice"
                                name="discountedPrice"
                                placeholder='ETB'
                                value={formData.discountedPrice}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border dark:bg-gray-900 dark:border-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-between gap-2">
                        <div className='flex justify-between'>
                            <label className="block text-xl font-medium dark:text-gray-200 text-gray-700">Photos:</label>
                            <div className={`bg-blue-400 text-white hover:opacity-70 ${clicked ? 'cursor-not-allowed' : ''} hover:cursor-pointer rounded-md px-3 py-2`} onClick={handleImageUpload}>
                                {uploading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-t-4 border-b-4 border-blue-500"></div>
                                    </div>
                                ) : 'Upload'}
                            </div>
                        </div>

                        <div {...getRootProps()} className={`border-2 border-dashed rounded-md p-4   w-full transition duration-200 ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}>
                            <input {...getInputProps()} />
                            <div className="flex flex-col gap-2 items-center justify-center h-full">
                                {isDragActive ? (
                                    <p className="text-blue-500">Drop the images here...</p>
                                ) : (
                                    <div className='flex flex-col items-center gap-2'>
                                        <img src={photo} className='w-16 h-16' alt="Upload placeholder" />
                                        <p className="dark:text-gray-200 text-gray-700 text-center">Drag and drop photos here to upload</p>
                                    </div>
                                )}
                                <span className="text-white px-2 py-1 bg-blue-600 rounded-lg text-md">Add new photo</span>
                            </div>
                        </div>
                    </div>

                    {formData.imageFiles.length > 0 && (
                        <div className="grid grid-cols-3 md:px-36 gap-4 mt-4">
                            {formData.imageFiles.map((file, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={file.preview || file} // Use preview for uploaded files
                                        alt={`Uploaded ${index + 1}`}
                                        className={`w-full h-24 object-cover rounded-md ${coverImageIndex === index ? 'border-2 border-blue-500' : ''}`}
                                    />
                                    {coverImageIndex === index && (
                                        <span className="absolute top-0 left-0 bg-blue-500 text-white text-xs p-2 border border-slate-700 rounded-br-md">Cover Image</span>
                                    )}
                                    {coverImageIndex !== index && (
                                        <button
                                            type="button"
                                            onClick={() => handleSetCoverImage(index)}
                                            className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-400 text-white text-xs p-1 rounded-md"
                                        >
                                            Set as Cover
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-0 right-0 bg-red-500 hover:opacity-60 text-white text-xs p-1 rounded-md"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className='flex mt-5 gap-3'>
                        <div className='space-y-2 w-[50%]'>
                            <div className=''>
                                <label htmlFor="name" className="block text-sm font-medium dark:text-white text-gray-700">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border dark:bg-gray-900 dark:border-gray-600 border-gray-300 rounded-md shadow-sm"
                                    required
                                />
                            </div>


                            <div className='flex justify-between gap-4 '>
                                {/* bathroom */}
                                <div className='w-full'>
                                    <label htmlFor="bathrooms" className="block text-sm font-medium dark:text-white text-gray-700">Bathrooms:</label>
                                    <input
                                        type="number"
                                        id="bathrooms"
                                        name="bathrooms"
                                        value={formData.bathrooms}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 border border-gray-300 dark:bg-gray-900 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>

                                {/* Bedrooms */}
                                <div className='w-full'>
                                    <label htmlFor="bedrooms" className="block text-sm font-medium dark:text-white text-gray-700">Bedrooms:</label>
                                    <input
                                        type="number"
                                        id="bedrooms"
                                        name="bedrooms"
                                        value={formData.bedrooms}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 border border-gray-300 dark:bg-gray-900 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className=''>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium dark:text-white text-gray-700">Phone Number:</label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-900 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Other form inputs... */}

                        <div className='md:w-[50%] space-y-2 '>


                            {/* Parking */}
                            <div>
                                <label htmlFor="parking" className="block text-sm font-medium dark:text-white text-gray-700">Parking Spaces:</label>
                                <input
                                    type="number"
                                    id="parking"
                                    name="parking"
                                    value={formData.parking}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 dark:bg-gray-900 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>

                            {/* Rent or Sell */}
                            <div>
                                <label htmlFor="RentOrSell" className="block text-sm font-medium dark:text-white text-gray-700">Rent or Sell:</label>
                                <select
                                    id="RentOrSell"
                                    name="RentOrSell"
                                    value={formData.RentOrSell}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 dark:bg-gray-900 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                >
                                    <option value="rent">Rent</option>
                                    <option value="sale">Sale</option>
                                    <option value="both">Both</option>
                                </select>
                            </div>
                            {/* Basement */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="basement"
                                    name="basement"
                                    checked={formData.basement}
                                    onChange={handleChange}
                                    className="h-5 w-5 text-indigo-600 dark:bg-gray-900 dark:border-gray-600 border-gray-300 rounded"
                                />
                                <label htmlFor="basement" className="ml-2 block text-md dark:text-white text-gray-900">Has Basement</label>
                            </div>

                            {/* Home Type */}
                            <div>
                                <label htmlFor="HomeType" className="block text-sm font-medium dark:text-white text-gray-700">Home Type:</label>
                                <select
                                    id="HomeType"
                                    name="HomeType"
                                    value={formData.HomeType}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 dark:bg-gray-900 dark:border-gray-600 rounded-md shadow-sm dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                >
                                    <option value="single-family">Single Family</option>
                                    <option value="condo">Condo</option>
                                    <option value="townhouse">Townhouse</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="bungalow">Bungalow</option>
                                    <option value="duplex">Duplex</option>
                                    <option value="loft">Loft</option>
                                    <option value="villa">Villa</option>
                                </select>
                            </div>



                        </div>

                    </div>
                    <div className=''>
                        <label htmlFor="description" className="block text-sm font-medium dark:text-white text-gray-700">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 dark:bg-gray-900 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className=" bg-blue-700 hover:bg-blue-500  w-full text-2xl  md:w-[50%] text-white py-2 px-4 rounded-md shadow mt-4"
                    >
                        Post Listing
                    </button>
                    {error ? (<p className='text-red-600'>{error}</p>) : ''}
                </form>
            </div>
        </div>
    );
}