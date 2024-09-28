import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUser from '../../zustand/useUser';

const SignupPage = () => {
  const { isEng } = useUser();
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
      setPasswordError(isEng ? 'Passwords do not match' : 'የይለፍ ቃልዎች አይገናኙም');
      return;
    }
    setPasswordError('');

    const { showPassword, ...data } = formData;
    setLoading(true);
    try {
      const response = await fetch('/api/auth/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email, username: data.username }),
      });
      const { message, userExists } = await response.json();

      if (!userExists) {
        const res = await fetch('/api/auth/sendOtp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          const message = await res.json();
          navigate('/otpcheck', { state: data });
        } else {
          const errorData = await res.json();
          setSignupError(errorData.message || (isEng ? 'Signup failed' : 'የማዕከል ማስታወቂያ ተቋርጧል'));
        }
      } else {
        setSignupError(message);
      }
    } catch (error) {
      setSignupError(isEng ? 'An error occurred. Please try again.' : 'አደገኛ ስህተት አጋጥሟል። እባኮትን ይሞክሩ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        {isEng ? 'Create Your Account' : 'የእርስዎን አካውንት ይፍጠሩ'}
      </h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-[80%] md:w-[40%] space-y-4">
        <label htmlFor="username" className="block">
          <input
            type="text"
            id="username"
            name="username"
            placeholder={isEng ? 'Username' : 'የተጠቃሚ ስም'}
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 transition-colors"
            required
          />
        </label>
        <label htmlFor="email" className="block">
          <input
            type="email"
            id="email"
            name="email"
            placeholder={isEng ? 'Email' : 'ኢሜይል'}
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 transition-colors"
            required
          />
        </label>
        <label htmlFor="password" className="block">
          <input
            type={formData.showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder={isEng ? 'Password' : 'የይለፍ ቃል'}
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 transition-colors"
            required
          />
        </label>
        <label htmlFor="confirmPassword" className="block">
          <input
            type={formData.showPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            placeholder={isEng ? 'Confirm Password' : 'የይለፍ ቃልዎን ያረጋግጡ'}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 transition-colors"
            required
          />
        </label>
        <div className="flex justify-end pr-2">
          <label htmlFor="showPassword" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <input
              type="checkbox"
              id="showPassword"
              name="showPassword"
              checked={formData.showPassword}
              onChange={handleInputChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 dark:border-gray-600"
            />
            <span>{isEng ? 'Show Password' : 'የይለፍ ቃልዎን አሳይ'}</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (isEng ? 'Signing Up...' : 'በመዝገብ ላይ...') : (isEng ? 'Sign Up' : 'ይመዝገቡ')}
        </button>
        {passwordError && <div className="text-red-500 mt-2 text-sm">{passwordError}</div>}
        {signupError && <div className="text-red-500 mt-2 text-sm">{signupError}</div>}
      </form>
      <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
        {isEng ? 'Already have an account?' : 'አካውንት የለዎትም?'} <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default SignupPage;