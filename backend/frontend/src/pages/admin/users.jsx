import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import useUser from '../../zustand/useUser';

export default function UserDashboard() {
    const { AllListings } = useUser();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Create loading state
    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true before fetching
            const response = await fetch('/api/user');
            const usersData = await response.json();
            setUsers(usersData);
            setLoading(false); // Set loading to false after data is fetched
        };
        fetchData();
    }, []);

    const numberOfListings = (id) => {
        return AllListings.filter((li) => li.userRef === id).length;
    };

    const handleUserClick = (id, name) => {
        navigate(`/user/${id}`, { state: name }); // Navigate to the user-specific page
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="md:text-4xl text-2xl font-extrabold text-gray-800 mb-8">User Dashboard</h1>

            {loading ? ( // Check if loading
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="spinner"></div>
                    <span className="mt-4 text-gray-600">Loading users...</span>
                </div>
            ) : users.length === 0 ? (
                <div className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800">No Users Registered</h2>
                    <p className="text-gray-600">You have no users registered for this page.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Users with Listings */}
                    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                        <h2 className="md:text-2xl text-xl font-semibold text-gray-800 mb-4">Users With Their Listings</h2>
                        {users.length > 0 ? (
                            <ul className='flex flex-col gap-2'>
                                {users.map(user => (
                                    <li
                                        key={user._id}
                                        className="flex justify-between items-center border-b p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200 cursor-pointer"
                                        onClick={() => handleUserClick(user._id, user.username)} // Add onClick handler
                                    >
                                        <span className="text-gray-700 font-medium">{user.username}</span>
                                        <span className="text-teal-600 font-bold">{numberOfListings(user._id)} Listings</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No users have created listings.</p>
                        )}
                    </div>

                    {/* Statistics Overview */}
                    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex flex-col">
                        <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg p-6 text-center mb-6 shadow">
                            <h3 className="text-lg font-bold">Total Users Created:</h3>
                            <p className="text-5xl font-extrabold">{users.length}</p>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-lg p-6 text-center mb-6 shadow">
                            <h3 className="text-lg font-bold">Total Listings Created:</h3>
                            <p className="text-5xl font-extrabold">{AllListings.length}</p>
                        </div>
                        <div className="bg-gradient-to-r from-purple-500 to-red-500 text-white rounded-lg p-6 text-center mb-6 shadow">
                            <h3 className="text-lg font-bold">Average Listings per User:</h3>
                            <p className="text-5xl font-extrabold">{(users.length > 0 ? (AllListings.length / users.length).toFixed(2) : 0)}</p>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
