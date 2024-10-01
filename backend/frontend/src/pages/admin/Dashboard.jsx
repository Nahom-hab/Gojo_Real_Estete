import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../../zustand/useUser';
import { FaHome, FaPhone } from 'react-icons/fa';

const Dashboard = () => {
    const navigate = useNavigate();
    const { AllListings } = useUser();

    const [listingNotification, setListingNotification] = useState([]);
    const [userNotification, setUserNotification] = useState([]);
    const [userMessage, setUserMessage] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const activeListings = AllListings.filter((li) => li.activated);
    const inactiveListings = AllListings.filter((li) => !li.activated);

    const [totalUser, setTotalUsers] = useState(0);
    const totalListing = AllListings.length;
    const activeListing = activeListings.length;
    const inactiveListing = inactiveListings.length;

    const formatTimeAgo = (date) => {
        const now = new Date();
        const timeDiff = now - new Date(date); // Time difference in milliseconds
        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }
        if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        }
        if (minutes > 0) {
            return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
        }
        return 'Just now';
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const response = await fetch('/api/user');
                const users = await response.json();
                setTotalUsers(users.length);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch users:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/message');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setListingNotification((data.filter((d) => d.type === 'listing')).reverse());
                setUserNotification((data.filter((d) => d.type === 'user')).reverse());
                fetchUserMessage();
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchUserMessage = async () => {
            try {
                const res = await fetch('/api/feedback');
                if (!res.ok) throw new Error('Network response was not ok');
                const Userdata = await res.json();
                setUserMessage(Userdata.reverse());
            } catch (error) {
                console.error("Failed to fetch user messages:", error);
            }
        };
        fetchData();
    }, []);

    const handleClick = async (id) => {
        const res = await fetch(`/api/listing/${id}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        navigate(`/admin/ViewListing/${data._id}`, { state: data });
    };

    return (
        <div>
            {loading ? (
                <div className="flex flex-col items-center mt-20 mb-72 justify-center h-60">
                    <div className="spinner"></div>
                    <span className="mt-4 text-gray-600">Loading Dashboard...</span>
                </div>
            ) : (
                <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center p-2 m:p-8">
                    <h1 className="md:text-4xl text-2xl font-bold text-gray-900  mb-3 mt-8 md:mb-6">Admin Dashboard</h1>


                    <div className="grid grid-cols-2  lg:grid-cols-4 gap-8">
                        <div className="bg-white shadow-lg rounded-lg  p-3 md:p-6  text-center transition-transform transform hover:scale-105">
                            <h2 className="md:text-2xl text-sm font-semibold text-gray-700">Total Users</h2>
                            <p className="text-4xl font-bold text-blue-600">{totalUser}</p>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-3 md:p-6 text-center transition-transform transform hover:scale-105">
                            <h2 className="md:text-2xl text-sm font-semibold text-gray-700">Total Listings</h2>
                            <p className="text-4xl font-bold text-blue-600">{totalListing}</p>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg  p-3 md:p-6 text-center transition-transform transform hover:scale-105">
                            <h2 className="md:text-2xl text-sm font-semibold text-gray-700">Active Listings</h2>
                            <p className="text-4xl font-bold text-blue-600">{activeListing}</p>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg  p-3 md:p-6  text-center transition-transform transform hover:scale-105">
                            <h2 className="md:text-2xl text-sm font-semibold text-gray-700">Inactive Listings</h2>
                            <p className="text-4xl font-bold text-blue-600">{inactiveListing}</p>
                        </div>
                    </div>

                    <div className='flex md:w-[80%] w-full  md:flex-row flex-col gap-8'>
                        <div className="flex flex-col gap-8 mt-10 w-full md:w-2/3">
                            <div>
                                <h2 className="md:text-3xl text-xl font-bold text-gray-900 mb-4">Recent User Notifications</h2>
                                <div className="bg-white shadow-lg rounded-lg p-4">
                                    <ul className='flex flex-col-reverse gap-2'>
                                        {userNotification.slice(0, 6).map((notification) => (
                                            <li key={notification._id} className="flex items-end p-1 md:p-2 rounded-lg justify-between border-b py-4 hover:bg-gray-200 transition duration-200 cursor-pointer" onClick={() => handleClick(notification.listingId)}>
                                                <div className='flex gap-2 items-center'>
                                                    <img className='md:w-16 md:h-16 w-10 h-10 rounded-full' src="https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg" alt="" />
                                                    <div className='flex flex-col'>
                                                        <span className="text-gray-800 md:text-lg text-[12px] font-semibold">{notification.name}</span>
                                                        <span className="text-gray-700  md:text-lg text-[12px]">{notification.message}</span>

                                                    </div>
                                                </div>

                                                <span className="text-gray-500 text-xs">{formatTimeAgo(notification.createdAt)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <h2 className="md:text-3xl text-xl font-bold text-gray-900 mb-4">Recent Listing Notifications</h2>
                                <div className="bg-white shadow-lg rounded-lg p-1 md:p-4">
                                    <ul className='flex flex-col-reverse gap-2'>
                                        {listingNotification.slice(0, 6).map((notification) => (
                                            <li
                                                key={notification._id}
                                                className="flex flex-col justify-between items-start border-b p-1 md:p-2 rounded-lg bg-gray-50 hover:bg-gray-200 transition duration-200 cursor-pointer"
                                                onClick={() => handleClick(notification.listingId)}
                                            >
                                                <div className='flex w-full justify-between items-center  md:items-end'>
                                                    <div className='flex items-center gap-3'>
                                                        <FaHome className="text-blue-500 text-5xl mr-2" /> {/* Home icon at the start */}
                                                        <div className="flex flex-col items-start mb-2">
                                                            <span className="text-black md:text-lg text-[12px] font-semibold">{notification.name}</span>
                                                            <span className="text-gray-700 md:text-lg text-[12px]">{notification.message}</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-end text-gray-500 text-xs">{formatTimeAgo(notification.createdAt)}</span>

                                                </div>

                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 w-full md:w-1/3">
                            <h2 className="md:text-3xl text-xl font-bold text-gray-900 mb-4">User Messages</h2>
                            <div className="bg-white shadow-lg rounded-lg p-4">
                                <ul className='flex flex-col-reverse gap-2'>
                                    {userMessage.slice(0, 6).map((message) => (
                                        <li key={message._id} className="flex flex-col p-2 rounded-lg border-b  bg-gray-100 hover:bg-gray-200 transition duration-200">
                                            <div className='flex justify-between items-center'>
                                                <div className="flex gap-2 items-center mb-2">
                                                    <img className='w-16 h-16 rounded-full' src="https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg" alt="" />
                                                    <div className='flex flex-col'>
                                                        <span className="font-semibold text-gray-800">{message.name}</span>
                                                        <span className="text-gray-600 flex gap-1 items-center text-xs"><FaPhone className='text-green-500' />{message.phoneNumber}</span>
                                                    </div>
                                                </div>
                                                <span className="text-gray-500 text-xs">{formatTimeAgo(message.createdAt)}</span>

                                            </div>

                                            <p className="pl-2 text-gray-700 text-sm gap-3"> <span className='font-extrabold'>Comment: </span>{message.message}</p>

                                            <div className="flex pt-2 pl-2">
                                                {message.email && <span className="text-gray-600 text-xs"> <span className='font-bold' >Email:</span> {message.email}</span>}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div >
            )}
        </div>

    );
};

export default Dashboard;
