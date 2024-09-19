import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../component/oauth';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
  });

  const [passwordError, setPasswordError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');

    const { showPassword, ...data } = formData;
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        console.log('Signup successful');
        navigate('/login');
      } else {
        const errorData = await res.json();
        setSignupError(errorData.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setSignupError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6">
      <h1 className="text-2xl font-bold mb-8">Sign Up</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </label>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </label>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          <input
            type={formData.showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </label>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="relative">
            <input
              type={formData.showPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <label htmlFor="showPassword" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="showPassword"
                  name="showPassword"
                  checked={formData.showPassword}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-600">Show Password</span>
              </label>
            </div>
          </div>
        </label>
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 bg-gray-800 text-white rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <Oauth />
        {passwordError && <div className="text-red-600 mt-2">{passwordError}</div>}
        {signupError && <div className="text-red-600 mt-2">{signupError}</div>}
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default SignupPage;
