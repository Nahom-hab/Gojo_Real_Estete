import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaHome, FaUsers, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useUser from '../../zustand/useUser';

const AdminNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null); // Reference to the sidebar
    const { AllListings, setAllListings } = useUser();

    useEffect(() => {

        const fetchListings = async () => {
            const listingsResponse = await fetch('/api/listing');
            if (!listingsResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await listingsResponse.json();
            setAllListings(result);
            localStorage.setItem("listings", JSON.stringify(result));
        }
        fetchListings()

    }, [])
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        // Close the sidebar if clicking outside of it
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        // Add event listener for clicks outside
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Cleanup event listener
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            {/* Header Navigation */}
            <header className="bg-blue-600 text-white flex justify-between items-center p-4">
                <div className="flex items-center">
                    <button onClick={toggleSidebar} className="mr-4">
                        <FaBars size={24} />
                    </button>
                    <h1 className="text-lg font-bold">Admin Panel</h1>
                </div>
                <nav className="hidden md:flex mr-20 space-x-6">
                    <Link to="/admin/dashboard" className="flex items-center hover:text-blue-200" >
                        <FaHome className="mr-1" />
                        Dashboard
                    </Link>
                    <Link to="/admin/allListings" className="flex items-center hover:text-blue-200" >
                        <FaUsers className="mr-1" />
                        All Listings
                    </Link>
                    <Link to="/admin/active" className="flex items-center hover:text-blue-200" >
                        <FaToggleOn className="mr-1" />
                        Active
                    </Link>
                    <Link to="/admin/inactive" className="flex items-center hover:text-blue-200" >
                        <FaToggleOff className="mr-1" />
                        Inactive
                    </Link>
                    <Link to="/admin/users" className="flex items-center hover:text-blue-200" >
                        <FaUsers className="mr-1" />
                        Users
                    </Link>
                </nav>
            </header>

            {/* Sidebar Navigation for Mobile */}
            <aside
                ref={sidebarRef}
                className={`fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-50`}
            >
                <div
                    className={`fixed left-0 top-0 bg-white w-64 h-full p-4 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}
                >
                    <h2 className="text-lg font-bold">Navigation</h2>
                    <nav className="mt-4">
                        <Link to="/admin/dashboard" className="flex items-center py-2 hover:bg-gray-200" onClick={toggleSidebar}>
                            <FaHome className="mr-2" />
                            Dashboard
                        </Link>
                        <Link to="/admin/allListings" className="flex items-center py-2 hover:bg-gray-200" onClick={toggleSidebar}>
                            <FaHome className="mr-2" />
                            All Listings
                        </Link>
                        <Link to="/admin/active" className="flex items-center py-2 hover:bg-gray-200" onClick={toggleSidebar}>
                            <FaToggleOn className="mr-2" />
                            Active Listings
                        </Link>
                        <Link to="/admin/inactive" className="flex items-center py-2 hover:bg-gray-200" onClick={toggleSidebar}>
                            <FaToggleOff className="mr-2" />
                            Inactive Listings
                        </Link>
                        <Link to="/admin/users" className="flex items-center py-2 hover:bg-gray-200" onClick={toggleSidebar}>
                            <FaUsers className="mr-2" />
                            Users
                        </Link>
                    </nav>
                    <button onClick={toggleSidebar} className="mt-4 text-red-500">Close</button>
                </div>
            </aside>

            {/* Overlay for Sidebar */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar}></div>
            )}
        </div>
    );
};

export default AdminNavigation;
