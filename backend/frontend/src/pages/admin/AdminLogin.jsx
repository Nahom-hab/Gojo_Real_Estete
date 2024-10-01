import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdmin from '../../zustand/useAdmin';// Import the Zustand store

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setAdmin } = useAdmin(); // Get the setAdmin function from Zustand store
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Reset errors
        setLoading(true); // Show loading

        // Prepare request body
        const requestBody = {
            username,
            password,
        };

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (response.ok) {

                // Set the admin details in Zustand
                setAdmin({
                    id: data.adminData._id,
                    username: data.adminData.username,
                    email: data.adminData.email,
                });

                // Navigate to admin dashboard
                navigate('/admin/dashboard');
            } else {
                // If login fails, show error message
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            // Handle error during fetch
            setError('Network error, please try again later.');
        }

        setLoading(false); // End loading
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">Admin Login</h2>

                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

                <form onSubmit={handleLogin} className="mt-8">
                    <div className="mb-2">
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full text-lg px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                            placeholder="Enter username"
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full text-lg px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className={`w-full px-4 py-2 text-white ${loading ? 'bg-gray-500' : 'bg-blue-500'} rounded-md hover:bg-blue-600 focus:outline-none`}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Sign In'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
